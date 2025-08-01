// Imports die rules, falls getrennt gespeichert
import { abilityScoreTable, clampScore, AbilityName, AbilityData } from './abilityRules';

export type AbilityKey = AbilityName;

/**
 * Gibt alle Werte (z. B. accuracy, hpAdj, saves etc.) für eine Ability zurück
 * @param ability Der zu betrachtende Score (z. B. "Strength")
 * @param baseScore Basiswert (1–25)
 * @param enhancement Bonus (z. B. durch Magie, Items etc.)
 */
export function getAbilityData(
  ability: AbilityKey,
  baseScore: number,
  enhancement: number = 0
): AbilityData | null {
  const totalScore = clampScore(baseScore + enhancement);
  const table = abilityScoreTable[ability];
  const entry = table[totalScore];
  return entry ?? null;
}

/**
 * Berechnet den Perception Score basierend auf Intelligenz und Weisheit (höherer Wert zählt)
 */
export function getPerceptionScore(
  intBase: number,
  intEnh: number,
  wisBase: number,
  wisEnh: number
): number {
  const intTotal = clampScore(intBase + intEnh);
  const wisTotal = clampScore(wisBase + wisEnh);
  return Math.max(intTotal, wisTotal);
}