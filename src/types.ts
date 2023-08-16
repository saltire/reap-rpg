export type Realm = {
  clocks: RealmClock[],
  points: RealmPoint[],
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
  name: string,
  requires?: {
    character?: Partial<Character>,
    flags?: Record<string, boolean>,
  },
  description: string,
  fightText?: string,
  fight?: Fight,
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
  // description?: string,
  character?: Partial<Character>,
  flags?: Record<string, boolean>,
  moveTo?: number,
};

export type Character = {
  body: number,
  bone: number,
  blood: number,
  lore: number,
  veilWalk: number,
};
