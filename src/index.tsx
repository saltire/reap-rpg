import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import './fonts.css';
import './index.css';
import App from './app/App';


const container = document.getElementById('root');
if (container) {
  Modal.setAppElement(container);
  const root = createRoot(container);
  root.render(<App />);
}
