"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { products, accent as brandAccent, type ProductKey } from "@/lib/brand";

/**
 * RippleField — the mouse-interactive cosmic hero environment.
 *
 * One fullscreen quad, one single-pass "ring-decay" fragment shader — no
 * render targets, no simulation. Pointer movement writes expanding, damped
 * sine rings into a small uniform ring buffer; the shader sums them to
 * (a) shimmer the procedural starfield and (b) add an accent-tinted ring of
 * light. Below it all glows the ACE horizon arc — the same geometry as the
 * CSS HorizonGlow it fades in over ("the room responds": ACE listens).
 *
 * Loaded only via RippleBackdrop (dynamic, ssr:false, gated). The canvas is
 * pointer-events-none; pointer tracking happens on window, mapped into the
 * host section's rect.
 */

const MAX_RIPPLES = 12;
const RIPPLE_LIFE = 1.8; // seconds a ring stays alive
const TRAIL_MIN_PX = 28; // min pointer travel between trail ripples

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec4  uRipples[${MAX_RIPPLES}]; // xy: uv, z: startTime, w: strength
  uniform vec3  uAccent;
  uniform vec3  uAccent2;
  uniform vec2  uPointer;    // smoothed pointer uv, for star parallax
  uniform float uIntensity;  // global fade

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  /* One star per grid cell, sparse, with slow twinkle. */
  float starLayer(vec2 uv, float scale, float density, float t) {
    vec2 g = uv * scale;
    vec2 id = floor(g);
    vec2 f = fract(g);
    float h = hash(id);
    if (h < density) return 0.0;
    vec2 sp = vec2(hash(id + 1.3), hash(id + 2.7)) * 0.8 + 0.1;
    float d = length(f - sp);
    float tw = 0.55 + 0.45 * sin(t * (0.4 + h * 1.2) + h * 6.2831);
    return smoothstep(0.05, 0.0, d) * tw;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = vUv;

    /* ── Ripples: summed displacement + luminance ─────────────────── */
    float disp = 0.0;
    float rippleLum = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      float age = uTime - r.z;
      if (age <= 0.0 || age >= ${RIPPLE_LIFE.toFixed(2)}) continue;
      vec2 dv = (uv - r.xy) * vec2(aspect, 1.0);
      float d = length(dv);
      float radius = age * 0.34;
      float ring = sin((d - radius) * 42.0);
      float atten = exp(-d * 4.0) * exp(-age * 2.1) * r.w;
      disp += ring * atten;
      rippleLum += max(0.0, ring) * atten;
    }

    /* ── Starfield (3 depths, ripple-displaced, pointer parallax) ──── */
    vec2 par = (uPointer - 0.5) * -1.0;
    vec2 suv = uv + disp * 0.010;
    float stars = 0.0;
    stars += starLayer(suv + par * 0.010, 26.0, 0.86, uTime) * 0.85;
    stars += starLayer(suv + par * 0.022, 44.0, 0.88, uTime * 1.2) * 0.55;
    stars += starLayer(suv + par * 0.038, 72.0, 0.90, uTime * 0.8) * 0.35;
    /* stars thin out toward the horizon */
    stars *= smoothstep(0.02, 0.35, uv.y);

    /* ── Horizon arc (matches CSS HorizonGlow geometry: rim ~14% up) ─ */
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
    vec2 c = vec2(0.0, -1.38);
    float d = length(p - c) - 1.52;      /* >0 above the surface */
    float body = smoothstep(0.004, -0.02, d);
    float rim  = exp(-max(d, 0.0) * 26.0);
    float atmo = exp(-max(d, 0.0) * 5.0);

    /* ── Compose ───────────────────────────────────────────────────── */
    vec3 col = vec3(stars);
    col *= 1.0 - body * 0.92;            /* planet occludes stars */

    vec3 warm = mix(uAccent, uAccent2, 0.55);
    col += warm    * rim  * 0.85;
    col += uAccent * atmo * 0.22;
    col += mix(uAccent, uAccent2, 0.35) * rippleLum * 0.55;

    /* vignette keeps corners near-black for headline contrast */
    float vig = smoothstep(1.25, 0.45, length((uv - vec2(0.5, 0.52)) * vec2(aspect * 0.75, 1.15)));
    col *= vig;

    col *= uIntensity;
    float a = clamp(max(col.r, max(col.g, col.b)) * 1.35, 0.0, 1.0);
    gl_FragColor = vec4(col, a); /* premultiplied-compatible: col <= a */
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function Quad({
  product,
  hostRef,
  active,
}: {
  product: ProductKey;
  hostRef: React.RefObject<HTMLElement | null>;
  active: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => {
    const p = products[product];
    // Presenter pairs crimson with ACE orange (the home/hero signature);
    // other products warm toward their own vivid variant.
    const second = product === "presenter" ? brandAccent.DEFAULT : p.accentVivid;
    return {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uRipples: {
        value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, -1e3, 0)),
      },
      uAccent: { value: hexToVec3(p.accent) },
      uAccent2: { value: hexToVec3(second) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 0 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const state = useRef({
    slot: 0,
    lastX: -1e3,
    lastY: -1e3,
    targetPointer: new THREE.Vector2(0.5, 0.5),
  });

  useEffect(() => {
    const push = (clientX: number, clientY: number, strength: number) => {
      const host = hostRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1 - (clientY - rect.top) / rect.height;
      if (x < -0.05 || x > 1.05 || y < -0.05 || y > 1.05) return;
      const s = state.current;
      const v = uniforms.uRipples.value[s.slot] as THREE.Vector4;
      v.set(x, y, uniforms.uTime.value as number, strength);
      s.slot = (s.slot + 1) % MAX_RIPPLES;
    };

    const onMove = (e: PointerEvent) => {
      const s = state.current;
      const host = hostRef.current;
      if (host) {
        const rect = host.getBoundingClientRect();
        s.targetPointer.set(
          (e.clientX - rect.left) / rect.width,
          1 - (e.clientY - rect.top) / rect.height
        );
      }
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      if (dx * dx + dy * dy < TRAIL_MIN_PX * TRAIL_MIN_PX) return;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      push(e.clientX, e.clientY, 0.55);
    };
    const onDown = (e: PointerEvent) => push(e.clientX, e.clientY, 1.5);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [hostRef, uniforms]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uRes.value.set(size.width, size.height);
    // ease the global intensity toward its target (fade in / out)
    const target = active ? 1 : 0;
    uniforms.uIntensity.value += (target - uniforms.uIntensity.value) * Math.min(1, delta * 2.5);
    // smooth the parallax pointer
    (uniforms.uPointer.value as THREE.Vector2).lerp(state.current.targetPointer, Math.min(1, delta * 4));
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function RippleField({
  product = "presenter",
  hostRef,
  active = true,
}: {
  product?: ProductKey;
  hostRef: React.RefObject<HTMLElement | null>;
  active?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        premultipliedAlpha: true,
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Quad product={product} hostRef={hostRef} active={active} />
    </Canvas>
  );
}
