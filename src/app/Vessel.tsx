import Wheel from './components/Wheel';
import { useGameState } from '../state';


export default function Vessel() {
  const { vessel } = useGameState();

  return (
    <div className='Vessel'>
      <h2 className='my-8 font-semi text-3xl text-center'>
        Vessel
      </h2>

      <Wheel filled={vessel} />
    </div>
  );
}
