import { useGameState } from '../state';


export default function Equipment() {
  const { equipment } = useGameState();

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
    </div>
  );
}
