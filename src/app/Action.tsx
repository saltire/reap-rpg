import { useMemo } from 'react';

import Fight from './Fight';
import Button from './components/Button';
import SplitLines from './components/SplitLines';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';
import { signedNum } from '../utils';


export default function Result() {
  const dispatch = useDispatch();
  const { pointId, actionId, fight } = useGameState();
  const point = useMemo(() => realm.points.find(p => p.id === pointId), [pointId]);
  const action = useMemo(() => point?.actions?.find(a => a.id === actionId), [point, actionId]);

  return point && action && (
    <div className='Action h-full px-4 overflow-y-auto'>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='flex items-center justify-center mt-8 mb-4 font-semi'>
          <span className='w-6 h-6 leading-6 mr-2 rounded-full bg-black text-white text-xl text-center'>
            {point.id}
          </span>
          <span className='text-3xl'>{point.name}</span>
        </h2>
        <h3 className='mb-8 font-semi text-2xl text-center'>
          {action.name}
        </h3>

        {action.fight && fight ? (
          <Fight fight={action.fight} state={fight} />
        ) : (
          <>
            {action.description && (
              <div className='text-xl text-left italic'>
                <SplitLines text={action.description} />
              </div>
            )}

            {action.resultText && (
              <div className='text-xl text-left'>
                <SplitLines text={action.resultText} />
              </div>
            )}

            <div className='w-max mx-auto my-8'>
              {action.choices ? (
                action.choices.map(choice => (
                  <Button
                    key={JSON.stringify(choice)}
                    className='font-bold capitalize'
                    onClick={() => {
                      dispatch({ type: 'apply_result', result: choice });
                      dispatch({ type: 'clear_action' });
                    }}
                  >
                    {Object.entries(choice.reaper ?? {})
                      .map(([key, value]) => `${key}: ${signedNum(value)}`)
                      .join(' ')}
                  </Button>
                )))
                : (action.fight ? (
                  <Button
                    onClick={() => action.fight && dispatch({
                      type: 'start_fight',
                      state: {
                        reaper: action.fight.start,
                        enemies: action.fight.enemies.flatMap(enemy => enemy.start.map(
                          (cell, i) => ({
                            name: enemy.name,
                            index: enemy.start.length > 1 ? i + 1 : undefined,
                            health: enemy.health,
                            cell,
                          }))),
                      },
                    })}
                  >
                    Start fight
                  </Button>
                ) : (
                  <Button onClick={() => dispatch({ type: 'clear_action' })}>Return</Button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
