import { Character } from '../types/character';

export const initialCharacter: Character = {
  name: 'New Character',
  classes: [
    { name: 'Rogues', level: 121, mav: 41, focus: 'Treasurehunter' },
    { name: 'Fighter', level: 90, mav: 10, focus: 'Myrmidon' }
  ],
  totalLevel: 131,
  totalMAV: 51,
  health: 28601,
  vigor: 1535,
  currentHealth: 30136,
  actionRoutine: '1 Class Main Action + 1 Universal Action',
  powers: [],
  thievingSkills: [],
  abilityScores: {
    Strength: { base: 24, enhancement: 0, check: 0, defCheck: 0 },
    Dexterity: { base: 25, enhancement: 0, check: 0, defCheck: 0 },
    Constitution: { base: 22, enhancement: 0, check: 0, defCheck: 0 },
    Intelligence: { base: 21, enhancement: 0, check: 0, defCheck: 0 },
    Wisdom: { base: 20, enhancement: 0, check: 0, defCheck: 0 },
    Charisma: { base: 20, enhancement: 0, check: 0, defCheck: 0 },
  }
};