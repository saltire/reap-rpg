import { useMemo } from 'react';

import Button from './components/Button';
import SplitLines from './components/SplitLines';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';


export default function ClockEffect() {
  const dispatch = useDispatch();
  const { clockEffectId } = useGameState();
  const clock = useMemo(() => realm.clocks.find(c => c.id === clockEffectId), [clockEffectId]);

  return clock && (
    <div className='ClockEffect'>
      <h3 className='my-8 font-semi text-2xl uppercase'>
        {clock.name} Filled
      </h3>

      {clock.fillDescription && (
        <div className='text-xl text-left italic'>
          <SplitLines text={clock.fillDescription} />
        </div>
      )}

      {clock.fillText && (
        <div className='text-xl text-left'>
          <SplitLines text={clock.fillText} />
        </div>
      )}

      <div className='w-max mx-auto my-8'>
        <Button onClick={() => dispatch({ type: 'clear_clock_effect' })}>Continue</Button>
      </div>
    </div>
  );
}
