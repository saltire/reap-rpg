export type Realm = {
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
  actions: EnemyAction[],
  result?: Result,
  choices?: Result[],
};

export type EnemyInstance = Enemy & {
  start: string[],
};

export type EnemyAction = {
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
  body: number,
  bone: number,
  blood: number,
  lore: number,
};
