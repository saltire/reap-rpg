import { useCallback, useMemo, useState } from 'react';

import points from './points';
import SplitLines from './components/SplitLines';
import { State, StateContext, initialState } from './state';
import { exists } from './utils';


export default function App() {
  const [state, setState] = useState<State>(initialState);

  const goToPoint = useCallback((pointId: number) => setState(prev => ({
    ...prev,
    pointId,
    points: {
      ...prev.points,
      [pointId]: {
        ...prev.points[pointId],
        visited: true,
      },
    },
  })), []);

  const point = points.find(p => p.id === state.pointId);
  const exits = useMemo(
    () => (point?.exits ?? []).map(pid => points.find(p => p.id === pid)).filter(exists)
      .map(exit => ({ ...exit, visited: state.points[exit.id]?.visited })),
    [point, state.points]);

  if (!point) {
    return null;
  }

  return (
    <StateContext.Provider value={state}>
      <div className='App'>
        <header className='mb-8 py-2 bg-black text-white text-center'>
          <h1 className='font-header text-5xl'>REAP: Kyrie Realm</h1>
        </header>
        <main className='max-w-screen-sm mx-auto text-center'>
          <h2 className='flex items-center justify-center my-8 font-bold'>
            <span className='w-6 h-6 leading-6 mr-2 bg-black text-white text-xl rounded-full'>
              {point.id}
            </span>
            <span className='text-3xl'>{point.name}</span>
          </h2>
          <div className='text-xl text-left'>
            <SplitLines text={point.description} />
          </div>
          <p className='w-max mx-auto my-8'>
            {exits.map(exit => (
              <button
                key={exit.id}
                type='button'
                className='flex items-center w-full mx-auto my-2 px-2 ring-1 ring-black rounded-sm hover:bg-zinc-300 cursor-pointer'
                onClick={() => goToPoint(exit.id)}
              >
                <span className='w-4 h-4 leading-4 mr-1 bg-black text-white text-md rounded-full'>
                  {exit.id}
                </span>
                <span className={!exit.visited ? 'font-black' : undefined}>{exit.name}</span>
              </button>
            ))}
          </p>
        </main>
      </div>
    </StateContext.Provider>
  );
}
