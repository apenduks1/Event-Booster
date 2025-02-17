import countries from '../countries.json';

const populateDropMenu = () => {
  console.log('Функція populateDropMenu викликана');
  const dropMenuList = document.querySelector('.header__dropmenu__ul');
  if (!dropMenuList) {
    console.error('Елемент .header__dropmenu__ul не знайдено в DOM');
    return;
  }
  dropMenuList.innerHTML = '';

  console.log('Список країн:', countries);

  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.className = 'header__dropmenu__li';
    listItem.innerHTML = `
      <button class="header__dropmenu__button">
        <h3>${country.country}</h3>
      </button>
    `;
    
    listItem.addEventListener('click', () => {
      console.log('Країна обрана:', country.country);
      countryTerm = country.countryCode;
      currentPage = 1;
      renderEvents(currentPage);
      dropMenu.style.opacity = '0';
      dropMenu.style.pointerEvents = 'none';
    });
    
    dropMenuList.appendChild(listItem);
  });
};

buttonDropmenuCountry.addEventListener('click', function(event) {
  event.stopPropagation();
  console.log('Кнопка дроп-меню натиснута');
  if (dropMenu.style.opacity === '0' || dropMenu.style.opacity === '') {
    dropMenu.style.opacity = '1';
    dropMenu.style.pointerEvents = 'all';
  } else {
    dropMenu.style.opacity = '0';
    dropMenu.style.pointerEvents = 'none';
  }
});

(async () => {
  await renderEvents(currentPage);
  populateDropMenu();
})(); 