"use client";

import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Zone, PLANET_SPECS } from "@/lib/game-data";

interface PlanetInfoProps {
  specs: typeof PLANET_SPECS;
  zone: Zone;
  onClose: () => void;
}

export default function PlanetInfo({ specs, zone, onClose }: PlanetInfoProps) {
  return (
    <Card className="w-72 bg-black/80 backdrop-blur-md border-white/20 text-white p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-yellow-400">Planet Info</h2>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Planet specs */}
      <div className="space-y-1 text-sm border-b border-white/10 pb-3">
        <Row label="Radius" value={`${specs.radius} m`} />
        <Row label="Circumference" value={`${specs.circumference.toLocaleString()} m`} />
        <Row label="Surface Area" value={`${specs.surfaceArea} km²`} />
        <Row label="Gravity" value={`${specs.gravity} m/s²`} />
      </div>

      {/* Active zone */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: zone.color }}
          />
          <span className="font-semibold">{zone.name}</span>
          <Badge
            variant="outline"
            className="ml-auto text-xs border-white/20 text-white/70"
          >
            {zone.area}
          </Badge>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">{zone.description}</p>
        <Row label="Elevation" value={zone.elevation} />
        <div className="mt-1">
          <span className="text-white/50 text-xs uppercase tracking-wider">Features</span>
          <ul className="mt-1 space-y-0.5">
            {zone.features.map((f) => (
              <li key={f} className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="text-yellow-400">•</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-white/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
