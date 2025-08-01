export interface AbilityScoreDetail {
  base: number;
  enhancement: number;
  check: number;
  defCheck: number;
}

export interface ActionSlot {
  type: 'class' | 'universal' | 'enhanced';
  action: string; // ActionGroup or custom text
  label?: string; // For enhanced actions like "EnhActRoutine #1"
}

export interface ActionRoutine {
  slots: ActionSlot[];
}

export interface Power {
  id: string;
  name: string;
  category: 'offensiv' | 'defensiv' | 'miscellaneous' | 'doomwarding' | 'class';
  karmaFocus?: string; // e.g., 'Treasurehunter', 'Myrmidon'
  acquisitionLevel?: number;
  description?: string;
  empowerment?: number;
  
  // New frequency system
  frequency?: 'per sequence' | 'per round' | 'per turn' | 'per hour' | 'per day' | 'per week' | 'per month';
  maxUses?: number;
  
  // Formula-based calculations
  calculatedFields?: { [key: string]: string }; // formulas for dynamic values
  activeCalculatedFields?: string[]; // which fields are currently active
  
  currentUses: {
    sequence: number;
    round: number;
    turn: number;
    hour: number;
    day: number;
    week: number;
    month: number;
  };
  progression?: {
    baseLevel: number;
    nextLevel: number;
    effect: string;
  };
  hasInitiativePhase?: boolean;
  maxCount?: number; // For satellites/iouns
  currentCount?: number;
  duration?: string;
}

export interface CharacterClass {
  name: string;
  level: number;
  mav: number;
  focus?: string;
}

export interface Character {
  name: string;
  classes: CharacterClass[];
  totalLevel: number;
  totalMAV: number;
  health: number;
  vigor: number;
  currentHealth: number;
  actionRoutine: string;
  powers: Power[];
  thievingSkills: string[];
  abilityScores: {
    Strength: AbilityScoreDetail;
    Dexterity: AbilityScoreDetail;
    Constitution: AbilityScoreDetail;
    Intelligence: AbilityScoreDetail;
    Wisdom: AbilityScoreDetail;
    Charisma: AbilityScoreDetail;
  };
}