"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ZoneId } from "@/lib/game-data";

const PLANET_RADIUS = 100;

const ZONE_COLORS: Record<ZoneId, string> = {
  arrival: "#4ade80",
  core: "#60a5fa",
  mobility: "#f59e0b",
  industry: "#ef4444",
  service: "#a78bfa",
  open: "#10b981",
  lookout: "#f472b6",
  quiet: "#6366f1",
};

interface TerrainPlanetProps {
  activeZone: ZoneId;
}

function generateTerrainGeometry() {
  const geometry = new THREE.IcosahedronGeometry(PLANET_RADIUS, 6);
  const positions = geometry.attributes.position as THREE.BufferAttribute;
  const count = positions.count;

  for (let i = 0; i < count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    const dir = new THREE.Vector3(x, y, z).normalize();
    const theta = Math.atan2(dir.z, dir.x);
    const phi = Math.acos(dir.y);

    // Simple noise-based displacement
    const noise =
      Math.sin(theta * 8) * Math.cos(phi * 6) * 2 +
      Math.sin(theta * 3 + 1.2) * Math.cos(phi * 4 + 0.8) * 3 +
      Math.sin(theta * 15 + phi * 10) * 0.8;

    // Extra elevation for lookout ridge zone (top hemisphere)
    const ridgeBump =
      dir.y > 0.6 ? Math.pow(dir.y - 0.6, 2) * 20 : 0;

    const radius = PLANET_RADIUS + noise + ridgeBump;
    positions.setXYZ(i, dir.x * radius, dir.y * radius, dir.z * radius);
  }

  geometry.computeVertexNormals();
  return geometry;
}

export default function TerrainPlanet({ activeZone }: TerrainPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => generateTerrainGeometry(), []);

  const activeColor = useMemo(
    () => new THREE.Color(ZONE_COLORS[activeZone]),
    [activeZone]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Very slow auto-rotation for atmosphere
      meshRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group>
      {/* Main planet surface */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color={activeColor}
          roughness={0.85}
          metalness={0.05}
          wireframe={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS * 1.02, 64, 64]} />
        <meshStandardMaterial
          color={activeColor}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Zone markers */}
      {ZONE_ANGLES.map((zone) => (
        <ZoneMarker
          key={zone.id}
          theta={zone.theta}
          phi={zone.phi}
          color={ZONE_COLORS[zone.id as ZoneId]}
          active={zone.id === activeZone}
          label={zone.label}
        />
      ))}
    </group>
  );
}

const ZONE_ANGLES = [
  { id: "arrival", theta: 0, phi: Math.PI / 2, label: "A" },
  { id: "core", theta: Math.PI / 4, phi: Math.PI / 2, label: "C" },
  { id: "mobility", theta: Math.PI / 2, phi: Math.PI / 2, label: "M" },
  { id: "industry", theta: (3 * Math.PI) / 4, phi: Math.PI / 2, label: "I" },
  { id: "service", theta: Math.PI, phi: Math.PI / 2, label: "S" },
  { id: "open", theta: (5 * Math.PI) / 4, phi: Math.PI / 2, label: "O" },
  { id: "lookout", theta: 0, phi: Math.PI / 4, label: "L" },
  { id: "quiet", theta: Math.PI, phi: (3 * Math.PI) / 4, label: "Q" },
];

interface ZoneMarkerProps {
  theta: number;
  phi: number;
  color: string;
  active: boolean;
  label: string;
}

function ZoneMarker({ theta, phi, color, active }: ZoneMarkerProps) {
  const r = PLANET_RADIUS + 3;
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[active ? 3 : 1.5, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 1 : 0.3}
      />
    </mesh>
  );
}
