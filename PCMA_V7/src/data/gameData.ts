export const AVAILABLE_CLASSES = [
  'Warrior',
  'Fighter', 
  'Paladin',
  'Avenger',
  'Ranger',
  'Dragonslayer',
  'Berserk',
  'Wizard',
  'Magician',
  'Dracomancer',
  'Militant Wizard',
  'Clerics',
  'Priest',
  'Specialty Priest',
  'Templar',
  'Rogues',
  'Thief',
  'Bard',
  'Helderan Slinger',
  'Psionicist'
];

export type ActionGroup =
  | 'PHYS'
  | 'SPLPR'
  | 'SPLWIZ'
  | 'SKILL'
  | 'TSKILL'
  | 'PSI'
  | 'INN'
  | 'ITM'
  | 'MV';

export type ClassActionRoutine = {
  class: string;
  allowedActions: ActionGroup[];
  defaultAction: ActionGroup;
};

export const classActionRoutines: Record<string, ClassActionRoutine> = {
  Fighter: {
    class: 'Fighter',
    allowedActions: ['PHYS', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Ranger: {
    class: 'Ranger',
    allowedActions: ['PHYS', 'SPLPR', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Dragonslayer: {
    class: 'Dragonslayer',
    allowedActions: ['PHYS', 'SPLPR', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Paladin: {
    class: 'Paladin',
    allowedActions: ['PHYS', 'SPLPR', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Magician: {
    class: 'Magician',
    allowedActions: ['SPLWIZ', 'ITM', 'MV'],
    defaultAction: 'SPLWIZ',
  },
  Dracomancer: {
    class: 'Dracomancer',
    allowedActions: ['SPLWIZ', 'ITM', 'MV'],
    defaultAction: 'SPLWIZ',
  },
  'Militant Wizard': {
    class: 'Militant Wizard',
    allowedActions: ['SPLWIZ', 'PHYS', 'ITM', 'MV'],
    defaultAction: 'SPLWIZ',
  },
  Priest: {
    class: 'Priest',
    allowedActions: ['SPLPR', 'PHYS', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  Lathander: {
    class: 'Lathander',
    allowedActions: ['SPLPR', 'PHYS', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  Xeena: {
    class: 'Xeena',
    allowedActions: ['SPLPR', 'INN', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  Resistance: {
    class: 'Resistance',
    allowedActions: ['SPLPR', 'PHYS', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  Templar: {
    class: 'Templar',
    allowedActions: ['PHYS', 'SPLPR', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  'Helderan Slinger': {
    class: 'Helderan Slinger',
    allowedActions: ['PHYS', 'PSI', 'TSKILL', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Bard: {
    class: 'Bard',
    allowedActions: ['PHYS', 'SPLWIZ', 'TSKILL', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'TSKILL',
  },
  Thief: {
    class: 'Thief',
    allowedActions: ['PHYS', 'TSKILL', 'ITM', 'MV'],
    defaultAction: 'TSKILL',
  },
  Psionicist: {
    class: 'Psionicist',
    allowedActions: ['PSI', 'ITM', 'MV'],
    defaultAction: 'PSI',
  },
  'Cerebral Knight': {
    class: 'Cerebral Knight',
    allowedActions: ['PHYS', 'PSI', 'ITM', 'MV'],
    defaultAction: 'PSI',
  },
  Warrior: {
    class: 'Warrior',
    allowedActions: ['PHYS', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Wizard: {
    class: 'Wizard',
    allowedActions: ['SPLWIZ', 'ITM', 'MV'],
    defaultAction: 'SPLWIZ',
  },
  Avenger: {
    class: 'Avenger',
    allowedActions: ['PHYS', 'SPLPR', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Berserk: {
    class: 'Berserk',
    allowedActions: ['PHYS', 'ITM', 'MV'],
    defaultAction: 'PHYS',
  },
  Clerics: {
    class: 'Clerics',
    allowedActions: ['SPLPR', 'PHYS', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  'Specialty Priest': {
    class: 'Specialty Priest',
    allowedActions: ['SPLPR', 'PHYS', 'SKILL', 'ITM', 'MV'],
    defaultAction: 'SPLPR',
  },
  Rogues: {
    class: 'Rogues',
    allowedActions: ['PHYS', 'TSKILL', 'ITM', 'MV'],
    defaultAction: 'TSKILL',
  },
};

export const ACTION_GROUP_LABELS: Record<ActionGroup, string> = {
  PHYS: 'Physical Combat',
  SPLPR: 'Priest Spells',
  SPLWIZ: 'Wizard Spells',
  SKILL: 'General Skills',
  TSKILL: 'Thief Skills',
  PSI: 'Psionics',
  INN: 'Innate Abilities',
  ITM: 'Item Use',
  MV: 'Movement',
};

export const AVAILABLE_FOCI = [
  'Artisan',
  'Artist',
  'Beastlord',
  'Druid',
  'Brute',
  'Berserk',
  'Healer',
  'Warden',
  'Leader',
  'Lord',
  'Myrmidon',
  'Necromancer',
  'Sage',
  'Treasurehunter'
];