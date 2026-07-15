export type ZoneId =
  | "arrival"
  | "core"
  | "mobility"
  | "industry"
  | "service"
  | "open"
  | "lookout"
  | "quiet";

export type CameraMode = "godvision" | "surface" | "aerial" | "orbit";

export const ZONES = [
  {
    id: "arrival" as ZoneId,
    name: "Arrival Plateau",
    color: "#4ade80",
    description: "Flat landing zone – your starting point on the planet.",
    elevation: "Low (0–30 m)",
    area: "0.68 km²",
    features: ["Landing pad", "Welcome beacon", "Supply crates"],
  },
  {
    id: "core" as ZoneId,
    name: "Core / Plaza",
    color: "#60a5fa",
    description: "The central hub of all activity on the planet.",
    elevation: "Mid (30–60 m)",
    area: "0.72 km²",
    features: ["Central tower", "Market stalls", "NPC hub"],
  },
  {
    id: "mobility" as ZoneId,
    name: "Mobility Belt",
    color: "#f59e0b",
    description: "Vehicle ring surrounding the core.",
    elevation: "Low (10–40 m)",
    area: "0.85 km²",
    features: ["Race track", "Vehicle depot", "Speed ramps"],
  },
  {
    id: "industry" as ZoneId,
    name: "Industry Quarter",
    color: "#ef4444",
    description: "Technical area with factories and machinery.",
    elevation: "Mid (40–80 m)",
    area: "0.60 km²",
    features: ["Factory complex", "Mining rigs", "Power plant"],
  },
  {
    id: "service" as ZoneId,
    name: "Service Basin",
    color: "#a78bfa",
    description: "Interaction zone for quests and services.",
    elevation: "Low (0–20 m)",
    area: "0.55 km²",
    features: ["Quest board", "Hospital", "Shopping district"],
  },
  {
    id: "open" as ZoneId,
    name: "Open Surface",
    color: "#10b981",
    description: "Vast plains ideal for exploration.",
    elevation: "Flat (0–15 m)",
    area: "1.20 km²",
    features: ["Rolling hills", "Wildlife", "Hidden treasures"],
  },
  {
    id: "lookout" as ZoneId,
    name: "Lookout Ridge",
    color: "#f472b6",
    description: "Mountain peaks with stunning panoramic views.",
    elevation: "High (80–150 m)",
    area: "0.52 km²",
    features: ["Summit viewpoint", "Climbing routes", "Rare collectibles"],
  },
  {
    id: "quiet" as ZoneId,
    name: "Quiet Side",
    color: "#6366f1",
    description: "Minimal, peaceful zone away from the action.",
    elevation: "Mid (20–50 m)",
    area: "0.50 km²",
    features: ["Meditation spots", "Hidden caves", "Star gazing"],
  },
] as const;

export type Zone = (typeof ZONES)[number];

export const PLANET_SPECS = {
  radius: 668.45,
  circumference: 4200,
  surfaceArea: 5.62,
  gravity: 9.80665,
};
