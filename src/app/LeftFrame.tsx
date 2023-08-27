import Equipment from './Equipment';
import Reaper from './Reaper';
import Vessel from './Vessel';


export default function LeftFrame() {
  return (
    <div className='LeftFrame flex flex-col justify-start max-w-screen-sm px-6 border-r border-black overflow-y-auto'>
      <Reaper />
      <Vessel />
      <Equipment />
    </div>
  );
}
