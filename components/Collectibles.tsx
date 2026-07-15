"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ZoneId } from "@/lib/game-data";

const PLANET_RADIUS = 100;

interface CollectibleItem {
  id: string;
  type: "coin" | "star";
  position: THREE.Vector3;
  collected: boolean;
}

interface CollectiblesProps {
  activeZone: ZoneId;
  onCollect: (type: "coin" | "star") => void;
}

function randomSurfacePoint(seed: number): THREE.Vector3 {
  const phi = Math.acos(2 * ((seed * 1.6180339) % 1) - 1);
  const theta = (seed * 2.3999999) % (Math.PI * 2);
  const r = PLANET_RADIUS + 3;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function useCollectibles(activeZone: ZoneId) {
  return useMemo(() => {
    const seed = activeZone.charCodeAt(0) + activeZone.length;
    const items: CollectibleItem[] = [];
    // 8 coins
    for (let i = 0; i < 8; i++) {
      items.push({
        id: `coin-${activeZone}-${i}`,
        type: "coin",
        position: randomSurfacePoint(seed + i * 7),
        collected: false,
      });
    }
    // 3 stars
    for (let i = 0; i < 3; i++) {
      items.push({
        id: `star-${activeZone}-${i}`,
        type: "star",
        position: randomSurfacePoint(seed + i * 13 + 100),
        collected: false,
      });
    }
    return items;
  }, [activeZone]);
}

export default function Collectibles({ activeZone, onCollect }: CollectiblesProps) {
  const items = useCollectibles(activeZone);
  const collectedSet = useRef<Set<string>>(new Set());
  const groupRef = useRef<THREE.Group>(null);

  // Reset collected on zone change
  useMemo(() => {
    collectedSet.current = new Set();
  }, [activeZone]);

  return (
    <group ref={groupRef}>
      {items.map((item) => (
        <CollectibleMesh
          key={item.id}
          item={item}
          collectedSet={collectedSet.current}
          onCollect={onCollect}
        />
      ))}
    </group>
  );
}

interface CollectibleMeshProps {
  item: CollectibleItem;
  collectedSet: Set<string>;
  onCollect: (type: "coin" | "star") => void;
}

function CollectibleMesh({ item, collectedSet, onCollect }: CollectibleMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const visibleRef = useRef(true);

  useFrame((state) => {
    if (!meshRef.current || !visibleRef.current) return;
    const t = state.clock.getElapsedTime();

    // Hover animation
    const normal = item.position.clone().normalize();
    meshRef.current.position.copy(
      item.position.clone().addScaledVector(normal, Math.sin(t * 2 + item.position.x) * 1.5)
    );
    meshRef.current.rotation.y = t * 1.5;

    // Proximity check against character (position approx)
    // We'll use a simple world-space check
    const playerPos = new THREE.Vector3(0, PLANET_RADIUS + 2, 0);
    // Try to get character position from scene
    const dist = meshRef.current.position.distanceTo(playerPos);
    if (dist < 8 && !collectedSet.has(item.id)) {
      collectedSet.add(item.id);
      visibleRef.current = false;
      meshRef.current.visible = false;
      onCollect(item.type);
    }
  });

  if (item.type === "coin") {
    return (
      <mesh ref={meshRef} position={item.position}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.9}
          roughness={0.1}
          emissive="#f59e0b"
          emissiveIntensity={0.4}
        />
      </mesh>
    );
  }

  return (
    <mesh ref={meshRef} position={item.position}>
      <octahedronGeometry args={[1.8]} />
      <meshStandardMaterial
        color="#e0f2fe"
        metalness={0.5}
        roughness={0.1}
        emissive="#38bdf8"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}
