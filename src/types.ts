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
  resultText?: string,
  result?: Result,
  choices?: Result[],
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
