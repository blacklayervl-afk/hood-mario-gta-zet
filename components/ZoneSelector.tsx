"use client";

import { motion } from "framer-motion";
import type { ZoneId, Zone } from "@/lib/game-data";

interface ZoneSelectorProps {
  zones: readonly Zone[];
  activeZone: ZoneId;
  onChange: (zone: ZoneId) => void;
}

export default function ZoneSelector({
  zones,
  activeZone,
  onChange,
}: ZoneSelectorProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide justify-center">
      {zones.map((zone) => (
        <motion.button
          key={zone.id}
          onClick={() => onChange(zone.id)}
          whileTap={{ scale: 0.95 }}
          className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
            activeZone === zone.id
              ? "border-white/60 bg-white/15 text-white"
              : "border-white/15 bg-black/40 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
          style={{
            boxShadow:
              activeZone === zone.id
                ? `0 0 12px ${zone.color}60`
                : undefined,
          }}
        >
          {/* Color dot */}
          <span
            className="w-2.5 h-2.5 rounded-full mb-1 flex-shrink-0"
            style={{ background: zone.color }}
          />
          <span className="whitespace-nowrap leading-tight">{zone.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
