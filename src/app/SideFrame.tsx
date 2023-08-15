import Character from './Character';
import Clock from './Clock';
import Button from './components/Button';
import { useDispatch, useGameState } from '../state';


const getClockFill = (clock: number, start: number) => Math.max(0, Math.min(6, clock - start));

export default function SideFrame() {
  const dispatch = useDispatch();
  const { clock } = useGameState();

  return (
    <div className='SideFrame flex flex-col justify-between max-w-screen-sm px-4 border-r border-black'>
      <Character />

      <div>
        <Clock title='Clock 1' filled={getClockFill(clock, 0)} />
        <Clock title='Clock 2' filled={getClockFill(clock, 6)} />
        <Clock title='Clock 3' filled={getClockFill(clock, 12)} />
      </div>

      <Button
        className='justify-center'
        onClick={() => dispatch({ type: 'reset_game' })}
      >
        Reset
      </Button>
    </div>
  );
}
