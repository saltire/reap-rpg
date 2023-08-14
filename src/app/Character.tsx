import { useGameState } from '../state';


export default function Character() {
  const { character } = useGameState();

  return (
    <div className='Character'>
      <h2 className='my-8 font-bold text-3xl'>
        Character
      </h2>

      <div className='my-2'>
        <p>Body: {character.body}</p>
        <p>Bone: {character.bone}</p>
        <p>Blood: {character.blood}</p>
      </div>

      <div className='my-2'>
        <p>Lore: {character.lore}</p>
      </div>

      {character.veilWalk && (
        <div className='my-2'>
          <p>Veil Walk: {character.veilWalk}</p>
        </div>
      )}
    </div>
  );
}
