import { createContext, Dispatch, Reducer, useContext } from 'react';

import points, { Character } from './points';


export type GameState = {
  pointId: number,
  points: Record<number, ({
    visited?: true,
    actions?: number[],
  } | undefined)>,
  character: Character,
  flags: Record<string, boolean>,
};

export const initialState: GameState = {
  pointId: points[0].id,
  points: {
    [points[0].id]: {
      visited: true,
    },
  },
  character: {},
  flags: {},
};

export type Action = {
  type: 'load_saved_game',
} | {
  type: 'reset_game',
} | {
  type: 'go_to_point',
  pointId: number,
} | {
  type: 'use_action',
  pointId: number,
  actionId: number,
};

export const reducer: Reducer<GameState, Action> = (game: GameState, action: Action) => {
  let newState = game;

  switch (action.type) {
    case 'load_saved_game': {
      const savedStateStr = localStorage.getItem('game');
      newState = savedStateStr ? JSON.parse(savedStateStr) as GameState : initialState;
      break;
    }
    case 'reset_game': {
      newState = initialState;
      break;
    }
    case 'go_to_point': {
      newState = {
        ...game,
        pointId: action.pointId,
        points: {
          ...game.points,
          [action.pointId]: {
            ...game.points[action.pointId],
            visited: true,
          },
        },
      };
      break;
    }
    case 'use_action': {
      newState = {
        ...game,
        points: {
          ...game.points,
          [action.pointId]: {
            ...game.points[action.pointId],
            actions: Array.from(new Set([
              ...game.points[action.pointId]?.actions ?? [], action.actionId])),
          },
        },
      };
      break;
    }
    default:
      break;
  }

  localStorage.setItem('game', JSON.stringify(newState));

  return newState;
};

export const GameStateContext = createContext<GameState>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const useGameState = () => useContext(GameStateContext);
export const useDispatch = () => useContext(DispatchContext);
