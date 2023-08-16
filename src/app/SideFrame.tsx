import Character from './Character';
import Clock from './Clock';
import Button from './components/Button';
import realm from '../realm';
import { useDispatch } from '../state';


export default function SideFrame() {
  const dispatch = useDispatch();

  return (
    <div className='SideFrame flex flex-col justify-between max-w-screen-sm px-4 border-r border-black'>
      <Character />

      <div>
        {realm.clocks.map(clock => <Clock key={clock.id} clock={clock} />)}
      </div>

      <Button
        className='justify-center'
        onClick={() => dispatch({ type: 'reset_game' })}
      >
        Reset
      </Button>
    </div>
  );
}
