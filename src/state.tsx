import { createContext } from 'react';


export type State = {
  pointId: number,
  points: Record<number, ({
    visited?: true,
  } | undefined)>,
};

export const initialState: State = {
  pointId: 1,
  points: {
    1: {
      visited: true,
    },
  },
};

export const StateContext = createContext<State>(initialState);
