import Character from './Character';
import Equipment from './Equipment';
import Vessel from './Vessel';


export default function LeftFrame() {
  return (
    <div className='LeftFrame flex flex-col justify-start max-w-screen-sm px-6 border-r border-black'>
      <Character />
      <Vessel />
      <Equipment />
    </div>
  );
}
