import Action from './Action';
import ChooseEquipment from './ChooseEquipment';
import ClockEffect from './ClockEffect';
import Point from './Point';
import { useGameState } from '../state';


export default function MainFrame() {
  const { equipment, editEquipment, actionId, clockEffectId } = useGameState();

  return (
    <div className='MainFrame flex-grow overflow-hidden'>
      {(!equipment || editEquipment) ? <ChooseEquipment /> : (
        clockEffectId ? <ClockEffect /> : (
          actionId ? <Action /> : <Point />))}
    </div>
  );
}
