"use client";

/**
 * Hood-style character model inspired by classic open-world games.
 * Built from Three.js primitives: hoodie, bandana, baggy pants, gold chain.
 */
export default function Character() {
  return (
    <group scale={[0.4, 0.4, 0.4]} position={[0, 0, 0]}>
      {/* Body / Hoodie */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[1, 1.4, 0.7]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 2.05, -0.1]} castShadow>
        <sphereGeometry args={[0.45, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#16213e" roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <sphereGeometry args={[0.38, 12, 12]} />
        <meshStandardMaterial color="#c68642" roughness={0.7} />
      </mesh>

      {/* Bandana */}
      <mesh position={[0, 1.82, 0.26]} castShadow>
        <boxGeometry args={[0.58, 0.14, 0.04]} />
        <meshStandardMaterial color="#dc2626" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.12, 1.98, 0.35]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.12, 1.98, 0.35]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Gold chain */}
      <mesh position={[0, 1.38, 0.38]}>
        <torusGeometry args={[0.18, 0.025, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Baggy pants */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.05, 0.9, 0.75]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.28, -0.35, 0]} castShadow>
        <boxGeometry args={[0.42, 0.7, 0.55]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.28, -0.35, 0]} castShadow>
        <boxGeometry args={[0.42, 0.7, 0.55]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>

      {/* Left shoe */}
      <mesh position={[-0.28, -0.75, 0.08]} castShadow>
        <boxGeometry args={[0.42, 0.18, 0.65]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.7} />
      </mesh>

      {/* Right shoe */}
      <mesh position={[0.28, -0.75, 0.08]} castShadow>
        <boxGeometry args={[0.42, 0.18, 0.65]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.7} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.72, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1.1, 0.38]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.72, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1.1, 0.38]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* Left hand */}
      <mesh position={[-0.72, 0.6, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#c68642" roughness={0.7} />
      </mesh>

      {/* Right hand */}
      <mesh position={[0.72, 0.6, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#c68642" roughness={0.7} />
      </mesh>
    </group>
  );
}
