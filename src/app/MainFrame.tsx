import Action from './Action';
import ClockEffect from './ClockEffect';
import Point from './Point';
import { useGameState } from '../state';


export default function MainFrame() {
  const { actionId, clockEffectId } = useGameState();

  return (
    <div className='MainFrame flex-grow overflow-y-auto px-4'>
      <div className='max-w-screen-sm mx-auto text-center'>
        {clockEffectId ? <ClockEffect /> : (actionId ? <Action /> : <Point />)}
      </div>
    </div>
  );
}
