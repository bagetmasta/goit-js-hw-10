// Импорт стилей
import './css/styles.css';

const _ = require('lodash');

// Импорт ф-и
import { fetchCountries } from './src/fetchCountries';

// Решение задачи

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener(
  'input',
  _.debounce(fetchCountries, DEBOUNCE_DELAY)
);
