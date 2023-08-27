import Clock from './Clock';
import Button from './components/Button';
import realm from '../realm';
import { useDispatch } from '../state';


export default function RightFrame() {
  const dispatch = useDispatch();

  return (
    <div className='RightFrame flex flex-col max-w-screen-sm border-l border-black'>
      <div className='flex-grow px-6 overflow-y-auto'>
        <h2 className='mx-6 my-8 font-semi text-3xl text-center'>
          Realm
        </h2>

        {realm.clocks.map(clock => <Clock key={clock.id} clock={clock} />)}
      </div>

      <div className='mx-6'>
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
