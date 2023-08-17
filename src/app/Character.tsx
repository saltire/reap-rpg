import realm from '../realm';
import { useGameState } from '../state';


export default function Character() {
  const { character, counters, flags } = useGameState();

  const counterLines = Object.entries(realm.counterLabels ?? {})
    .filter(([key]) => counters[key])
    .map(([key, label]) => `${label}: ${counters[key]}`);

  const flagLines = Object.entries(realm.flagLabels ?? {})
    .filter(([key]) => flags[key])
    .map(([, label]) => label);

  return (
    <div className='Character'>
      <h2 className='my-8 font-bold text-3xl'>
        Character
      </h2>

      <div className='my-2 font-black'>
        <p>Body: {character.body}</p>
        <p>Bone: {character.bone}</p>
        <p>Blood: {character.blood}</p>
      </div>

      <div className='my-2 font-black'>
        <p>Lore: {character.lore}</p>
      </div>

      {!!counterLines.length && (
        <div className='my-2 font-black'>
          {counterLines.map(line => (<p key={line}>{line}</p>))}
        </div>
      )}

      {!!flagLines.length && (
        <div className='my-2 font-black'>
          {flagLines.map(line => (<p key={line}>{line}</p>))}
        </div>
      )}
    </div>
  );
}
