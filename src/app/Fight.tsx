import Button from './components/Button';
import { FightState, useDispatch } from '../state';
import { Fight as FightType } from '../types';


type FightProps = {
  fight: FightType,
  state: FightState,
};

export default function Fight({ fight, state }: FightProps) {
  const dispatch = useDispatch();

  return (
    <div className='Fight'>
      <div className='grid grid-cols-5 ring-1 ring-black'>
        {[1, 2, 3, 4, 5].map(row => ['A', 'B', 'C', 'D', 'E'].map(col => {
          const cell = `${col}${row}`;
          const bkgd = fight.terrain.includes(cell) ? 'bg-zinc-600' : 'bg-white';

          return (
            <div
              key={cell}
              className={`relative h-0 pb-[100%] ring-1 ring-black ring-inset ${bkgd}`}
            >
              <span className='absolute top-0 left-1'>{cell}</span>
            </div>
          );
        }))}
      </div>

      <div className='w-max mx-auto my-8'>
        <Button
          onClick={() => {
            dispatch({ type: 'end_fight' });
            dispatch({ type: 'clear_action' });
          }}
        >
          End fight
        </Button>
      </div>
    </div>
  );
}
