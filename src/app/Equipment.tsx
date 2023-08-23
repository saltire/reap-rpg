import { useMemo } from 'react';

import Button from './components/Button';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';


export default function Equipment() {
  const dispatch = useDispatch();
  const { equipment, pointId, actionId } = useGameState();
  const point = useMemo(() => realm.points.find(p => p.id === pointId), [pointId]);
  const action = useMemo(() => point?.actions?.find(a => a.id === actionId), [point, actionId]);

  return equipment && (
    <div className='Equipment'>
      <h2 className='my-8 font-semi text-3xl text-center'>
        Equipment
      </h2>

      <div className='my-4'>
        <p>Weapon</p>
        <p className='font-bold'>{equipment.weapon.name}</p>
      </div>

      <div className='my-4'>
        <p>Relic</p>
        <p className='font-bold'>{equipment.relic.name}</p>
      </div>

      <div className='my-4'>
        <p>Spells</p>
        {equipment.spells.map(spell => <p key={spell.name} className='font-bold'>{spell.name}</p>)}
      </div>

      <div>
        <Button
          className='justify-center'
          disabled={!!action?.fight}
          onClick={() => dispatch({ type: 'edit_equipment' })}
        >
          Switch
        </Button>
      </div>
    </div>
  );
}
