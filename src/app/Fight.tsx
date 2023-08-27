import FightCell, { CharacterMarker } from './FightCell';
import Button from './components/Button';
import { FightState, useDispatch, useGameState } from '../state';
import { Fight as FightType } from '../types';


type FightProps = {
  fight: FightType,
  state: FightState,
};

export default function Fight({ fight, state }: FightProps) {
  const dispatch = useDispatch();
  const { reaper } = useGameState();

  const chars: CharacterMarker[] = [
    {
      cell: state.reaper,
      name: 'Reaper',
      health: reaper.health,
      color: 'bg-red-600',
    },
    ...state.enemies.map(enemy => ({
      ...enemy,
      color: 'bg-blue-600',
    })),
  ];

  return (
    <div className='Fight'>
      <div className='grid grid-cols-5 ring-1 ring-black'>
        {['1', '2', '3', '4', '5'].map(row => ['A', 'B', 'C', 'D', 'E'].map(col => (
          <FightCell
            key={`${col}${row}`}
            fight={fight}
            row={row}
            col={col}
            chars={chars.filter(char => char.cell === `${col}${row}`)}
          />
        )))}
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
