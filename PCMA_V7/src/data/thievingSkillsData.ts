export const thievingSkills = [
  'Pick Pockets', 'Find/Remove Poison', 'Poisoning', 'Open Locks', 'Find/Remove Traps', 'Set Traps', 'Surprise',
  'Move Silently', 'Hide in Shadows', 'Climb Walls', 'Escape Bonds', 'Bribe', 'Read Languages', 'Vision and Perception',
  'Detect Noise', 'Detect Secret', 'Detect Magic (Heroic)', 'Detect Illusion (Heroic)', 'Detect Mystic (Heroic)',
  'Detect Psionic (Heroic)', 'Detect Curse (Heroic)', 'Evaluate Adventuring Site (Heroic)'
];

export const exceptionalPowers: Record<string, string[]> = {
  'Pick Pockets': [
    'Unbelievable feats of theft: chained items, even boots while worn (penalty by difficulty)'
  ],
  'Find/Remove Poison': [
    'Analyze poison: Type, Method, Onset-time, Strength, Duration, Effect, Complexity, Special Stats'
  ],
  'Poisoning': [
    'Create simple poisons from common components (sleep/slay); prolong onset time with material components'
  ],
  'Set Traps': [
    '–4 Saves & Evasions, Auto-hit traps (1d6/2 CL), Supranatural damage, trap vs. wards'
  ],
  'Surprise': [
    'Shadow Assault before opponent can react; even usable when noticed (half SP-Check)'
  ],
  'Move Silently': [
    'Move at 50% speed min, +10% speed per 20% Check Quality'
  ],
  'Hide in Shadows': [
    'Move at 50% speed min, hide in imperfect light with penalty, merge with shadows (vs watchers)'
  ],
  'Climb Walls': [
    'Climb nearly any surface; 3 limbs sufficient; fight while climbing; Far-Movement bonus +2–4'
  ],
  'Escape Bonds': [
    'Exceptional binding of others; master escape from bindings'
  ],
  'Bribe': [
    'Offset bribe cost multiplier from bad reaction; bonus info/goods from NPCs'
  ],
  'Read Languages': [
    'Read any form of magic (Check at half, penalties for complexity/race/etc.)'
  ],
  'Detect Noise': [
    'Move while listening (50% + per quality); keep helmet on; faster Main Action'
  ],
  'Detect Secret': [
    'Detect magically cloaked/hidden secrets (Check at half)'
  ],
  'Detect Magic (Heroic)': [
    'Analyze on detection: power, SL, duration, AoE, ward stats'
  ],
  'Detect Illusion (Heroic)': [
    'Analyze on detection: power, SL, duration, AoE, ward stats'
  ],
  'Detect Mystic (Heroic)': [
    'Analyze on detection: power, SL, duration, AoE, ward stats'
  ],
  'Detect Psionic (Heroic)': [
    'Analyze on detection: power, SL, duration, AoE, ward stats'
  ],
  'Detect Curse (Heroic)': [
    'Analyze on detection: power, SL, duration, AoE, ward stats'
  ],
  'Vision and Perception': ['Minute Seeing', "Eagle's Vision"],
  'Evaluate Adventuring Site (Heroic)': [
    'Identify one specific treasure in each category (money, jewelry, art, magic)'
  ],
  'Find/Remove Traps': ['Disarm large traps; Redefine supranatural triggers'],
};

export const maskedMysteryPowers: Record<string, string[]> = {
  'Pick Pockets': [
    'Succor (Instant Recovery via touch)',
    'Enhanced theft capabilities with supernatural precision'
  ],
  'Find/Remove Poison': [
    'Needle Nose: Aura detection, analyze 4/rd, poison resistance +1, periapt vs. poison +5'
  ],
  'Poisoning': [
    'Nasty Needle: Empowered saves, poison duration +20%, preserve poisons, create Needle Venom (2x/day +1/5lvls)'
  ],
  'Open Locks': [
    'Mystical Lock Manipulation: Can affect magical and supernatural locks',
    'Phase Lock: Temporarily phase through locked barriers'
  ],
  'Find/Remove Traps': [
    'Masked Entrapper: Area traps, clairvoyance alarms, Traptrigger (trap activates magic item)'
  ],
  'Surprise': [
    'Shadow Lurker: Teleport 100y (2x/day +1/5lvls), includes escape/backstab'
  ],
  'Move Silently': [
    'Masked Stalker: Jump/Farjump, mystic silence, shapechange to slithering tracker (10x/day max)'
  ],
  'Hide in Shadows': [
    'Masked Shadow: Mystic darkness, Shadowfade (vs. VP, DN, DSc, ElecS, AerS, VibS, etc.)'
  ],
  'Climb Walls': [
    'Shadow Spider: Climb non-solid surfaces, Roof-Wandering movement, Space Anchor (Immovability, no teleport)'
  ],
  'Escape Bonds': [
    'Twister: Escape from magical/physical binds, cursed gear; create rope/bilarro bonds (max +20); Entanglement Class'
  ],
  'Bribe': [
    'Hypnotism (3x/day)',
    'Quest (1x/week)',
    'Suggestion with Ward Crush (2x/day +1/5 lvls)'
  ],
  'Read Languages': [
    'Tongues (3x/day)',
    'Reduced Scroll Fail Chance (-5%)',
    'Supreme Scrolls (10x/day max)'
  ],
  'Vision and Perception': [
    'True Seeing 60ft (2x/day +1/5 lvls)',
    'Infravision/Ultravision, All-round vision'
  ],
  'Detect Noise': [
    'Clairaudience (range/penalty based)',
    'Clairvoyance (3x/day)',
    'Whispering Vision (sonar, 60ft, 2x/day +1/5 lvls)'
  ],
  'Detect Secret': [
    'Predict Beyond Secret (-150%)',
    'Masked Secret: hide objects (10x/day max)'
  ],
  'Detect Magic (Heroic)': [
    'Arcane Sight: Permanent detect magic with detailed analysis',
    'Magic Disruption: Can temporarily suppress detected magic'
  ],
  'Detect Mystic (Heroic)': [
    'Eye of Mystics: See through all mystical concealment',
    'Mystical Resonance: Sense mystical energies at great distances'
  ],
  'Detect Psionic (Heroic)': [
    'Mind Sight: Detect and analyze psionic activity',
    'Psionic Shield: Resistance to detected psionic effects'
  ],
  'Detect Illusion (Heroic)': [
    'Spectral Force (3x/day)',
    'Control Illusion (1 rnd)',
    'Eye of Truth (3 turns, detect illusions, 2x/day +1/5 lvls)'
  ],
  'Detect Curse (Heroic)': [
    'Afflictor: project curse (2x/day +1/5 lvls)',
    'Curse Analysis: Determine exact nature and removal methods'
  ],
  'Evaluate Adventuring Site (Heroic)': [
    'Identify one specific treasure in each category (money, jewelry, art, magic)',
    'Locate Known Treasure Object (e.g. "Sword of Freya")'
  ]
};

export const isHeroicSkill = (skillName: string): boolean => {
  return skillName.includes('(Heroic)');
};

export const getThievingClasses = () => ['Rogues', 'Thief', 'Bard'];