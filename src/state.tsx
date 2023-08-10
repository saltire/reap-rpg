import { createContext, Dispatch, Reducer, useContext } from 'react';


export type GameState = {
  pointId: number,
  points: Record<number, ({
    visited?: true,
  } | undefined)>,
};

export const initialState: GameState = {
  pointId: 1,
  points: {
    1: {
      visited: true,
    },
  },
};

export type Action = {
  type: 'go_to_point',
  pointId: number,
} | {
  type: 'other',
};

export const reducer: Reducer<GameState, Action> = (game: GameState, action: Action) => {
  if (action.type === 'go_to_point') {
    return {
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
  }
  return game;
};

export const GameStateContext = createContext<GameState>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const useGameState = () => useContext(GameStateContext);
export const useDispatch = () => useContext(DispatchContext);
