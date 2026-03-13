// Detailed nautical information for every rigging component on a Laser/ILCA sailboat
// Used by ObjectDetailDrawer to display rich descriptions when objects are clicked

export type RiggingCategory = "spar" | "sail" | "block" | "line" | "fitting" | "system";

export interface RiggingComponentInfo {
  name: string;
  category: RiggingCategory;
  description: string;
  relationships: string[];
  tips?: string;
}

// Category display config
export const CATEGORY_COLORS: Record<RiggingCategory, string> = {
  spar: "hsl(35, 90%, 55%)",
  sail: "hsl(210, 80%, 60%)",
  block: "hsl(0, 0%, 50%)",
  line: "hsl(140, 60%, 50%)",
  fitting: "hsl(270, 50%, 55%)",
  system: "hsl(190, 70%, 50%)",
};

export const CATEGORY_LABELS: Record<RiggingCategory, string> = {
  spar: "Spar",
  sail: "Sail",
  block: "Block / Pulley",
  line: "Line / Rope",
  fitting: "Fitting",
  system: "System",
};

/**
 * Master lookup of all sail-rig components.
 * Keyed by the same IDs used in laserRigging.ts hardpoints, pulleys, ropes, etc.
 */
export const RIGGING_INFO: Record<string, RiggingComponentInfo> = {
  // ── Spars ──────────────────────────────────────────
  mast: {
    name: "Mast (Upper + Lower)",
    category: "spar",
    description:
      "The Laser/ILCA mast is a two-piece aluminium extrusion (lower section 3.03 m, upper section 3.07 m) that supports the sail via a luff sleeve. The sail slides directly over the mast — there is no halyard or sail track. The mast steps into a hole in the deck (mast step) and passes through a collar (mast partner) that controls side-bend and rake.",
    relationships: ["mast_step", "mast_partner", "gooseneck", "mast_head", "sail"],
    tips: "Mast pre-bend affects sail shape: more bend flattens the sail and de-powers in heavy air. Adjust bend via the mast partner and vang tension.",
  },
  boom: {
    name: "Boom",
    category: "spar",
    description:
      "The aluminium boom (2.74 m) attaches to the mast at the gooseneck fitting and extends aft. In this rig model the sail is free-footed: only the clew is tied to boom-end outhaul hardware, while the rest of the foot can float. Vang tension and rope length control how hard the boom is pulled down.",
    relationships: ["gooseneck", "vang_boom", "boom_block", "outhaul_cleat", "boom_end", "sail"],
    tips: "Shorter/tighter boom rope (vang) increases downward boom force; outhaul still controls clew depth.",
  },

  // ── Sail ──────────────────────────────────────────
  sail: {
    name: "Mainsail",
    category: "sail",
    description:
      "The Laser/ILCA mainsail is a single-panel Dacron sail with a luff sleeve that slides over the mast. It has four horizontal battens on the leech (trailing edge) to support the roach. A clear vinyl window allows visibility to leeward. Sail dimensions: luff 5.13 m, foot 2.74 m. The sail shape is controlled by cunningham (luff tension), outhaul (foot tension), vang (leech twist), and mainsheet (overall trim).",
    relationships: ["mast", "boom", "cunningham", "outhaul", "mainsheet", "vang"],
    tips: "Increase cloth resolution for smoother simulation. Enable self-collision to prevent the mesh from passing through itself in strong wind.",
  },

  // ── Pulleys / Blocks ──────────────────────────────
  mainsheet_boom: {
    name: "Mainsheet Boom Block",
    category: "block",
    description:
      "A double-sheave block (pulley) mounted on the underside of the boom. The mainsheet runs from the traveler car up through this block, then to the mid-boom block, creating a multi-part purchase system. This is the primary upper block in the mainsheet tackle.",
    relationships: ["mainsheet", "mainsheet_mid_boom", "mainsheet_traveler", "boom"],
    tips: "Position determines the mainsheet lead angle — moving it aft increases leech tension.",
  },
  mainsheet_mid_boom: {
    name: "Mainsheet Mid-Boom Block",
    category: "block",
    description:
      "A single-sheave turning block on the boom, positioned between the mainsheet boom block and the hull block. The mainsheet passes through this block before descending to the hull-mounted block, adding mechanical advantage to the purchase system.",
    relationships: ["mainsheet", "mainsheet_boom", "mainsheet_hull", "boom"],
    tips: "This intermediate block increases the mainsheet purchase ratio for easier trimming.",
  },
  mainsheet_hull: {
    name: "Mainsheet Hull Block",
    category: "block",
    description:
      "A single-sheave block mounted on the hull/cockpit floor. The mainsheet runs from the mid-boom block down through this block and then to the sailor's hand as the free tail. This is the lowest point in the mainsheet purchase system.",
    relationships: ["mainsheet", "mainsheet_mid_boom", "mainsheet_boom"],
    tips: "The free tail exits here — this is what the sailor grabs to trim the mainsheet.",
  },
  mainsheet_traveler: {
    name: "Mainsheet Traveler Block",
    category: "block",
    description:
      "A single-sheave block attached to the traveler car (the sliding block on the rope horse across the transom). The mainsheet exits this block and the sailor controls trim by pulling the tail. The car slides port/starboard on the rope horse to change the mainsheet geometry.",
    relationships: ["mainsheet", "mainsheet_boom", "traveler_port", "traveler_starboard"],
    tips: "Moving the car to windward tightens leech without pulling the boom down as much.",
  },
  vang_boom_block: {
    name: "Vang Boom Block (Kicking Strap Upper)",
    category: "block",
    description:
      "A double-sheave block bolted to the underside of the boom near the gooseneck. The boom vang (kicking strap) runs between this block and the vang base block on the mast foot, providing a 4:1 or 6:1 purchase. When tensioned, the vang pulls the boom down, tightening the leech and preventing the boom from rising on a reach or run.",
    relationships: ["vang", "vang_base_block", "boom"],
    tips: "Critical for downwind sailing — without vang the boom lifts and the sail twists open excessively.",
  },
  vang_base_block: {
    name: "Vang Base Block (Kicking Strap Lower)",
    category: "block",
    description:
      "A double-sheave block attached to the mast base / deck fitting near the mast step. This is the lower anchor of the boom vang (kicking strap) system. The vang line runs between this block and the vang boom block to create purchase.",
    relationships: ["vang", "vang_boom_block", "vang_base"],
    tips: "Ensure this block is properly secured — high vang loads in heavy air can exceed 200 kg.",
  },
  cunningham_block: {
    name: "Cunningham Fairlead Block",
    category: "block",
    description:
      "A single-sheave turning block near the base of the mast. The cunningham line runs from the cringle (grommet) on the sail luff, through this block, and back to a cleat. Tensioning the cunningham pulls the draft (deepest point of the sail) forward, which is essential in heavy air to maintain control.",
    relationships: ["cunningham", "cunningham_mast", "cunningham_base"],
    tips: "In light air, ease the cunningham completely. In heavy air, tension it to flatten the entry and move draft forward.",
  },
  outhaul_block: {
    name: "Outhaul Block",
    category: "block",
    description:
      "A single-sheave block near the aft end of the boom. The outhaul line runs from the clew of the sail through this block and forward to a cleat. Tensioning the outhaul flattens the lower section of the sail by pulling the clew aft along the boom.",
    relationships: ["outhaul", "outhaul_cleat", "boom_end"],
    tips: "Ease outhaul in light air for a deeper, more powerful shape. Tension in heavy air to flatten and de-power.",
  },

  // ── Ropes / Lines ─────────────────────────────────
  mainsheet: {
    name: "Mainsheet",
    category: "line",
    description:
      "The primary sail control line (8 mm polyester/Dyneema). Runs from the boom block through the traveler block and into the sailor's hand. Controls the angle of the boom (and sail) relative to the wind. On a Laser, the mainsheet system provides approximately 4:1 mechanical advantage. The mainsheet is the most constantly adjusted line while sailing.",
    relationships: ["mainsheet_boom", "mainsheet_traveler", "boom"],
    tips: "In a gust, ease the mainsheet to spill wind and prevent capsizing. The mainsheet also bends the top of the mast aft, which flattens the upper sail.",
  },
  vang: {
    name: "Boom Vang (Kicking Strap)",
    category: "line",
    description:
      "A 6 mm line running between the vang boom block and vang base block, typically providing 6:1 purchase. Controls leech tension independently of the mainsheet. When sailing upwind, the vang supplements the mainsheet's leech control. Off the wind, the vang becomes the PRIMARY leech control because the mainsheet is eased and no longer pulls the boom down.",
    relationships: ["vang_boom_block", "vang_base_block"],
    tips: "Set the vang before bearing away to maintain leech tension downwind. 'Vang sheeting' is an advanced technique where the vang is set hard and the mainsheet is used only for angle.",
  },
  cunningham: {
    name: "Cunningham (Downhaul)",
    category: "line",
    description:
      "A 5 mm control line that tensions the luff of the sail by pulling down on the cunningham cringle (a reinforced grommet above the tack). This moves the position of maximum draft forward in the sail, which is critical for maintaining proper airflow in increasing wind. Named after Briggs Cunningham who popularized the system.",
    relationships: ["cunningham_block", "cunningham_mast", "cunningham_base"],
    tips: "The cunningham is one of the most important de-powering controls. In survival conditions, maximum cunningham wrinkles the luff but keeps the boat manageable.",
  },
  outhaul: {
    name: "Outhaul",
    category: "line",
    description:
      "A 5 mm line that controls the tension along the foot of the sail by pulling the clew (aft lower corner) toward the boom end. Adjusting the outhaul changes the depth (camber) of the lower third of the sail. The outhaul runs through a block at the boom end and cleats near the gooseneck.",
    relationships: ["outhaul_block", "outhaul_cleat", "boom_end"],
    tips: "A good starting point is 3-5 cm of foot depth. Ease in light air, tension in heavy air.",
  },

  // ── Hardpoints / Fittings ─────────────────────────
  mast_step: {
    name: "Mast Step",
    category: "fitting",
    description: "A reinforced socket in the hull deck where the base of the mast sits. On the Laser, this is a simple hole in the deck with a moulded cup. The mast rotates freely in the step.",
    relationships: ["mast"],
  },
  mast_partner: {
    name: "Mast Partner (Collar)",
    category: "fitting",
    description: "The deck opening/collar through which the mast passes. On the Laser, the gap between the mast and partner ring controls how much the mast can bend sideways and fore-aft. Some sailors use spacers to adjust this.",
    relationships: ["mast"],
  },
  vang_base: {
    name: "Vang Base Fitting",
    category: "fitting",
    description: "A stainless steel fitting bolted to the deck near the base of the mast. The lower vang block attaches here. Must withstand high compression loads.",
    relationships: ["vang_base_block", "vang"],
  },
  cunningham_base: {
    name: "Cunningham Cleat/Fairlead",
    category: "fitting",
    description: "A cleat or fairlead on the deck near the mast base where the cunningham line is secured after being tensioned.",
    relationships: ["cunningham_block", "cunningham"],
  },
  traveler_port: {
    name: "Traveler Fairlead — Port",
    category: "fitting",
    description: "A stainless steel eye or fairlead on the port (left) side of the transom where the traveler rope horse is anchored. The rope runs through this fitting to the starboard side.",
    relationships: ["traveler_starboard", "mainsheet_traveler"],
  },
  traveler_starboard: {
    name: "Traveler Fairlead — Starboard",
    category: "fitting",
    description: "A stainless steel eye or fairlead on the starboard (right) side of the transom where the traveler rope horse is anchored.",
    relationships: ["traveler_port", "mainsheet_traveler"],
  },
  mainsheet_base: {
    name: "Mainsheet Anchor Point",
    category: "fitting",
    description: "The central attachment point on the transom for the mainsheet system. On the Laser, this is where the traveler car block sits on the rope horse.",
    relationships: ["mainsheet", "mainsheet_traveler"],
  },
  gooseneck: {
    name: "Gooseneck Fitting",
    category: "fitting",
    description: "A universal joint that connects the boom to the mast, allowing the boom to swing horizontally (for sheeting) and vertically (controlled by the vang). On the Laser, it's a simple pin-and-sleeve arrangement.",
    relationships: ["mast", "boom"],
  },
  vang_boom: {
    name: "Vang Boom Attachment",
    category: "fitting",
    description: "The fitting on the underside of the boom where the upper vang block is bolted. Located approximately 0.5 m aft of the gooseneck.",
    relationships: ["vang_boom_block", "boom"],
  },
  boom_block: {
    name: "Boom Mainsheet Block Attachment",
    category: "fitting",
    description: "The bail or strap on the underside of the boom where the mainsheet boom block hangs. Positioned about 1.8 m aft of the gooseneck.",
    relationships: ["mainsheet_boom", "boom"],
  },
  outhaul_cleat: {
    name: "Outhaul Cleat",
    category: "fitting",
    description: "A cam cleat mounted on the boom where the outhaul line is secured after adjustment. Located near the aft end of the boom.",
    relationships: ["outhaul", "outhaul_block"],
  },
  boom_end: {
    name: "Boom End Cap",
    category: "fitting",
    description: "The aft end of the boom with a fitting for the outhaul line and boom end block. The clew of the sail attaches here.",
    relationships: ["outhaul", "outhaul_block", "sail"],
  },
  mast_head: {
    name: "Masthead",
    category: "fitting",
    description: "The top of the mast. On the Laser, the sail sleeve extends to the masthead. There is no halyard — the sail is held up by the sleeve itself.",
    relationships: ["mast", "sail"],
  },
  halyard_exit: {
    name: "Halyard Exit",
    category: "fitting",
    description: "An opening in the lower mast section. On the Laser this is mainly a drainage hole, since there is no traditional halyard — the sail is sleeved over the mast.",
    relationships: ["mast"],
  },
  cunningham_mast: {
    name: "Cunningham Attachment (Mast)",
    category: "fitting",
    description: "The point on the lower mast/sail tack area where the cunningham line attaches to the sail's cunningham cringle. Pulling down here tensions the luff.",
    relationships: ["cunningham", "cunningham_block"],
  },

  // ── Systems ───────────────────────────────────────
  traveler: {
    name: "Traveler (Rope Horse)",
    category: "system",
    description:
      "Unlike larger boats with metal tracks, the Laser uses a 'rope horse' — a length of low-stretch line running across the transom between two fairlead eyes. A block slides freely along this rope, and the mainsheet exits through this block. The sailor adjusts the car position by cleating the traveler line at different points. Moving the car to windward allows the boom to be more centered without over-sheeting.",
    relationships: ["traveler_port", "traveler_starboard", "mainsheet_traveler", "mainsheet"],
    tips: "Center the car for upwind sailing. Let it slide to leeward in heavy air to spill power from the upper sail.",
  },
};

/**
 * Get info for a component by its ID. Falls back to a generic entry if not found.
 */
export function getRiggingInfo(id: string): RiggingComponentInfo {
  if (RIGGING_INFO[id]) return RIGGING_INFO[id];

  return {
    name: id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    category: "fitting",
    description: "A rigging component on the Laser/ILCA sailboat.",
    relationships: [],
  };
}
