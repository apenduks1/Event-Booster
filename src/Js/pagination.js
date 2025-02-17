import cardTemplate from '../template/card.hbs';

const limitEventsPerPage = 20;
let currentPage = 1;
const totalPages = 29; // Фіксована кількість сторінок
const mainCards = document.querySelector('.main__cards');
const headerSearch = document.getElementById('headerSearch');
const countrySearch = document.getElementById('countrySearch');
const dropMenu = document.querySelector('.header__dropmenu');
const buttonDropmenuCountry = document.getElementById('buttonDropmenuCountry');
const paginationContainer = document.querySelector('.footer__list');

let searchTerm = '';
let countryTerm = '';

const getEvents = async (page = 1) => {
  const queryParams = new URLSearchParams({
    apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
    size: limitEventsPerPage,
    page: page,
    keyword: searchTerm,
    countryCode: countryTerm
  });

  try {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?${queryParams}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const renderEvents = async (page) => {
  mainCards.innerHTML = '';
  const response = await getEvents(page);
  
  if (!response?._embedded?.events) return;

  response._embedded.events.forEach((value) => {
    const event = {
      title: value.name,
      image: value.images[0].url,
      date: value.dates.start.localDate,
      location: value._embedded.venues[0].name
    };
    mainCards.insertAdjacentHTML('beforeend', cardTemplate(event));
  });

  updatePagination();
};

const createPaginationItem = (number, isEllipsis = false) => {
  const li = document.createElement('li');
  li.className = 'footer__item';
  
  if (isEllipsis) {
    li.innerHTML = '<span class="footer__ellipsis">...</span>';
  } else {
    const button = document.createElement('button');
    button.className = 'footer__btn';
    button.textContent = number;
    
    if (number === currentPage) {
      button.classList.add('footer__btn--active');
      button.disabled = true;
    }
    
    button.addEventListener('click', async () => {
      currentPage = number;
      await renderEvents(currentPage);
    });
    
    li.appendChild(button);
  }
  return li;
};

const updatePagination = () => {
  paginationContainer.innerHTML = '';

  const maxVisiblePages = 5; // Кількість видимих сторінок
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Додаємо першу сторінку та еліпсис, якщо потрібно
  if (startPage > 1) {
    paginationContainer.appendChild(createPaginationItem(1));
    if (startPage > 2) {
      paginationContainer.appendChild(createPaginationItem(null, true));
    }
  }

  // Додаємо основні сторінки
  for (let i = startPage; i <= endPage; i++) {
    paginationContainer.appendChild(createPaginationItem(i));
  }

  // Додаємо останню сторінку та еліпсис, якщо потрібно
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationContainer.appendChild(createPaginationItem(null, true));
    }
    paginationContainer.appendChild(createPaginationItem(totalPages));
  }
};

const populateDropMenu = async () => {
  const response = await getEvents();
  const venues = response?._embedded?.events.map(event => event._embedded.venues[0].name) || [];
  const uniqueLocations = [...new Set(venues)];
  
  const dropMenuList = document.querySelector('.header__dropmenu__ul');
  dropMenuList.innerHTML = '';

  uniqueLocations.forEach(location => {
    const listItem = document.createElement('li');
    listItem.className = 'header__dropmenu__li';
    listItem.innerHTML = `
      <button class="header__dropmenu__button">
        <h3>${location}</h3>
      </button>
    `;
    
    listItem.addEventListener('click', () => {
      countryTerm = location;
      currentPage = 1;
      renderEvents(currentPage);
      dropMenu.style.opacity = '0';
      dropMenu.style.pointerEvents = 'none';
    });
    
    dropMenuList.appendChild(listItem);
  });
};

headerSearch.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  currentPage = 1;
  renderEvents(currentPage);
});

countrySearch.addEventListener('input', (e) => {
  countryTerm = e.target.value;
  currentPage = 1;
  renderEvents(currentPage);
});

buttonDropmenuCountry.addEventListener('click', function(event) {
  event.stopPropagation();
  dropMenu.style.opacity = dropMenu.style.opacity === '1' ? '0' : '1';
  dropMenu.style.pointerEvents = dropMenu.style.pointerEvents === 'all' ? 'none' : 'all';
});

document.addEventListener('click', function(event) {
  if (!dropMenu.contains(event.target) && event.target !== buttonDropmenuCountry) {
    dropMenu.style.opacity = '0';
    dropMenu.style.pointerEvents = 'none';
  }
});

// Ініціалізація
(async () => {
  await renderEvents(currentPage);
  await populateDropMenu();
})();