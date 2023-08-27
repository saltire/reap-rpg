import { createContext, Dispatch, Reducer, useContext } from 'react';

import realm from './realm';
import { ReaperStats, Equipment, Requirement, Result } from './types';


export type CharacterState = {
  name: string,
  index?: number,
  health: number,
  cell: string,
};

export type FightState = {
  reaper: string,
  enemies: CharacterState[],
};

export type GameState = {
  reaper: ReaperStats,
  equipment?: Equipment,
  editEquipment?: boolean,
  vessel: number,
  pointId: number,
  points: Record<number, ({
    visited?: true,
    actions?: number[],
  } | undefined)>,
  actionId?: number,
  fight?: FightState,
  clockSegments: number,
  clockEffects?: number[],
  clockEffectId?: number,
  counters: Record<string, number>,
  flags: Record<string, boolean>,
};

export const initialState: GameState = {
  reaper: {
    health: 10,
    stamina: 2,
    lore: 0,
    body: 1,
    bone: 1,
    blood: 1,
  },
  vessel: 0,
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

const compMax: Record<string, number | undefined> = {
  body: 3,
  bone: 3,
  blood: 3,
};

export const requirementMet = (req: Requirement, state: GameState) => !!(
  (Object.entries(req.reaper ?? {})
    .every(([key, value]) => (state.reaper[key as keyof ReaperStats] || 0) >= value))
  && (Object.entries(req.counters ?? {})
    .every(([key, value]) => state.counters[key] >= value))
  && (Object.entries(req.flags ?? {})
    .every(([key, value]) => state.flags[key] === value))
  && (req.componentTotal === undefined
    || state.reaper.body + state.reaper.bone + state.reaper.blood >= req.componentTotal)
);

export type StateAction = {
  type: 'load_saved_game',
} | {
  type: 'reset_game',
} | {
  type: 'edit_equipment',
} | {
  type: 'save_equipment',
  equipment: Equipment,
} | {
  type: 'go_to_point',
  pointId: number,
  useVeil?: boolean,
} | {
  type: 'use_action',
  pointId: number,
  actionId: number,
} | {
  type: 'start_fight',
  state: FightState,
} | {
  type: 'end_fight',
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

    case 'edit_equipment': {
      newState = { ...newState, editEquipment: true };
      break;
    }

    case 'save_equipment': {
      newState = { ...newState, equipment: action.equipment, editEquipment: false };
      break;
    }

    case 'go_to_point': {
      newState.pointId = action.pointId;
      newState.points = {
        ...newState.points,
        [action.pointId]: {
          ...newState.points[action.pointId],
          visited: true,
        },
      };
      if (action.useVeil && newState.counters.veilWalk) {
        newState.counters = {
          ...newState.counters,
          veilWalk: Math.max(0, newState.counters.veilWalk - 1),
        };
      }
      else {
        newState.clockSegments += 1;
      }
      break;
    }

    case 'use_action': {
      newState.points = {
        ...newState.points,
        [action.pointId]: {
          ...newState.points[action.pointId],
          actions: Array.from(new Set([
            ...newState.points[action.pointId]?.actions ?? [], action.actionId])),
        },
      };
      newState.actionId = action.actionId;
      break;
    }

    case 'start_fight': {
      newState.fight = action.state;
      break;
    }

    case 'end_fight': {
      newState.fight = undefined;
      newState.vessel += 1;
      break;
    }

    case 'clear_action': {
      newState.actionId = undefined;
      newState.clockSegments += 1;
      break;
    }

    case 'apply_result': {
      console.log(action.result);
      Object.entries(action.result.reaper ?? {}).forEach(([key, value]) => {
        newState.reaper = {
          ...newState.reaper,
          [key]: Math.max(0, Math.min(compMax[key] ?? Infinity,
            (newState.reaper[key as keyof ReaperStats] || 0) + value)),
        };
      });
      Object.entries(action.result.counters ?? {}).forEach(([key, value]) => {
        newState.counters = {
          ...newState.counters,
          [key]: Math.max(0, (newState.counters[key] || 0) + value),
        };
      });
      newState.flags = { ...newState.flags, ...action.result.flags };

      realm.vessel.triggers.forEach(req => {
        if (requirementMet(req, newState) && !requirementMet(req, state)) {
          newState.vessel += 1;
        }
      });

      break;
    }

    case 'apply_clock_effect': {
      newState.clockEffectId = action.clockId;
      newState.clockEffects = Array.from(new Set([...newState.clockEffects ?? [], action.clockId]));
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
