export type AbilityName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type AbilityData = {
  score: number;
  accuracy?: number | null;
  blasting?: number | null;
  weightAllowance?: number;
  maxPress?: number;
  awareness?: number | null;
  reaction?: number;
  armory?: number | null;
  hpAdj?: number;
  shock?: string;
  resurr?: string;
  poison?: number;
  woundRec?: string;
  profSlots?: number;
  maxSpell?: number | null;
  learnSpells?: string;
  illusionSaves?: string;
  saveBonus?: number;
  bonusSpells?: number[];
  maxHenchmen?: number;
  loyalty?: number;
  [key: string]: number | string | number[] | null | undefined;
};

// Data table for raw ability effects (based only on base score)
export const abilityScoreTable: Record<AbilityName, Record<number, AbilityData>> = {
  Strength: {
    1: { score: 1, accuracy: -7, blasting: -15, weightAllowance: 1, maxPress: 3 },
    2: { score: 2, accuracy: -5, blasting: -10, weightAllowance: 2, maxPress: 5 },
    3: { score: 3, accuracy: -2, blasting: -5, weightAllowance: 5, maxPress: 10 },
    4: { score: 4, accuracy: -2, blasting: -4, weightAllowance: 10, maxPress: 25 },
    5: { score: 5, accuracy: -1, blasting: -3, weightAllowance: 15, maxPress: 30 },
    6: { score: 6, accuracy: -1, blasting: -2, weightAllowance: 20, maxPress: 55 },
    7: { score: 7, accuracy: null, blasting: -1, weightAllowance: 35, maxPress: 90 },
    8: { score: 8, accuracy: null, blasting: -1, weightAllowance: 40, maxPress: 115 },
    9: { score: 9, accuracy: null, blasting: null, weightAllowance: 45, maxPress: 140 },
    10: { score: 10, accuracy: null, blasting: null, weightAllowance: 55, maxPress: 170 },
    11: { score: 11, accuracy: null, blasting: null, weightAllowance: 70, maxPress: 195 },
    12: { score: 12, accuracy: null, blasting: null, weightAllowance: 85, maxPress: 220 },
    13: { score: 13, accuracy: null, blasting: 1, weightAllowance: 110, maxPress: 255 },
    14: { score: 14, accuracy: null, blasting: 1, weightAllowance: 135, maxPress: 280 },
    15: { score: 15, accuracy: 1, blasting: 2, weightAllowance: 160, maxPress: 305 },
    16: { score: 16, accuracy: 2, blasting: 3, weightAllowance: 185, maxPress: 330 },
    17: { score: 17, accuracy: 3, blasting: 4, weightAllowance: 235, maxPress: 380 },
    18: { score: 18, accuracy: 4, blasting: 5, weightAllowance: 335, maxPress: 480 },
    19: { score: 19, accuracy: 5, blasting: 7, weightAllowance: 485, maxPress: 640 },
    20: { score: 20, accuracy: 6, blasting: 9, weightAllowance: 535, maxPress: 700 },
    21: { score: 21, accuracy: 8, blasting: 11, weightAllowance: 635, maxPress: 810 },
    22: { score: 22, accuracy: 10, blasting: 13, weightAllowance: 785, maxPress: 970 },
    23: { score: 23, accuracy: 12, blasting: 16, weightAllowance: 935, maxPress: 1130 },
    24: { score: 24, accuracy: 15, blasting: 20, weightAllowance: 1235, maxPress: 1440 },
    25: { score: 25, accuracy: 30, blasting: 40, weightAllowance: 1535, maxPress: 1750 }
  },
  Dexterity: {
    1: { score: 1, accuracy: -7, blasting: -15, awareness: -6, reaction: 1, armory: -15 },
    2: { score: 2, accuracy: -5, blasting: -10, awareness: -4, reaction: 3, armory: -8 },
    3: { score: 3, accuracy: -2, blasting: -5, awareness: -3, reaction: 5, armory: -6 },
    4: { score: 4, accuracy: -2, blasting: -4, awareness: -2, reaction: 6, armory: -4 },
    5: { score: 5, accuracy: -1, blasting: -3, awareness: -1, reaction: 7, armory: -2 },
    6: { score: 6, accuracy: -1, blasting: -2, awareness: null, reaction: 8, armory: -1 },
    7: { score: 7, accuracy: null, blasting: -1, awareness: null, reaction: 8, armory: null },
    8: { score: 8, accuracy: null, blasting: -1, awareness: null, reaction: 9, armory: null },
    9: { score: 9, accuracy: null, blasting: null, awareness: null, reaction: 9, armory: null },
    10: { score: 10, accuracy: null, blasting: null, awareness: null, reaction: 10, armory: null },
    11: { score: 11, accuracy: null, blasting: null, awareness: null, reaction: 10, armory: null },
    12: { score: 12, accuracy: null, blasting: null, awareness: null, reaction: 10, armory: null },
    13: { score: 13, accuracy: null, blasting: 1, awareness: null, reaction: 10, armory: null },
    14: { score: 14, accuracy: null, blasting: 1, awareness: null, reaction: 10, armory: null },
    15: { score: 15, accuracy: 1, blasting: 2, awareness: null, reaction: 11, armory: 1 },
    16: { score: 16, accuracy: 2, blasting: 3, awareness: 1, reaction: 12, armory: 2 },
    17: { score: 17, accuracy: 3, blasting: 4, awareness: 1, reaction: 13, armory: 3 },
    18: { score: 18, accuracy: 4, blasting: 5, awareness: 2, reaction: 14, armory: 4 },
    19: { score: 19, accuracy: 5, blasting: 7, awareness: 3, reaction: 15, armory: 5 },
    20: { score: 20, accuracy: 6, blasting: 9, awareness: 3, reaction: 16, armory: 6 },
    21: { score: 21, accuracy: 8, blasting: 11, awareness: 4, reaction: 18, armory: 8 },
    22: { score: 22, accuracy: 10, blasting: 13, awareness: 4, reaction: 20, armory: 10 },
    23: { score: 23, accuracy: 12, blasting: 16, awareness: 4, reaction: 22, armory: 12 },
    24: { score: 24, accuracy: 15, blasting: 20, awareness: 5, reaction: 25, armory: 15 },
    25: { score: 25, accuracy: 30, blasting: 40, awareness: 5, reaction: 40, armory: 30 }
  },
  Constitution: {
    1: { score: 1, hpAdj: -3, shock: '25%', resurr: '30%', poison: -15, woundRec: '1/month' },
    2: { score: 2, hpAdj: -2, shock: '30%', resurr: '35%', poison: -8, woundRec: '1/2 weeks' },
    3: { score: 3, hpAdj: -2, shock: '35%', resurr: '40%', poison: -6, woundRec: '1/week' },
    4: { score: 4, hpAdj: -1, shock: '40%', resurr: '45%', poison: -4, woundRec: '1/6 days' },
    5: { score: 5, hpAdj: -1, shock: '45%', resurr: '50%', poison: -2, woundRec: '1/5 days' },
    6: { score: 6, hpAdj: -1, shock: '50%', resurr: '55%', poison: -1, woundRec: '1/4 days' },
    7: { score: 7, hpAdj: 0, shock: '55%', resurr: '60%', poison: 0, woundRec: '1/3 days' },
    8: { score: 8, hpAdj: 0, shock: '60%', resurr: '65%', poison: 0, woundRec: '1/2 days' },
    9: { score: 9, hpAdj: 0, shock: '65%', resurr: '70%', poison: 0, woundRec: '1/day' },
    10: { score: 10, hpAdj: 0, shock: '70%', resurr: '75%', poison: 0, woundRec: '1/day' },
    11: { score: 11, hpAdj: 0, shock: '75%', resurr: '80%', poison: 0, woundRec: '1/day' },
    12: { score: 12, hpAdj: 0, shock: '80%', resurr: '85%', poison: 0, woundRec: '2/day' },
    13: { score: 13, hpAdj: 0, shock: '85%', resurr: '90%', poison: 0, woundRec: '3/day' },
    14: { score: 14, hpAdj: 0, shock: '90%', resurr: '95%', poison: 0, woundRec: '4/day' },
    15: { score: 15, hpAdj: 1, shock: '95%', resurr: '100%', poison: 1, woundRec: '5/day' },
    16: { score: 16, hpAdj: 2, shock: '100%', resurr: '105%', poison: 2, woundRec: '6/day' },
    17: { score: 17, hpAdj: 3, shock: '105%', resurr: '110%', poison: 3, woundRec: '7/day' },
    18: { score: 18, hpAdj: 4, shock: '110%', resurr: '115%', poison: 4, woundRec: '8/day' },
    19: { score: 19, hpAdj: 5, shock: '115%', resurr: '120%', poison: 5, woundRec: '1/hour' },
    20: { score: 20, hpAdj: 6, shock: '120%', resurr: '125%', poison: 6, woundRec: '3/hour' },
    21: { score: 21, hpAdj: 7, shock: '125%', resurr: '130%', poison: 8, woundRec: '1/turn' },
    22: { score: 22, hpAdj: 8, shock: '130%', resurr: '135%', poison: 10, woundRec: '3/turn' },
    23: { score: 23, hpAdj: 10, shock: '140%', resurr: '150%', poison: 12, woundRec: '6/turn' },
    24: { score: 24, hpAdj: 20, shock: '150%', resurr: '200%', poison: 15, woundRec: '1/round' },
    25: { score: 25, hpAdj: 30, shock: '200%', resurr: '300%', poison: 30, woundRec: '1/sequence' }
  },
  Intelligence: {
    1: { score: 1, profSlots: 0, maxSpell: null, learnSpells: '-15', illusionSaves: 'Animal' },
    2: { score: 2, profSlots: 0, maxSpell: null, learnSpells: '-8', illusionSaves: 'Semi-intelligent' },
    3: { score: 3, profSlots: 0, maxSpell: null, learnSpells: '-6', illusionSaves: 'Semi-intelligent' },
    4: { score: 4, profSlots: 0, maxSpell: null, learnSpells: '-4', illusionSaves: 'Semi-intelligent' },
    5: { score: 5, profSlots: 0, maxSpell: null, learnSpells: '-2', illusionSaves: 'Low' },
    6: { score: 6, profSlots: 0, maxSpell: null, learnSpells: '-1', illusionSaves: 'Low' },
    7: { score: 7, profSlots: 0, maxSpell: null, learnSpells: '–', illusionSaves: 'Low' },
    8: { score: 8, profSlots: 1, maxSpell: null, learnSpells: '–', illusionSaves: 'Average' },
    9: { score: 9, profSlots: 2, maxSpell: 4, learnSpells: '35%', illusionSaves: '–' },
    10: { score: 10, profSlots: 2, maxSpell: 5, learnSpells: '40%', illusionSaves: '–' },
    11: { score: 11, profSlots: 2, maxSpell: 6, learnSpells: '45%', illusionSaves: '–' },
    12: { score: 12, profSlots: 3, maxSpell: 7, learnSpells: '50%', illusionSaves: '–' },
    13: { score: 13, profSlots: 3, maxSpell: 8, learnSpells: '55%', illusionSaves: '–' },
    14: { score: 14, profSlots: 4, maxSpell: 8, learnSpells: '60%', illusionSaves: '–' },
    15: { score: 15, profSlots: 5, maxSpell: 9, learnSpells: '65%', illusionSaves: '+1' },
    16: { score: 16, profSlots: 6, maxSpell: 9, learnSpells: '70%', illusionSaves: '+2' },
    17: { score: 17, profSlots: 7, maxSpell: 9, learnSpells: '75%', illusionSaves: '+3' },
    18: { score: 18, profSlots: 8, maxSpell: 10, learnSpells: '85%', illusionSaves: '+4' },
    19: { score: 19, profSlots: 9, maxSpell: 15, learnSpells: '95%', illusionSaves: '+5' },
    20: { score: 20, profSlots: 10, maxSpell: 15, learnSpells: '100%', illusionSaves: '+6' },
    21: { score: 21, profSlots: 12, maxSpell: 15, learnSpells: '105%', illusionSaves: '+8' },
    22: { score: 22, profSlots: 15, maxSpell: 15, learnSpells: '110%', illusionSaves: '+10' },
    23: { score: 23, profSlots: 20, maxSpell: 15, learnSpells: '115%', illusionSaves: '+12' },
    24: { score: 24, profSlots: 25, maxSpell: 15, learnSpells: '120%', illusionSaves: '+15' },
    25: { score: 25, profSlots: 40, maxSpell: 15, learnSpells: '150%', illusionSaves: '+30' }
  },
  Wisdom: {
    1: { score: 1, saveBonus: -15, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    2: { score: 2, saveBonus: -8, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    3: { score: 3, saveBonus: -6, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    4: { score: 4, saveBonus: -4, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    5: { score: 5, saveBonus: -2, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    6: { score: 6, saveBonus: -1, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    7: { score: 7, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    8: { score: 8, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    9: { score: 9, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    10: { score: 10, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    11: { score: 11, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    12: { score: 12, saveBonus: 0, bonusSpells: [0, 0, 0, 0, 0, 0, 0, 0] },
    13: { score: 13, saveBonus: 0, bonusSpells: [1, 0, 0, 0, 0, 0, 0, 0] },
    14: { score: 14, saveBonus: 0, bonusSpells: [2, 0, 0, 0, 0, 0, 0, 0] },
    15: { score: 15, saveBonus: 1, bonusSpells: [2, 1, 0, 0, 0, 0, 0, 0] },
    16: { score: 16, saveBonus: 2, bonusSpells: [2, 2, 0, 0, 0, 0, 0, 0] },
    17: { score: 17, saveBonus: 3, bonusSpells: [2, 2, 1, 0, 0, 0, 0, 0] },
    18: { score: 18, saveBonus: 4, bonusSpells: [2, 2, 1, 1, 0, 0, 0, 0] },
    19: { score: 19, saveBonus: 5, bonusSpells: [3, 2, 2, 1, 0, 0, 0, 0] },
    20: { score: 20, saveBonus: 6, bonusSpells: [3, 3, 2, 2, 0, 0, 0, 0] },
    21: { score: 21, saveBonus: 8, bonusSpells: [3, 3, 3, 2, 1, 0, 0, 0] },
    22: { score: 22, saveBonus: 10, bonusSpells: [3, 3, 3, 3, 2, 0, 0, 0] },
    23: { score: 23, saveBonus: 12, bonusSpells: [3, 3, 3, 3, 3, 1, 0, 0] },
    24: { score: 24, saveBonus: 15, bonusSpells: [3, 3, 3, 3, 3, 3, 0, 0] },
    25: { score: 25, saveBonus: 30, bonusSpells: [10, 10, 10, 10, 10, 10, 10, 10] }
  },
  Charisma: {
    1: { score: 1, maxHenchmen: 0, loyalty: -8, reaction: -7 },
    2: { score: 2, maxHenchmen: 1, loyalty: -7, reaction: -6 },
    3: { score: 3, maxHenchmen: 1, loyalty: -6, reaction: -5 },
    4: { score: 4, maxHenchmen: 1, loyalty: -5, reaction: -4 },
    5: { score: 5, maxHenchmen: 2, loyalty: -4, reaction: -3 },
    6: { score: 6, maxHenchmen: 2, loyalty: -3, reaction: -2 },
    7: { score: 7, maxHenchmen: 3, loyalty: -2, reaction: -1 },
    8: { score: 8, maxHenchmen: 3, loyalty: -1, reaction: 0 },
    9: { score: 9, maxHenchmen: 4, loyalty: 0, reaction: 0 },
    10: { score: 10, maxHenchmen: 4, loyalty: 0, reaction: 0 },
    11: { score: 11, maxHenchmen: 4, loyalty: 0, reaction: 0 },
    12: { score: 12, maxHenchmen: 5, loyalty: 0, reaction: 0 },
    13: { score: 13, maxHenchmen: 5, loyalty: 0, reaction: 1 },
    14: { score: 14, maxHenchmen: 6, loyalty: 1, reaction: 2 },
    15: { score: 15, maxHenchmen: 7, loyalty: 3, reaction: 3 },
    16: { score: 16, maxHenchmen: 8, loyalty: 4, reaction: 5 },
    17: { score: 17, maxHenchmen: 10, loyalty: 6, reaction: 6 },
    18: { score: 18, maxHenchmen: 15, loyalty: 8, reaction: 7 },
    19: { score: 19, maxHenchmen: 20, loyalty: 10, reaction: 8 },
    20: { score: 20, maxHenchmen: 30, loyalty: 12, reaction: 9 },
    21: { score: 21, maxHenchmen: 40, loyalty: 14, reaction: 10 },
    22: { score: 22, maxHenchmen: 50, loyalty: 16, reaction: 11 },
    23: { score: 23, maxHenchmen: 60, loyalty: 18, reaction: 12 },
    24: { score: 24, maxHenchmen: 100, loyalty: 20, reaction: 13 },
    25: { score: 25, maxHenchmen: 200, loyalty: 20, reaction: 14 }
  },
};

// Max/min clamp per rules
export function clampScore(score: number): number {
  return Math.max(1, Math.min(score, 25));
}