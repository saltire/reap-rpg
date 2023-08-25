import { useEffect, useMemo, useState } from 'react';

import Button from './components/Button';
import SplitLines from './components/SplitLines';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';
import { ReaperStats, PointAction } from '../types';
import { classList, exists } from '../utils';


export default function Point() {
  const dispatch = useDispatch();
  const state = useGameState();

  const point = realm.points.find(p => p.id === state.pointId);
  const exits = useMemo(
    () => (point?.exits ?? []).map(eid => realm.points.find(p => p.id === eid)).filter(exists),
    [point, state.points]);

  const [useVeil, setUseVeil] = useState(false);
  useEffect(() => {
    setUseVeil(false);
  }, [point]);

  // Check action requirements (fail if ALL are unmet, pass if ANY are met).
  const reqsMet = (action: PointAction) => !(action.requires?.length
    && action.requires.every(require => (
      // Check player stats.
      Object.entries(require.reaper ?? {})
        .some(([key, value]) => (state.reaper[key as keyof ReaperStats] || 0) < value)
      // Check flags.
      || Object.entries(require.flags ?? {})
        .some(([key, value]) => !state.flags[key] === value)
    )));

  const actionUsed = (action: PointAction) => point
    && !!state.points[point.id]?.actions?.includes(action.id);

  const preventMove = useMemo(() => point?.actions?.some(a => a.preventMove && !actionUsed(a)),
    [point]);

  return point && (
    <div className='Point'>
      <h2 className='flex items-center justify-center my-8'>
        <span className='w-9 h-9 leading-9 mr-4 bg-black text-white text-3xl rounded-full'>
          {point.id}
        </span>
        <span className='text-5xl'>{point.name}</span>
      </h2>

      <div className='text-xl text-left italic'>
        <SplitLines text={point.description} />
      </div>

      <p className='w-max mx-auto my-8'>
        {point.actions?.map((action, i) => {
          const unavailable = !!(
            // Check action requirements.
            !reqsMet(action)
            // Check other actions for unresolved fights.
            || (action.name !== 'FIGHT' && point.actions?.some(a => a.name === 'FIGHT'))
          );
          const used = actionUsed(action);
          const disabled = used || unavailable;

          return (
            <Button
              key={`${point.id}-${i}`} // eslint-disable-line react/no-array-index-key
              disabled={disabled}
              onClick={() => {
                dispatch({ type: 'use_action', pointId: point.id, actionId: action.id });
                if (action.result) {
                  dispatch({ type: 'apply_result', result: action.result });
                }
              }}
            >
              <span className={classList('font-bold text-xl', used && 'line-through')}>
                {action.name}
              </span>
              {used && <span>&nbsp;– Done</span>}
              {unavailable && <span>&nbsp;– Unavailable</span>}
            </Button>
          );
        })}
      </p>

      <div className='my-8'>
        {!!state.counters.veilWalk && (
          <label>
            Use Veil Walk?
            <input
              type='checkbox'
              className='ml-2'
              checked={useVeil}
              onChange={e => setUseVeil(e.target.checked)}
            />
          </label>
        )}

        <div className='w-max mx-auto my-4'>
          {exits.map(exit => {
            const visited = !!state.points[exit.id]?.visited;

            return (
              <Button
                key={exit.id}
                disabled={preventMove}
                onClick={() => dispatch({ type: 'go_to_point', pointId: exit.id, useVeil })}
              >
                <span className='w-4 h-4 leading-4 mr-1 bg-black text-white rounded-full'>
                  {exit.id}
                </span>
                <span className={!visited ? 'font-bold' : undefined}>{exit.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
