import { useEffect, useReducer, useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';

import MainFrame from './MainFrame';
import Map from './Map';
import SideFrame from './SideFrame';
import { reducer, GameStateContext, DispatchContext, initialState } from '../state';


export default function App() {
  const [game, dispatch] = useReducer(reducer, initialState);

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    dispatch({ type: 'load_saved_game' });
  }, []);

  return (
    <GameStateContext.Provider value={game}>
      <DispatchContext.Provider value={dispatch}>
        <div className='App flex flex-col h-screen overflow-hidden'>
          <header className='relative bg-black text-white text-center'>
            <h1 className='font-header text-5xl leading-tight'>REAP: Kyrie Realm</h1>

            {showMap ? (
              <Map onClose={() => setShowMap(false)} />
            ) : (
              <button
                type='button'
                className='absolute top-0.5 right-0.5 flex items-center justify-center w-14 h-14 text-white'
                title='Map'
                onClick={() => setShowMap(true)}
              >
                <IoMapOutline size='30' />
              </button>
            )}
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
