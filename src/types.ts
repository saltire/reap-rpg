export type Realm = {
  points: Point[],
};

export type Point = {
  id: number,
  name: string,
  description: string,
  exits: number[],
  actions?: Action[],
};

export type Action = {
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
