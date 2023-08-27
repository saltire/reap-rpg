import { useEffect, useState } from 'react';

import { CharacterState } from '../state';
import { Fight } from '../types';


export type CharacterMarker = CharacterState & { color: string };

type FightCellProps = {
  row: string,
  col: string,
  fight: Fight,
  chars: CharacterMarker[],
};

export default function FightCell({ row, col, fight, chars }: FightCellProps) {
  const cell = `${col}${row}`;
  const bkgd = fight.terrain.includes(cell) ? 'bg-zinc-600' : 'bg-white';

  const [topIndex, setTopIndex] = useState(0);
  useEffect(() => {
    setTopIndex(0);
  }, [chars]);

  return (
    <div
      key={cell}
      className={`relative flex h-0 pb-[100%] ring-1 ring-black ring-inset ${bkgd}`}
    >
      <span className='absolute top-0 left-1'>{cell}</span>
      {chars.map((char, i) => (
        <div
          key={`${char.name}${char.index || ''}`}
          className={`absolute top-1/4 left-1/4 flex items-center justify-center w-1/2 h-1/2 rounded-full
            bg-black text-xl text-white ${char.color} ${topIndex === i ? 'z-10' : 'z-0'}`}
        >
          {char.health}
        </div>
      ))}

      {chars.length > 1 && (
        <div className='absolute top-3/4 bottom-0 left-0 right-0 flex items-center justify-center'>
          {chars.map((char, i) => (
            <button
              key={`${char.name}${char.index || ''}`}
              className={`w-1/8 h-1/2 mx-1 rounded-full ${char.color} ${topIndex === i ? '' : 'opacity-25'}`}
              type='button'
              title={`${char.name} ${char.index}`}
              onClick={() => setTopIndex(i)}
            >
              {' '}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
