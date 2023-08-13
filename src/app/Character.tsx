import { useGameState } from '../state';


export default function Character() {
  const { character } = useGameState();

  return (
    <div className='Character'>
      <h2 className='my-8 font-bold text-3xl'>
        Character
      </h2>

      <div className='my-2'>
        <p>Body: {character.body || 0}</p>
        <p>Bone: {character.bone || 0}</p>
        <p>Blood: {character.blood || 0}</p>
      </div>

      <div className='my-2'>
        <p>Lore: {character.lore || 0}</p>
      </div>
    </div>
  );
}
