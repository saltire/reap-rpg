import { useMemo, useState } from 'react';

import './App.scss';
import points from './points';
import SplitLines from './SplitLines';
import { exists } from './utils';


export default function App() {
  const [point, setPoint] = useState(points[0]);

  const exits = useMemo(() => point.exits.map(pid => points.find(p => p.id === pid)).filter(exists),
    [point]);

  return (
    <div className='App'>
      <header>
        <h1>REAP: Kyrie Realm</h1>
      </header>
      <main>
        <h2>{point.name}</h2>
        <SplitLines text={point.description} />
        <p>
          {exits.map(exit => (
            <button
              key={exit.id}
              type='button'
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
