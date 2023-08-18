import { useLayoutEffect } from 'react';

import Wheel from './components/Wheel';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';
import { RealmClock } from '../types';


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
      <Wheel filled={filled} />
      <p className='my-2 italic text-center'>{clock.name}</p>
    </div>
  );
}
