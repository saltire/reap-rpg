import Character from './Character';
import Button from './components/Button';
import { useDispatch } from '../state';


export default function SideFrame() {
  const dispatch = useDispatch();

  return (
    <div className='SideFrame flex flex-col max-w-screen-sm px-4 border-r border-black'>
      <div className='flex-grow'>
        <Character />
      </div>
      <div>
        <Button
          className='justify-center'
          onClick={() => dispatch({ type: 'reset_game' })}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
