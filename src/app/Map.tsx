import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';

import mapImg from '../static/map.png';


type MapProps = {
  onClose: () => void,
};

export default function Map({ onClose }: MapProps) {
  return (
    <Modal
      isOpen
      overlayClassName='fixed inset-0 bg-black/75'
      className='absolute inset-0 p-5 flex flex-col items-center justify-center'
      onRequestClose={onClose}
    >
      <button
        type='button'
        className='absolute top-0.5 right-0.5 flex items-center justify-center w-14 h-14 text-white'
        onClick={onClose}
      >
        <IoCloseOutline size='36' />
      </button>

      <img className='max-w-full max-h-full' src={mapImg} alt='Kyrie Realm Map' />
    </Modal>
  );
}
