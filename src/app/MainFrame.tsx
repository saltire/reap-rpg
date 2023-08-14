import Action from './Action';
import Point from './Point';
import { useGameState } from '../state';


export default function MainFrame() {
  const { actionId } = useGameState();

  return (
    <div className='MainFrame flex-grow overflow-y-auto px-4'>
      <div className='max-w-screen-sm mx-auto text-center'>
        {actionId ? <Action /> : <Point />}
      </div>
    </div>
  );
}
