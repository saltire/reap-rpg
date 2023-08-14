import { useMemo } from 'react';

import Button from './components/Button';
import SplitLines from './components/SplitLines';
import points from '../points';
import { useDispatch, useGameState } from '../state';
import { signedNum } from '../utils';


export default function Result() {
  const dispatch = useDispatch();
  const { pointId, actionId } = useGameState();
  const point = useMemo(() => points.find(p => p.id === pointId), [pointId]);
  const action = useMemo(() => point?.actions?.find(a => a.id === actionId), [point, actionId]);

  return !(point && action) ? null : (
    <div className='Action'>
      <h2 className='flex items-center justify-center my-8 font-bold'>
        <span className='w-6 h-6 leading-6 mr-2 bg-black text-white text-xl rounded-full'>
          {point.id}
        </span>
        <span className='text-3xl'>{point.name}</span>
      </h2>
      <h3 className='my-8 font-bold text-2xl'>
        {action.name}
      </h3>

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

      <p className='w-max mx-auto my-8'>
        {action.choices ? (
          action.choices.map(choice => (
            <Button
              key={JSON.stringify(choice)}
              className='font-black capitalize'
              onClick={() => {
                dispatch({ type: 'apply_result', result: choice });
                dispatch({ type: 'clear_action' });
              }}
            >
              {Object.entries(choice.character ?? {})
                .map(([key, value]) => `${key}: ${signedNum(value)}`)
                .join(' ')}
            </Button>
          ))
        ) : (
          <Button onClick={() => dispatch({ type: 'clear_action' })}>
            Return
          </Button>
        )}
      </p>
    </div>
  );
}
