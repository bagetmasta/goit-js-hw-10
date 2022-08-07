// Импорт библиотек
import Notiflix from 'notiflix';

const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = name => {
  const inputValue = name.target.value.trim();
  const url = `${BASE_URL}/${inputValue}?fields=name,capital,population,flags,languages`;

  if (inputValue === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        refs.countryList.innerHTML = '';

        throw new Error(
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          )
        );
      } else if (data.length >= 2 && data.length <= 10) {
        renderMarkupFromTwoTillTenCountries(data);
      } else if (data.length === 1) {
        renderMarkupForOneCountry(data);
      } else {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
    })
    .catch(error => console.log(error));
};

function renderMarkupForOneCountry(countries) {
  const newMarkup = countries
    .map(country => {
      const { name, capital, population, flags, languages } = country;

      const arrayLanguages = [];

      for (key in languages) {
        arrayLanguages.push(languages[key]);
      }

      return `<div class="box">
            <img class="flag" src="${flags.svg}" alt="" width="50px" />
            <h1><span class="list-headers country-name">${
              name.official
            }</span></h1>
          </div>
          <ul>
            <li class="list-item">
              <p><span class="list-headers">Capital:</span> ${capital}</p>
              <p>
                <span class="list-headers">Population:</span> ${population}
              </p>
              <p><span class="list-headers">Languges:</span> ${arrayLanguages.join(
                ', '
              )}</p>
            </li>
          </ul>`;
    })
    .join('');

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = newMarkup;
}

function renderMarkupFromTwoTillTenCountries(countries) {
  const newMarkup = countries
    .map(
      country =>
        `<li class="list-items">
          <img class="flag" src="${country.flags.svg}" alt="flag" width="50px" height="50px"/>
          <p class="country-name">${country.name.official}</p>
        </li>`
    )
    .join('');

  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = newMarkup;
}
