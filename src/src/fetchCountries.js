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
    refs.countryList.innerHTML = '';
    return;
  }

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.length > 10) {
        refs.countryList.innerHTML = '';

        throw new Error(
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          )
        );
      } else if (data.length >= 2 && data.length <= 10) {
        return renderMarkupFromTwoTillTenCountries(data);
      } else if (data.length === 1) {
        return renderMarkupForOneCountry(data);
      } else {
        refs.countryList.innerHTML = '';
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
    })
    .then(markup => {
      appendCountriesMarkup(markup);
    })
    .catch(error => console.log(error));
};

function renderMarkupForOneCountry(countries) {
  return countries
    .map(
      country =>
        `<li class="list-item">
          <img src="${country.flags.svg}" alt="" width="50px" />
          <p><span class="list-headers">${country.name.official}</span></p>
          <p><span class="list-headers">Capital:</span> ${country.capital}</p>
          <p><span class="list-headers">Population:</span> ${country.population}</p>
          <p><span class="list-headers">Languges:</span> ${country.languages}</p>
        </li>`
    )
    .join('');
}

function renderMarkupFromTwoTillTenCountries(countries) {
  return countries
    .map(
      country =>
        `<li class="list-items">
          <img class="flag" src="${country.flags.svg}" alt="flag" width="50px" height="50px"/>
          <p class="country-name">${country.name.official}</p>
        </li>`
    )
    .join('');
}

function appendCountriesMarkup(countries) {
  refs.countryList.innerHTML = countries;
}
