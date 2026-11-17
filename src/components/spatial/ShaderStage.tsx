"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * The stage, drawn on the GPU: haze lit by three red beams from above, a
 * floor that drifts toward you, and a ripple that runs across it each time
 * the slide moves on. One full-screen fragment shader (WebGL2), nothing else.
 *
 * Budget, per the 2026 award-jury rule (60 fps on a mid-range phone):
 * pixel ratio capped at 1.5 (1 on touch), at most ~1.6 MP drawn, paused when
 * off screen or the tab is hidden. Reduced motion: one still frame.
 * No WebGL2: the canvas stays hidden and the CSS glow under it shows.
 *
 * `pulse` — bump it to send a ripple. `level` — 0..1, voice energy; the
 * beams breathe with it.
 */

const VERT = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pulse;
uniform float u_level;
uniform float u_horizon;
out vec4 o;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
  vec3 red = vec3(0.91, 0.09, 0.23);
  vec3 col = vec3(0.035, 0.035, 0.043);

  // Beams from a rig just above the top edge.
  vec2 src = vec2(u_mouse.x * 0.18, 1.18);
  vec2 d = p - src;
  float ang = atan(d.x, -d.y);
  float dist = length(d);
  float haze = fbm(p * 2.4 + vec2(u_time * 0.035, -u_time * 0.06));
  float beams = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float c = (fi - 1.0) * 0.34 + sin(u_time * 0.17 + fi * 2.1) * 0.05 + u_mouse.x * 0.05;
    float w = 0.085 + 0.025 * fi;
    beams += smoothstep(w, 0.0, abs(ang - c)) * (i == 1 ? 1.0 : 0.55);
  }
  float breathe = 0.6 + 0.4 * u_level;
  col += red * beams * exp(-dist * 1.15) * (0.25 + 0.75 * haze) * 0.55 * breathe;
  col += red * 0.32 * exp(-length(vec2(p.x - u_mouse.x * 0.08, (uv.y - 1.04) * 1.7)) * 2.3);

  // Floor.
  float h = u_horizon - uv.y;
  if (h > 0.0) {
    float z = 0.22 / h;
    vec2 fq = vec2(p.x * z * 1.4, z);
    vec2 fp = fq + vec2(0.5, u_time * 0.45); // half a cell: no line down the middle
    vec2 gw = fwidth(fp);
    vec2 g = abs(fract(fp - 0.5) - 0.5) / max(gw, 1e-4);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    float fade = smoothstep(0.0, 0.10, h) * (0.55 + 0.45 * smoothstep(0.42, 0.05, abs(p.x) / aspect));
    vec3 grid = red * line * 0.30 * fade;

    // Ripple from the listening spot.
    float age = u_time - u_pulse;
    if (age > 0.0 && age < 3.5) {
      vec2 c = vec2(0.0, 0.22 / max(u_horizon * 0.55, 0.05));
      float r = age * 2.6;
      float dd = length((fq - c) * vec2(1.0, 1.8));
      float ring = exp(-abs(dd - r) * 7.0) * exp(-age * 1.1);
      col += red * ring * 0.9 * smoothstep(0.0, 0.04, h);
      grid *= 1.0 + ring * 4.0;
    }
    col += grid;
    // Floor catches the beams.
    col += red * 0.10 * exp(-abs(p.x - u_mouse.x * 0.1) * 2.5) * smoothstep(0.0, 0.2, h) * breathe;
  }

  // Vignette + dither (no banding on the dark gradients).
  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v, v) * 0.9;
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) / 255.0;
  o = vec4(col, 1.0);
}`;

export default function ShaderStage({
  pulse,
  levelRef,
  horizon = 0.36,
  className = "",
}: {
  pulse: number;
  levelRef?: RefObject<number>;
  horizon?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseAt = useRef(-10);
  const clock = useRef(0);

  useEffect(() => {
    if (pulse > 0) pulseAt.current = clock.current;
  }, [pulse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
    } catch (e) {
      console.warn("ShaderStage off:", e);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      pulse: gl.getUniformLocation(prog, "u_pulse"),
      level: gl.getUniformLocation(prog, "u_level"),
      horizon: gl.getUniformLocation(prog, "u_horizon"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const maxDpr = coarse ? 1 : 1.5;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const px = r.width * r.height * dpr * dpr;
      if (px > 1.6e6) dpr *= Math.sqrt(1.6e6 / px);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    size();

    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!coarse && !reduce) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0, visible = true, last = performance.now(), lvl = 0, shown = false;
    const draw = () => {
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      const target = levelRef?.current ?? 0;
      lvl += (target - lvl) * 0.12;
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, clock.current);
      gl.uniform2f(U.mouse, cx, cy);
      gl.uniform1f(U.pulse, pulseAt.current);
      gl.uniform1f(U.level, lvl);
      gl.uniform1f(U.horizon, horizon);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
    };
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      clock.current += dt;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      if (reduce) {
        clock.current = 6;
        draw();
        return;
      }
      if (visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      size();
      if (reduce) draw();
    });
    ro.observe(canvas);
    const onVis = () => run();
    document.addEventListener("visibilitychange", onVis);
    run();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [horizon, levelRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
