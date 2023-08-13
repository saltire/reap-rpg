import { createContext, Dispatch, Reducer, useContext } from 'react';

import points, { Character } from './points';


export type GameState = {
  pointNum: number,
  points: Record<number, ({
    visited?: true,
    actions?: symbol[],
  } | undefined)>,
  character: Character,
  flags: Record<string, boolean>,
};

export const initialState: GameState = {
  pointNum: points[0].number,
  points: {
    [points[0].number]: {
      visited: true,
    },
  },
  character: {},
  flags: {},
};

export type Action = {
  type: 'go_to_point',
  pointNum: number,
} | {
  type: 'use_action',
  pointNum: number,
  actionId: symbol,
};

export const reducer: Reducer<GameState, Action> = (game: GameState, action: Action) => {
  switch (action.type) {
    case 'go_to_point':
      return {
        ...game,
        pointNum: action.pointNum,
        points: {
          ...game.points,
          [action.pointNum]: {
            ...game.points[action.pointNum],
            visited: true,
          },
        },
      };

    case 'use_action':
      return {
        ...game,
        points: {
          ...game.points,
          [action.pointNum]: {
            ...game.points[action.pointNum],
            actions: Array.from(new Set([
              ...game.points[action.pointNum]?.actions ?? [], action.actionId])),
          },
        },
      };

    default:
      return game;
  }
};

export const GameStateContext = createContext<GameState>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const useGameState = () => useContext(GameStateContext);
export const useDispatch = () => useContext(DispatchContext);
