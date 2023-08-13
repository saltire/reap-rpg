import { useEffect, useReducer } from 'react';

import MainFrame from './MainFrame';
import SideFrame from './SideFrame';
import { reducer, GameStateContext, DispatchContext, initialState } from '../state';


export default function App() {
  const [game, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'load_saved_game' });
  }, []);

  return (
    <GameStateContext.Provider value={game}>
      <DispatchContext.Provider value={dispatch}>
        <div className='App flex flex-col h-screen overflow-hidden'>
          <header className='py-2 bg-black text-white text-center relative'>
            <h1 className='font-header text-5xl'>REAP: Kyrie Realm</h1>
          </header>

          <main className='flex flex-grow overflow-hidden'>
            <SideFrame />
            <MainFrame />
          </main>
        </div>
      </DispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
