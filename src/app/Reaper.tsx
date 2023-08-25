import realm from '../realm';
import { useGameState } from '../state';


function StatLine({ label, value }: { label: string, value: number }) {
  return <p className='flex justify-between'><span>{label}</span><span>{value}</span></p>;
}

export default function Reaper() {
  const { reaper, counters, flags } = useGameState();

  const counterLines = Object.entries(realm.counterLabels ?? {})
    .filter(([key]) => counters[key]);

  const flagLines = Object.entries(realm.flagLabels ?? {})
    .filter(([key]) => flags[key])
    .map(([, label]) => label);

  return (
    <div className='Reaper'>
      <h2 className='my-8 font-semi text-3xl text-center'>
        Reaper
      </h2>

      <div className='my-4 font-bold'>
        <StatLine label='Health' value={reaper.health} />
        <StatLine label='Stamina' value={reaper.stamina} />
        <StatLine label='Lore' value={reaper.lore} />
      </div>

      <div className='my-4 font-bold'>
        <StatLine label='Body' value={reaper.body} />
        <StatLine label='Bone' value={reaper.bone} />
        <StatLine label='Blood' value={reaper.blood} />
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
