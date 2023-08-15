import { createContext, Dispatch, Reducer, useContext } from 'react';

import points, { Character, Result } from './points';


export type GameState = {
  character: Character,
  pointId: number,
  points: Record<number, ({
    visited?: true,
    actions?: number[],
  } | undefined)>,
  clock: number,
  flags: Record<string, boolean>,
  actionId?: number,
};

export const initialState: GameState = {
  character: {
    body: 0,
    bone: 0,
    blood: 0,
    lore: 0,
  },
  pointId: points[0].id,
  points: {
    [points[0].id]: {
      visited: true,
    },
  },
  clock: 0,
  flags: {},
};

export type StateAction = {
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
} | {
  type: 'clear_action',
} | {
  type: 'apply_result',
  result: Result,
};

export const reducer: Reducer<GameState, StateAction> = (game: GameState, action: StateAction) => {
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
        clock: game.clock + 1,
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
        actionId: action.actionId,
      };
      break;
    }

    case 'clear_action': {
      newState = {
        ...game,
        actionId: undefined,
        clock: game.clock + 1,
      };
      break;
    }

    case 'apply_result': {
      Object.entries(action.result.character ?? {}).forEach(([key, value]) => {
        newState.character = {
          ...newState.character,
          [key]: (newState.character[key as keyof Character] || 0) + value,
        };
      });
      newState.flags = { ...newState.flags, ...action.result.flags };
      break;
    }

    default:
      break;
  }

  localStorage.setItem('game', JSON.stringify(newState));

  return newState;
};

export const GameStateContext = createContext<GameState>(initialState);
export const DispatchContext = createContext<Dispatch<StateAction>>(() => {});

export const useGameState = () => useContext(GameStateContext);
export const useDispatch = () => useContext(DispatchContext);
