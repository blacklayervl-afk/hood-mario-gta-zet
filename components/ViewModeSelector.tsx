"use client";

import { Eye, Plane, Globe, Film } from "lucide-react";
import type { CameraMode } from "@/lib/game-data";

const MODES: {
  id: CameraMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    id: "godvision",
    label: "God",
    icon: <Globe size={14} />,
    description: "Orbital overview",
  },
  {
    id: "surface",
    label: "Surface",
    icon: <Eye size={14} />,
    description: "Third-person follow",
  },
  {
    id: "aerial",
    label: "Aerial",
    icon: <Plane size={14} />,
    description: "Drone view",
  },
  {
    id: "orbit",
    label: "Orbit",
    icon: <Film size={14} />,
    description: "Cinematic orbit",
  },
];

interface ViewModeSelectorProps {
  current: CameraMode;
  onChange: (mode: CameraMode) => void;
}

export default function ViewModeSelector({
  current,
  onChange,
}: ViewModeSelectorProps) {
  return (
    <div className="flex gap-1.5">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          title={mode.description}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-150 ${
            current === mode.id
              ? "bg-white/20 border-white/50 text-white"
              : "bg-black/50 border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {mode.icon}
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
