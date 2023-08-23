import { useMemo, useState } from 'react';

import Button from './components/Button';
import realm from '../realm';
import { useDispatch, useGameState } from '../state';
import { Equipment } from '../types';


const { weapons, relics, spells } = realm;

type CardProps = {
  name: string,
  selected?: boolean,
  disabled?: boolean,
  onSelect: () => void,
  onDeselect?: () => void,
};

function Card({ name, selected, disabled, onSelect, onDeselect }: CardProps) {
  const border = selected ? 'ring-4 ring-red-600' : (
    disabled ? 'ring-1 ring-red-200' : 'ring-2 ring-red-400');

  return (
    <button
      type='button'
      className={`w-64 m-4 px-4 py-2 ${border} rounded-xl`}
      onClick={() => !disabled && (selected ? onDeselect?.() : onSelect())}
    >
      {name}
    </button>
  );
}

export default function ChooseEquipment() {
  const dispatch = useDispatch();
  const { equipment } = useGameState();

  const [weaponId, setWeaponId] = useState(
    () => equipment?.weapon.name ?? (weapons.length === 1 ? weapons[0].name : null));
  const [relicId, setRelicId] = useState(
    () => equipment?.relic.name ?? (relics.length === 1 ? relics[0].name : null));
  const [spellIds, setSpellIds] = useState(
    () => equipment?.spells.map(s => s.name)
      ?? (spells.length <= 2 ? spells.map(s => s.name) : []));

  const newEquipment: Equipment | null = useMemo(() => {
    const weapon = weaponId && weapons.find(w => w.name === weaponId);
    const relic = relicId && relics.find(r => r.name === relicId);
    const splls = spellIds.length === 2 && spells.filter(s => spellIds.includes(s.name));
    return weapon && relic && splls ? { weapon, relic, spells: splls } : null;
  }, [weaponId, relicId, spellIds]);

  return (
    <div className='ChooseEquipment'>
      <div>
        <h2 className='mt-8 text-xl font-semi'>Weapon</h2>
        <div>
          {weapons.map(weapon => (
            <Card
              key={weapon.name}
              name={weapon.name}
              selected={weaponId === weapon.name}
              onSelect={() => setWeaponId(weapon.name)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className='mt-8 text-xl font-semi'>Relic</h2>
        <div>
          {relics.map(relic => (
            <Card
              key={relic.name}
              name={relic.name}
              selected={relicId === relic.name}
              onSelect={() => setRelicId(relic.name)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className='mt-8 text-xl font-semi'>Spells</h2>
        <div>
          {spells.map(spell => (
            <Card
              key={spell.name}
              name={spell.name}
              selected={spellIds.includes(spell.name)}
              disabled={spellIds.length >= 2 && !spellIds.includes(spell.name)}
              onSelect={() => setSpellIds(prev => [...prev, spell.name])}
              onDeselect={() => setSpellIds(prev => prev.filter(s => s !== spell.name))}
            />
          ))}
        </div>
      </div>

      <div className='w-max mx-auto my-8'>
        <Button
          className='font-semi'
          disabled={!newEquipment}
          onClick={() => newEquipment
            && dispatch({ type: 'save_equipment', equipment: newEquipment })}
        >
          {equipment ? 'Continue' : 'Start'}
        </Button>
      </div>
    </div>
  );
}
