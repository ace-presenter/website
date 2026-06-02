"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ACCENT = "#C8102E";
const ACCENT_VIVID = "#E8183A";

function wave(x: number, z: number, t: number) {
  return Math.sin(x * 0.45 + t * 0.9) * 0.22 + Math.cos(z * 0.5 + t * 0.75) * 0.22;
}

function Field() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Undulating point-cloud "floor" — the room, alive.
  const wavePts = useMemo(() => {
    const GX = 70,
      GZ = 46;
    const positions = new Float32Array(GX * GZ * 3);
    let i = 0;
    for (let ix = 0; ix < GX; ix++) {
      for (let iz = 0; iz < GZ; iz++) {
        positions[i * 3] = (ix / (GX - 1) - 0.5) * 18;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (iz / (GZ - 1) - 0.5) * 8 - 1;
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(ACCENT_VIVID),
      size: 0.038,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geo, mat);
  }, []);

  // Drifting embers for depth.
  const embers = useMemo(() => {
    const COUNT = 220;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 5 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(ACCENT_VIVID),
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geo, mat);
  }, []);

  // A slow wireframe icosahedron — the tangible 3D object, set behind the mockup.
  const ico = useMemo(() => {
    const edges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.7, 1));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(ACCENT),
      transparent: true,
      opacity: 0.5,
    });
    const ls = new THREE.LineSegments(edges, mat);
    ls.position.set(3, 1.35, -1.5);
    return ls;
  }, []);

  useEffect(() => {
    return () => {
      for (const o of [wavePts, embers, ico]) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    };
  }, [wavePts, embers, ico]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // wave undulation
    const arr = wavePts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] = wave(arr[i], arr[i + 2], t);
    }
    wavePts.geometry.attributes.position.needsUpdate = true;

    // embers drift up, wrapping
    const ea = embers.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < ea.length; i += 3) {
      ea[i] += delta * 0.16;
      if (ea[i] > 4) ea[i] = -1;
    }
    embers.geometry.attributes.position.needsUpdate = true;

    // ico slow spin
    ico.rotation.y += delta * 0.16;
    ico.rotation.x += delta * 0.06;

    // pointer parallax on the whole group
    if (groupRef.current) {
      const tz = pointer.current.x * 0.06;
      const tx = pointer.current.y * 0.04;
      groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.05;
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[-1.05, 0, 0]} position={[0, -1.6, 0]}>
        <primitive object={wavePts} />
      </group>
      <primitive object={embers} />
      <primitive object={ico} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      frameloop="always"
    >
      <Field />
    </Canvas>
  );
}
