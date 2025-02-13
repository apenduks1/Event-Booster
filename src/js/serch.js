import cardTemplate from '../hbs/_countri.hbs';

const limitEvents = 20;
let page = 1;
const mainCards = document.querySelector('.main__cards');

const queryParams = new URLSearchParams({
  apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
  size: limitEvents,
  page: page,
});

const getEvents = async () => {
  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?${queryParams.toString()}`);
  const event = await response.json();
  return event;
};

const tenderEvents = async (country = '') => {
  const responseEvents = await getEvents();
  const events = responseEvents._embedded.events;
  mainCards.innerHTML = '';

  events.forEach((value) => {
    const eventLocation = value._embedded.venues[0].country.name;
    if (country === '' || eventLocation.toLowerCase().includes(country.toLowerCase())) {
      const event = {
        title: value.name,
        image: value.images[0].url,
        date: value.dates.start.localDate,
        location: value._embedded.venues[0].name,
      };
      mainCards.insertAdjacentHTML('beforeend', cardTemplate(event));
    }
  });
};

const dropMenu = document.querySelector('.header__dropmenu');
const buttonDropmenuCountry = document.getElementById('buttonDropmenuCountry');
const countrySearch = document.getElementById('countrySearch');
const countryList = document.getElementById('countryList');

const countries = [
  'Ukraine', 'USA', 'Canada', 'Germany', 'France', 'Italy', 'Spain', 'Poland', 'United Kingdom', 'Australia',
];

const renderCountries = (filter = '') => {
  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(filter.toLowerCase())
  );
  countryList.innerHTML = filteredCountries.map(country => `
    <li class="header__dropmenu__li">
      <div>
        <button class="header__dropmenu__button" data-country="${country}">
          <h3>${country}</h3>
        </button>
      </div>
    </li>
  `).join('');
};

renderCountries();

buttonDropmenuCountry.addEventListener('click', function (event) {
  event.stopPropagation();
  dropMenu.style.opacity = dropMenu.style.opacity === '1' ? '0' : '1';
  dropMenu.style.pointerEvents = dropMenu.style.opacity === '1' ? 'all' : 'none';
});

document.addEventListener('click', function (event) {
  if (!dropMenu.contains(event.target)) {
    dropMenu.style.opacity = '0';
    dropMenu.style.pointerEvents = 'none';
  }
});

countrySearch.addEventListener('input', function () {
  renderCountries(this.value);
});

countryList.addEventListener('click', function (event) {
  if (event.target.closest('.header__dropmenu__button')) {
    const selectedCountry = event.target.closest('.header__dropmenu__button').dataset.country;
    countrySearch.value = selectedCountry;
    tenderEvents(selectedCountry);
    dropMenu.style.opacity = '0';
    dropMenu.style.pointerEvents = 'none';
  }
});

tenderEvents();