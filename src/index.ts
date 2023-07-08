import './styles.css';
import './Events';
import { render, updateSizes } from './Components/Board';

const main = () => {
  updateSizes();
  render();
};

main();
