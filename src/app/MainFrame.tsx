import Action from './Action';
import ChooseEquipment from './ChooseEquipment';
import ClockEffect from './ClockEffect';
import Point from './Point';
import { useGameState } from '../state';


export default function MainFrame() {
  const { equipment, actionId, clockEffectId } = useGameState();

  return (
    <div className='MainFrame flex-grow overflow-y-auto px-4'>
      <div className='max-w-screen-sm mx-auto text-center'>
        {!equipment ? <ChooseEquipment /> : (
          clockEffectId ? <ClockEffect /> : (
            actionId ? <Action /> : <Point />))}
      </div>
    </div>
  );
}
