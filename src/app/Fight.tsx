import { ReactNode } from 'react';

import Button from './components/Button';
import { FightState, useDispatch, useGameState } from '../state';
import { Fight as FightType } from '../types';
import { classList } from '../utils';


type CharacterProps = {
  className?: string,
  children: ReactNode,
};

function Character({ className, children }: CharacterProps) {
  return (
    <div
      className={classList(
        `absolute top-1/4 left-1/4 flex items-center justify-center w-1/2 h-1/2 rounded-full
        bg-black text-xl text-white`,
        className,
      )}
    >
      {children}
    </div>
  );
}

type FightProps = {
  fight: FightType,
  state: FightState,
};

export default function Fight({ fight, state }: FightProps) {
  const dispatch = useDispatch();
  const { reaper } = useGameState();

  return (
    <div className='Fight'>
      <div className='grid grid-cols-5 ring-1 ring-black'>
        {[1, 2, 3, 4, 5].map(row => ['A', 'B', 'C', 'D', 'E'].map(col => {
          const cell = `${col}${row}`;
          const bkgd = fight.terrain.includes(cell) ? 'bg-zinc-600' : 'bg-white';

          return (
            <div
              key={cell}
              className={`relative flex h-0 pb-[100%] ring-1 ring-black ring-inset ${bkgd}`}
            >
              <span className='absolute top-0 left-1'>{cell}</span>
              {state.reaper === cell && (
                <Character className='bg-red-600'>
                  {reaper.health}
                </Character>
              )}
              {state.enemies.map(enemy => enemy.cell === cell && (
                <Character className='bg-blue-600'>
                  {enemy.health}
                </Character>
              ))}
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
