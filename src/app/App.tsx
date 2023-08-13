import { useReducer } from 'react';

import Character from './Character';
import Point from './Point';
import { reducer, GameStateContext, DispatchContext, initialState } from '../state';


export default function App() {
  const [game, dispatch] = useReducer(reducer, initialState);

  return (
    <GameStateContext.Provider value={game}>
      <DispatchContext.Provider value={dispatch}>
        <div className='App flex flex-col h-screen overflow-hidden'>
          <header className='py-2 bg-black text-white text-center'>
            <h1 className='font-header text-5xl'>REAP: Kyrie Realm</h1>
          </header>

          <main className='flex flex-grow overflow-hidden'>
            <div className='max-w-screen-sm px-4 border-r border-black'>
              <Character />
            </div>

            <div className='flex-grow overflow-y-auto px-4'>
              <div className='max-w-screen-sm mx-auto text-center'>
                <Point />
              </div>
            </div>
          </main>
        </div>
      </DispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
