import { useMemo, useState } from 'react';

import points from './points';
import SplitLines from './SplitLines';
import { exists } from './utils';


export default function App() {
  const [point, setPoint] = useState(points[0]);

  const exits = useMemo(() => point.exits.map(pid => points.find(p => p.id === pid)).filter(exists),
    [point]);

  return (
    <div className='App'>
      <header className='mb-8 py-2 bg-zinc-300 text-center'>
        <h1 className='text-3xl font-bold'>REAP: Kyrie Realm</h1>
      </header>
      <main className='text-center'>
        <h2 className='text-2xl font-bold'>{point.name}</h2>
        <SplitLines text={point.description} />
        <p className='my-4'>
          {exits.map(exit => (
            <button
              key={exit.id}
              type='button'
              className='block mx-auto my-2 underline cursor-pointer'
              // display: block;
              // margin: .5rem auto;
              // border: none;
              // background: none;
              // text-decoration: underline;
              // cursor: pointer;'
              onClick={() => setPoint(exit)}
            >
              {exit.name}
            </button>
          ))}
        </p>
      </main>
    </div>
  );
}
