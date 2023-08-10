import { useMemo } from 'react';

import SplitLines from './components/SplitLines';
import points from './points';
import { useGameState, useDispatch } from './state';
import { exists } from './utils';


export default function Point() {
  const game = useGameState();
  const dispatch = useDispatch();

  const point = points.find(p => p.id === game.pointId);
  const exits = useMemo(
    () => (point?.exits ?? []).map(pid => points.find(p => p.id === pid)).filter(exists)
      .map(exit => ({ ...exit, visited: game.points[exit.id]?.visited })),
    [point, game.points]);

  return point && (
    <div className='Point'>
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
            onClick={() => dispatch({ type: 'go_to_point', pointId: exit.id })}
          >
            <span className='w-4 h-4 leading-4 mr-1 bg-black text-white text-md rounded-full'>
              {exit.id}
            </span>
            <span className={!exit.visited ? 'font-black' : undefined}>{exit.name}</span>
          </button>
        ))}
      </p>
    </div>
  );
}
