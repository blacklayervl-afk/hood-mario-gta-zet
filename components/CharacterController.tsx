"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { CameraMode } from "@/lib/game-data";
import Character from "./Character";

const PLANET_RADIUS = 100;
const GRAVITY = 0.08;
const MOVE_SPEED = 0.6;
const JUMP_FORCE = 1.8;

interface Keys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  space: boolean;
}

interface CharacterControllerProps {
  cameraMode: CameraMode;
}

export default function CharacterController({
  cameraMode,
}: CharacterControllerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(new THREE.Vector3());
  const onGroundRef = useRef(false);
  const yawRef = useRef(0);
  const pitchRef = useRef(0.4);

  const keys = useRef<Keys>({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  });

  const { camera } = useThree();

  // Keyboard listeners
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.w = true;
      if (e.code === "KeyA") keys.current.a = true;
      if (e.code === "KeyS") keys.current.s = true;
      if (e.code === "KeyD") keys.current.d = true;
      if (e.code === "Space") {
        e.preventDefault();
        keys.current.space = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.w = false;
      if (e.code === "KeyA") keys.current.a = false;
      if (e.code === "KeyS") keys.current.s = false;
      if (e.code === "KeyD") keys.current.d = false;
      if (e.code === "Space") keys.current.space = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Mouse look
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const onClick = () => canvas.requestPointerLock();
    const onMove = (e: MouseEvent) => {
      if (document.pointerLockElement === canvas) {
        yawRef.current -= e.movementX * 0.002;
        pitchRef.current = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 2, pitchRef.current + e.movementY * 0.002)
        );
      }
    };

    canvas.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMove);
    return () => {
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Set initial position on planet surface
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(0, PLANET_RADIUS + 2, 0);
    }
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const group = groupRef.current;
    const pos = group.position;

    // Surface normal (pointing away from planet center)
    const surfaceNormal = pos.clone().normalize();

    // Gravity pull toward center
    const distFromCenter = pos.length();
    const heightAboveSurface = distFromCenter - PLANET_RADIUS;
    onGroundRef.current = heightAboveSurface < 2.5;

    if (!onGroundRef.current) {
      velocityRef.current.addScaledVector(surfaceNormal, -GRAVITY);
    } else {
      // Zero out radial velocity component when on ground
      const radialVel = surfaceNormal.dot(velocityRef.current);
      if (radialVel < 0) {
        velocityRef.current.addScaledVector(surfaceNormal, -radialVel);
      }
    }

    // Jump
    if (keys.current.space && onGroundRef.current) {
      velocityRef.current.addScaledVector(surfaceNormal, JUMP_FORCE);
      keys.current.space = false;
    }

    // Movement relative to planet surface
    if (cameraMode === "surface" || cameraMode === "aerial") {
      const up = surfaceNormal.clone();
      const forward = new THREE.Vector3(
        -Math.sin(yawRef.current),
        0,
        -Math.cos(yawRef.current)
      );
      // Project forward onto surface plane
      forward.sub(up.clone().multiplyScalar(forward.dot(up))).normalize();
      const right = new THREE.Vector3().crossVectors(up, forward).negate();

      const move = new THREE.Vector3();
      if (keys.current.w) move.addScaledVector(forward, MOVE_SPEED);
      if (keys.current.s) move.addScaledVector(forward, -MOVE_SPEED);
      if (keys.current.a) move.addScaledVector(right, MOVE_SPEED);
      if (keys.current.d) move.addScaledVector(right, -MOVE_SPEED);
      velocityRef.current.add(move.multiplyScalar(delta * 60));
    }

    // Dampen lateral velocity
    const radialComp = surfaceNormal.multiplyScalar(
      surfaceNormal.dot(velocityRef.current)
    );
    const tangentialVel = velocityRef.current.clone().sub(radialComp);
    tangentialVel.multiplyScalar(0.85);
    velocityRef.current.copy(radialComp.add(tangentialVel));

    // Apply velocity
    pos.addScaledVector(velocityRef.current, delta * 60 * 0.016);

    // Clamp to planet surface (don't fall through)
    const newDist = pos.length();
    if (newDist < PLANET_RADIUS + 1.8) {
      pos.setLength(PLANET_RADIUS + 1.8);
    }

    // Orient character to stand on planet
    const newNormal = pos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, newNormal);
    group.quaternion.slerp(quat, 0.15);

    // Camera follow (surface mode)
    if (cameraMode === "surface") {
      const camOffset = newNormal.clone().multiplyScalar(8);
      const fwdOffset = new THREE.Vector3(
        Math.sin(yawRef.current),
        0,
        Math.cos(yawRef.current)
      )
        .applyQuaternion(quat)
        .multiplyScalar(-6);
      const camPos = pos.clone().add(camOffset).add(fwdOffset);
      camera.position.lerp(camPos, 0.1);
      camera.lookAt(pos);
    }
  });

  return (
    <group ref={groupRef}>
      <Character />
    </group>
  );
}
