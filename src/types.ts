export type Realm = {
  weapons: Weapon[],
  relics: Relic[],
  spells: Spell[],
  vessel: {
    triggers: Requirement[],
  },
  clocks: RealmClock[],
  points: RealmPoint[],
  counterLabels?: Record<string, string>,
  flagLabels?: Record<string, string>,
};

export type RealmClock = {
  id: number,
  name: string,
  fillDescription: string,
  fillText: string,
  result?: Result,
};

export type RealmPoint = {
  id: number,
  name: string,
  description: string,
  exits: number[],
  actions?: PointAction[],
};

export type PointAction = {
  id: number,
  name: 'DELVE' | 'FIGHT' | 'LEARN' | 'SEARCH',
  requires?: Requirement[],
  description: string,
  fightText?: string,
  fight?: Fight,
  preventMove?: true,
  resultText?: string,
  result?: Result,
  choices?: Result[],
};

export type Fight = {
  start: string,
  terrain: string[],
  enemies: EnemyInstance[],
};

export type Enemy = {
  name: string,
  type?: string,
  unique?: true,
  health: number,
  range?: number[],
  actions: FightAction[],
  result?: Result,
  choices?: Result[],
};

export type EnemyInstance = Enemy & {
  start: string[],
};

export type FightAction = {
  roll: number[],
  move: number,
  harm: number,
  range?: number[],
};

export type Result = {
  character?: Partial<Character>,
  counters?: Record<string, number>,
  flags?: Record<string, boolean>,
  moveTo?: number,
};

export type Requirement = {
  character?: Partial<Character>,
  counters?: Record<string, number>,
  flags?: Record<string, boolean>,
  componentTotal?: number,
};

export type Character = {
  health: number,
  stamina: number,
  lore: number,
  body: number,
  bone: number,
  blood: number,
};

export type Equipment = {
  weapon: Weapon,
  relic: Relic,
  spells: Spell[],
};

export type ComponentCost = Partial<Pick<Character, 'body' | 'bone' | 'blood'>>;

export type Weapon = {
  name: string,
  type: string,
  range?: number[],
  actions: FightAction[],
  abilities?: {
    name: string,
    description: string,
  }[],
};

export type Relic = {
  name: string,
  effects: {
    cost: ComponentCost,
    benefit: {
      block?: number,
      harm?: number,
      heal?: number,
      move?: number,
    },
  }[],
};

export type Spell = {
  name: string,
  range?: number[],
  actions: {
    cost?: ComponentCost,
    roll: number[],
    description: string,
    // TODO: effect
  }[],
  abilities?: {
    name: string,
    description: string,
    // TODO: effect
  }[],
  effects?: {
    cost: ComponentCost,
    description: string,
    // TODO: effect
  }[],
};
