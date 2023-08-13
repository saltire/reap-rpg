import Point from './Point';


export default function MainFrame() {
  return (
    <div className='MainFrame flex-grow overflow-y-auto px-4'>
      <div className='max-w-screen-sm mx-auto text-center'>
        <Point />
      </div>
    </div>
  );
}
