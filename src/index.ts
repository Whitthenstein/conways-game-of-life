import './styles.css';
import './Events';
import { render, updateSizes } from './Board';

const main = () => {
  updateSizes();
  render();
};

main();
