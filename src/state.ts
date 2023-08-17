import { createContext, Dispatch, Reducer, useContext } from 'react';

import realm from './realm';
import { Character, Result } from './types';


export type GameState = {
  character: Character,
  pointId: number,
  points: Record<number, ({
    visited?: true,
    actions?: number[],
  } | undefined)>,
  actionId?: number,
  clockSegments: number,
  clockEffects?: number[],
  clockEffectId?: number,
  counters: Record<string, number>,
  flags: Record<string, boolean>,
};

export const initialState: GameState = {
  character: {
    body: 0,
    bone: 0,
    blood: 0,
    lore: 0,
  },
  pointId: realm.points[0].id,
  points: {
    [realm.points[0].id]: {
      visited: true,
    },
  },
  clockSegments: 0,
  counters: {},
  flags: {},
};

const charMax: Record<string, number | undefined> = {
  body: 3,
  bone: 3,
  blood: 3,
};

export type StateAction = {
  type: 'load_saved_game',
} | {
  type: 'reset_game',
} | {
  type: 'go_to_point',
  pointId: number,
  useVeil?: boolean,
} | {
  type: 'use_action',
  pointId: number,
  actionId: number,
} | {
  type: 'clear_action',
} | {
  type: 'apply_result',
  result: Result,
} | {
  type: 'apply_clock_effect',
  clockId: number,
} | {
  type: 'clear_clock_effect',
};

export const reducer: Reducer<GameState, StateAction> = (state: GameState, action: StateAction) => {
  let newState = { ...state };

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
      newState.pointId = action.pointId;
      newState.points = {
        ...state.points,
        [action.pointId]: {
          ...state.points[action.pointId],
          visited: true,
        },
      };
      if (action.useVeil && state.counters.veilWalk) {
        newState.counters = {
          ...state.counters,
          veilWalk: Math.max(0, state.counters.veilWalk - 1),
        };
      }
      else {
        newState.clockSegments += 1;
      }
      break;
    }

    case 'use_action': {
      newState.points = {
        ...state.points,
        [action.pointId]: {
          ...state.points[action.pointId],
          actions: Array.from(new Set([
            ...state.points[action.pointId]?.actions ?? [], action.actionId])),
        },
      };
      newState.actionId = action.actionId;
      break;
    }

    case 'clear_action': {
      newState.actionId = undefined;
      newState.clockSegments += 1;
      break;
    }

    case 'apply_result': {
      Object.entries(action.result.character ?? {}).forEach(([key, value]) => {
        newState.character = {
          ...state.character,
          [key]: Math.max(0, Math.min(charMax[key] ?? Infinity,
            (state.character[key as keyof Character] || 0) + value)),
        };
      });
      Object.entries(action.result.counters ?? {}).forEach(([key, value]) => {
        newState.counters = {
          ...state.counters,
          [key]: Math.max(0, (state.counters[key] || 0) + value),
        };
      });
      newState.flags = { ...state.flags, ...action.result.flags };
      break;
    }

    case 'apply_clock_effect': {
      newState.clockEffectId = action.clockId;
      newState.clockEffects = Array.from(new Set([...state.clockEffects ?? [], action.clockId]));
      break;
    }

    case 'clear_clock_effect': {
      newState.clockEffectId = undefined;
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
