"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useCallback } from "react";
import Loader from "@/components/Loader";
import ZoneSelector from "@/components/ZoneSelector";
import ViewModeSelector from "@/components/ViewModeSelector";
import PlanetInfo from "@/components/PlanetInfo";
import { Toaster } from "@/components/ui/toaster";
import { ZONES, PLANET_SPECS, type ZoneId, type CameraMode } from "@/lib/game-data";

const GameScene = dynamic(() => import("@/components/GameScene"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function HomePage() {
  const [activeZone, setActiveZone] = useState<ZoneId>("arrival");
  const [cameraMode, setCameraMode] = useState<CameraMode>("godvision");
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCollect = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 3-D Game Canvas */}
      <Suspense fallback={<Loader />}>
        <GameScene
          activeZone={activeZone}
          cameraMode={cameraMode}
          onCollect={handleCollect}
          onLoaded={() => setIsLoaded(true)}
        />
      </Suspense>

      {/* HUD overlays – only shown when game is loaded */}
      {isLoaded && (
        <>
          {/* Score display */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white font-bold text-lg">
            ⭐ {score} pts
          </div>

          {/* Top-left: planet name + zone */}
          <div className="absolute top-4 left-4 z-10 text-white">
            <h1 className="text-2xl font-black tracking-widest uppercase text-yellow-400 drop-shadow">
              TET HOOD
            </h1>
            <p className="text-sm text-white/70 mt-0.5">
              Zone:{" "}
              <span className="font-semibold text-white">
                {ZONES.find((z) => z.id === activeZone)?.name}
              </span>
            </p>
          </div>

          {/* Top-right: camera mode selector */}
          <div className="absolute top-4 right-4 z-10">
            <ViewModeSelector
              current={cameraMode}
              onChange={setCameraMode}
            />
          </div>

          {/* Bottom: zone selector */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4">
            <ZoneSelector
              zones={ZONES}
              activeZone={activeZone}
              onChange={setActiveZone}
            />
          </div>

          {/* Info button */}
          <button
            onClick={() => setShowInfo((v) => !v)}
            className="absolute bottom-24 right-4 z-10 bg-black/60 border border-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle planet info"
          >
            ℹ
          </button>

          {/* Planet info panel */}
          {showInfo && (
            <div className="absolute bottom-36 right-4 z-10">
              <PlanetInfo
                specs={PLANET_SPECS}
                zone={ZONES.find((z) => z.id === activeZone)!}
                onClose={() => setShowInfo(false)}
              />
            </div>
          )}

          {/* Controls hint */}
          <div className="absolute bottom-24 left-4 z-10 text-white/50 text-xs space-y-0.5">
            <p>WASD – Move</p>
            <p>SPACE – Jump</p>
            <p>Mouse – Look</p>
          </div>
        </>
      )}

      <Toaster />
    </main>
  );
}
