import { useReducer } from 'react';

import Point from './Point';
import { reducer, GameStateContext, DispatchContext, initialState } from './state';


export default function App() {
  const [game, dispatch] = useReducer(reducer, initialState);

  return (
    <GameStateContext.Provider value={game}>
      <DispatchContext.Provider value={dispatch}>
        <div className='App'>
          <header className='mb-8 py-2 bg-black text-white text-center'>
            <h1 className='font-header text-5xl'>REAP: Kyrie Realm</h1>
          </header>
          <main className='max-w-screen-sm mx-auto text-center'>
            <Point />
          </main>
        </div>
      </DispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
