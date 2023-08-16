import { Enemy } from './types';


export const acolyte: Enemy = {
  name: 'Acolyte',
  unique: true,
  health: 9,
  actions: [
    {
      roll: [1, 2],
      move: 1,
      harm: 1,
      range: [0, 1],
    },
    {
      roll: [3, 4],
      move: 1,
      harm: 2,
      range: [2, 3, 4],
    },
    {
      roll: [5, 6],
      move: 2,
      harm: 2,
      range: [0, 1],
    },
  ],
  choices: [
    { character: { body: 1 } },
    { character: { bone: 1 } },
    { character: { blood: 1 } },
  ],
};

export const ashborn: Enemy = {
  name: 'Ashborn',
  type: 'Monster',
  health: 4,
  range: [0, 1],
  actions: [
    {
      roll: [1, 2],
      move: 1,
      harm: 1,
    },
    {
      roll: [3, 5],
      move: 2,
      harm: 1,
    },
    {
      roll: [6],
      move: 1,
      harm: 3,
    },
  ],
  result: { character: { body: 1 } },
};

export const cultist: Enemy = {
  name: 'Cultist',
  type: 'Human',
  health: 3,
  range: [0, 1],
  actions: [
    {
      roll: [1, 2, 3],
      move: 1,
      harm: 1,
    },
    {
      roll: [4, 5],
      move: 1,
      harm: 2,
    },
    {
      roll: [6],
      move: 2,
      harm: 2,
    },
  ],
  choices: [
    { character: { body: 1 } },
    { character: { bone: 1 } },
    { character: { blood: 1 } },
  ],
};

export const gaunt: Enemy = {
  name: 'Gaunt',
  type: 'Undead',
  health: 3,
  range: [1],
  actions: [
    {
      roll: [1, 2, 3],
      move: 1,
      harm: 2,
    },
    {
      roll: [4, 5, 6],
      move: 2,
      harm: 4,
    },
  ],
  result: { character: { body: 1, bone: 1 } },
};

export const grin: Enemy = {
  name: 'Grin',
  type: 'Demon',
  health: 5,
  range: [2, 3],
  actions: [
    {
      roll: [1, 2, 3, 4, 5, 6],
      move: 1,
      harm: 1,
    },
  ],
  choices: [
    { character: { body: 1 } },
    { character: { bone: 1 } },
    { character: { blood: 1 } },
  ],
};
