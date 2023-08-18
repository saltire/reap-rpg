import Clock from './Clock';
import Button from './components/Button';
import realm from '../realm';
import { useDispatch } from '../state';


export default function RightFrame() {
  const dispatch = useDispatch();

  return (
    <div className='RightFrame flex flex-col justify-between max-w-screen-sm px-6 border-l border-black'>
      <div>
        <h2 className='my-8 font-semi text-3xl text-center'>
          Realm
        </h2>
        {realm.clocks.map(clock => <Clock key={clock.id} clock={clock} />)}
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
