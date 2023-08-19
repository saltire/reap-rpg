import realm from '../realm';
import { useGameState } from '../state';


function StatLine({ label, value }: { label: string, value: number }) {
  return <p className='flex justify-between'><span>{label}</span><span>{value}</span></p>;
}

export default function Character() {
  const { character, counters, flags } = useGameState();

  const counterLines = Object.entries(realm.counterLabels ?? {})
    .filter(([key]) => counters[key]);

  const flagLines = Object.entries(realm.flagLabels ?? {})
    .filter(([key]) => flags[key])
    .map(([, label]) => label);

  return (
    <div className='Character'>
      <h2 className='my-8 font-semi text-3xl text-center'>
        Character
      </h2>

      <div className='my-4 font-bold'>
        <StatLine label='Health' value={character.health} />
        <StatLine label='Stamina' value={character.stamina} />
        <StatLine label='Lore' value={character.lore} />
      </div>

      <div className='my-4 font-bold'>
        <StatLine label='Body' value={character.body} />
        <StatLine label='Bone' value={character.bone} />
        <StatLine label='Blood' value={character.blood} />
      </div>

      {!!counterLines.length && (
        <div className='my-4 font-bold'>
          {counterLines
            .map(([key, label]) => <StatLine key={key} label={label} value={counters[key]} />)}
        </div>
      )}

      {!!flagLines.length && (
        <div className='my-4 font-bold'>
          {flagLines.map(line => (<div key={line}>{line}</div>))}
        </div>
      )}
    </div>
  );
}
