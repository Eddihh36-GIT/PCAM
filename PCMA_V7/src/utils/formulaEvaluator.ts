import { Parser } from 'expr-eval';

// Available formula fields that can be enabled/disabled
export const FORMULA_FIELDS = [
  { 
    key: 'uses', 
    label: 'Uses', 
    defaultFormulas: {
      'Treasurehunter': '(Level + Empowerment - 81) / 3 + 1',
      'Myrmidon': '1 + (Level + Empowerment - 85) / 5',
      'General': '(Level + Empowerment - 80) / 5 + 1'
    }
  },
  { 
    key: 'area', 
    label: 'Area (squares)', 
    defaultFormulas: {
      'Treasurehunter': '(Level + Empowerment - 79) * 2',
      'Myrmidon': 'Level + Empowerment + 10',
      'General': 'Level + Empowerment'
    }
  },
  { 
    key: 'slots', 
    label: 'Slots', 
    defaultFormulas: {
      'Treasurehunter': '1 + (Level + Empowerment - 85) / 5',
      'Myrmidon': '1 + (Level + Empowerment - 90) / 10',
      'General': '1 + (Level + Empowerment - 80) / 10'
    }
  },
  { 
    key: 'dmg', 
    label: 'Damage', 
    defaultFormulas: {
      'Treasurehunter': '(Level + Empowerment) + (Level + Empowerment) / 20',
      'Myrmidon': '(Level + Empowerment) + (Level + Empowerment) / 10',
      'General': '(Level + Empowerment) + (Level + Empowerment) / 15'
    }
  },
  { 
    key: 'range', 
    label: 'Range', 
    defaultFormulas: {
      'Treasurehunter': '(Level + Empowerment) * 2',
      'Myrmidon': 'Level + Empowerment + 20',
      'General': 'Level + Empowerment'
    }
  },
  { 
    key: 'duration', 
    label: 'Duration (rounds)', 
    defaultFormulas: {
      'Treasurehunter': '(Level + Empowerment) / 10 + 1',
      'Myrmidon': '(Level + Empowerment) / 15 + 1',
      'General': '(Level + Empowerment) / 20 + 1'
    }
  }
];

// Safe math evaluation function using expr-eval
export function evaluateFormula(formula: string, variables: { [key: string]: number }): number {
  try {
    const parser = new Parser();
    const expr = parser.parse(formula);
    const result = expr.evaluate(variables);
    return typeof result === 'number' ? Math.max(0, Math.floor(result)) : 0;
  } catch (error) {
    console.warn('Formula evaluation error:', error, 'Formula:', formula);
    return 0;
  }
}

// Get variables for formula evaluation from character
export function getFormulaVariables(character: any, power?: any): { [key: string]: number } {
  const rogueClass = character.classes.find((cls: any) => cls.name === 'Rogues' || cls.name === 'Rogue');
  const fighterClass = character.classes.find((cls: any) => cls.name === 'Fighter');
  
  const baseVariables = {
    GesamtLevel: character.totalLevel,
    RogueLevel: rogueClass?.level || 0,
    FighterLevel: fighterClass?.level || 0,
    GesamtMAV: character.totalMAV,
    RogueMAV: rogueClass?.mav || 0,
    FighterMAV: fighterClass?.mav || 0,
  };

  // Determine the Level variable based on power type
  let levelValue = character.totalLevel; // Default to GesamtLevel
  
  if (power?.karmaFocus) {
    // Find the class that has this focus
    const classWithFocus = character.classes.find((cls: any) => cls.focus === power.karmaFocus);
    if (classWithFocus) {
      levelValue = classWithFocus.level;
    }
  }

  // Integrate empowerment into the Level value
  const empowerment = power?.empowerment || 0;
  levelValue += empowerment;

  return {
    ...baseVariables,
    Level: levelValue
  };
}