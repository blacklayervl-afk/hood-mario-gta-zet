"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { CameraMode } from "@/lib/game-data";

const PLANET_RADIUS = 100;

interface GameCameraProps {
  mode: CameraMode;
}

export default function GameCamera({ mode }: GameCameraProps) {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const orbitRef = useRef<OrbitControlsImpl>(null);

  // Godvision: orbital view from far above
  useEffect(() => {
    if (mode === "godvision") {
      camera.position.set(0, PLANET_RADIUS * 3, PLANET_RADIUS * 2);
      camera.lookAt(0, 0, 0);
    } else if (mode === "aerial") {
      camera.position.set(0, PLANET_RADIUS + 80, 0);
      camera.lookAt(0, 0, 0);
    }
  }, [mode, camera]);

  useFrame((state, delta) => {
    if (mode === "godvision") {
      angleRef.current += delta * 0.15;
      const r = PLANET_RADIUS * 2.8;
      camera.position.x = Math.sin(angleRef.current) * r;
      camera.position.z = Math.cos(angleRef.current) * r;
      camera.position.y = PLANET_RADIUS * 1.6;
      camera.lookAt(0, 0, 0);
    } else if (mode === "aerial") {
      // Slow rotation drone view
      angleRef.current += delta * 0.08;
      const r = PLANET_RADIUS * 0.8;
      camera.position.x = Math.sin(angleRef.current) * r;
      camera.position.z = Math.cos(angleRef.current) * r;
      camera.position.y = PLANET_RADIUS + 60;
      camera.lookAt(0, 0, 0);
    } else if (mode === "orbit") {
      // Cinematic: figure-8 pattern
      angleRef.current += delta * 0.2;
      const r = PLANET_RADIUS * 2;
      camera.position.x = Math.sin(angleRef.current) * r;
      camera.position.z = Math.cos(angleRef.current) * r;
      camera.position.y =
        PLANET_RADIUS * 0.5 +
        Math.sin(angleRef.current * 2) * PLANET_RADIUS * 0.8;
      camera.lookAt(0, 0, 0);
    }
    // "surface" mode camera is handled by CharacterController
  });

  // OrbitControls only active in orbit mode (manual control)
  if (mode === "orbit") {
    return (
      <OrbitControls
        ref={orbitRef}
        enablePan={false}
        minDistance={PLANET_RADIUS * 1.3}
        maxDistance={PLANET_RADIUS * 5}
        autoRotate
        autoRotateSpeed={0.5}
        target={[0, 0, 0]}
      />
    );
  }

  return null;
}
