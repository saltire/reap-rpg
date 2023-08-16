import { useLayoutEffect } from 'react';

import realm from '../realm';
import { useDispatch, useGameState } from '../state';
import { RealmClock } from '../types';


type SliceProps = {
  rotate: string,
  filled?: boolean,
};

function Slice({ rotate, filled }: SliceProps) {
  const color = filled ? 'bg-zinc-600' : 'bg-white';
  return (
    <div className={`absolute top-0 right-0 w-24 h-24 ${rotate}`}>
      <div className='absolute top-0 right-0 w-12 h-12 border-l border-black overflow-hidden'>
        <div className='absolute top-0 right-0 w-24 h-24 -rotate-30'>
          <div className={`absolute top-0 right-0 w-12 h-12 border-b border-black ${color}`} />
        </div>
      </div>
    </div>
  );
}

type ClockProps = {
  clock: RealmClock,
};

export default function Clock({ clock }: ClockProps) {
  const dispatch = useDispatch();
  const { clockSegments, clockEffects } = useGameState();
  const offset = realm.clocks.indexOf(clock) * 6;
  const filled = clockSegments - offset;

  useLayoutEffect(() => {
    if (filled >= 6 && !clockEffects?.includes(clock.id)) {
      dispatch({ type: 'apply_clock_effect', clockId: clock.id });
      if (clock.result) {
        dispatch({ type: 'apply_result', result: clock.result });
      }
    }
  }, [clock, filled, clockEffects]);

  return (
    <div className='Clock mx-auto my-4'>
      <div className='relative w-24 h-24 mx-auto rounded-full ring-2 ring-black overflow-hidden'>
        <Slice rotate='rotate-0' filled={filled >= 1} />
        <Slice rotate='rotate-60' filled={filled >= 2} />
        <Slice rotate='rotate-120' filled={filled >= 3} />
        <Slice rotate='rotate-180' filled={filled >= 4} />
        <Slice rotate='rotate-240' filled={filled >= 5} />
        <Slice rotate='rotate-300' filled={filled >= 6} />
      </div>
      <p className='my-2 italic text-center'>{clock.name}</p>
    </div>
  );
}
