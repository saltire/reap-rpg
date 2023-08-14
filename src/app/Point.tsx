import { useMemo } from 'react';

import Button from './components/Button';
import SplitLines from './components/SplitLines';
import points, { Character } from '../points';
import { useDispatch, useGameState } from '../state';
import { classList, exists } from '../utils';


export default function Point() {
  const dispatch = useDispatch();
  const game = useGameState();

  const point = points.find(p => p.id === game.pointId);
  const exits = useMemo(
    () => (point?.exits ?? []).map(eid => points.find(p => p.id === eid)).filter(exists),
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
        {point.actions?.map((action, i) => {
          const unavailable = !!(
            Object.entries(action.requires?.character ?? {})
              .some(([key, value]) => (game.character[key as keyof Character] || 0) < value)
            || Object.entries(action.requires?.flags ?? {})
              .some(([key, value]) => !game.flags[key] === value)
          );
          const used = !!game.points[point.id]?.actions?.includes(action.id);
          const disabled = used || unavailable;

          return (
            <Button
              key={`${point.id}-${i}`} // eslint-disable-line react/no-array-index-key
              className={disabled ? 'text-zinc-500' : undefined}
              disabled={disabled}
              onClick={() => {
                dispatch({ type: 'use_action', pointId: point.id, actionId: action.id });
                if (action.result) {
                  dispatch({ type: 'apply_result', result: action.result });
                }
              }}
            >
              <span
                className={classList('font-black text-xl', used && 'line-through')}
              >
                {action.name}
              </span>
              {used && <span>&nbsp;– Done</span>}
              {unavailable && <span>&nbsp;– Unavailable</span>}
            </Button>
          );
        })}
      </p>

      <p className='w-max mx-auto my-8'>
        {exits.map(exit => {
          const visited = !!game.points[exit.id]?.visited;

          return (
            <Button
              key={exit.id}
              onClick={() => dispatch({ type: 'go_to_point', pointId: exit.id })}
            >
              <span className='w-4 h-4 leading-4 mr-1 bg-black text-white rounded-full'>
                {exit.id}
              </span>
              <span className={!visited ? 'font-black' : undefined}>{exit.name}</span>
            </Button>
          );
        })}
      </p>
    </div>
  );
}
