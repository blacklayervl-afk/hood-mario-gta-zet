"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Preload } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import type { ZoneId, CameraMode } from "@/lib/game-data";
import TerrainPlanet from "./TerrainPlanet";
import CharacterController from "./CharacterController";
import GameCamera from "./GameCamera";
import Collectibles from "./Collectibles";
import { useToast } from "@/hooks/use-toast";

interface GameSceneProps {
  activeZone: ZoneId;
  cameraMode: CameraMode;
  onCollect: (points: number) => void;
  onLoaded: () => void;
}

export default function GameScene({
  activeZone,
  cameraMode,
  onCollect,
  onLoaded,
}: GameSceneProps) {
  const { toast } = useToast();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;
      // Small delay to allow canvas to render
      const t = setTimeout(() => onLoaded(), 500);
      return () => clearTimeout(t);
    }
  }, [onLoaded]);

  const handleCollect = (type: "coin" | "star") => {
    const points = type === "star" ? 50 : 10;
    onCollect(points);
    toast({
      title: type === "star" ? "⭐ Star Collected! +50 pts" : "🪙 Coin! +10 pts",
      duration: 1500,
    });
  };

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ fov: 60, near: 0.1, far: 5000 }}
      gl={{ antialias: true }}
    >
      {/* Ambient scene lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[200, 300, 100]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-200, 100, -200]} intensity={0.5} color="#60a5fa" />

      {/* Starfield background */}
      <Stars
        radius={2000}
        depth={500}
        count={6000}
        factor={4}
        saturation={0}
        fade
      />

      <Suspense fallback={null}>
        {/* Planet terrain */}
        <TerrainPlanet activeZone={activeZone} />

        {/* Player character + physics */}
        <CharacterController cameraMode={cameraMode} />

        {/* Collectibles */}
        <Collectibles activeZone={activeZone} onCollect={handleCollect} />

        {/* Camera */}
        <GameCamera mode={cameraMode} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
