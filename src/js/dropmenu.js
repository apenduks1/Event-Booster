const dropMenu = document.querySelector('.header__dropmenu');
const buttonDropmenuCountry = document.getElementById('buttonDropmenuCountry');


buttonDropmenuCountry.addEventListener('click', function(event) {
  event.stopPropagation();
  if (dropMenu.style.opacity === '0' || dropMenu.style.opacity === '') {
    dropMenu.style.opacity = '1'; 
    dropMenu.style.pointerEvents = 'all'; 
  } else {
    dropMenu.style.opacity = '0'; 
    dropMenu.style.pointerEvents = 'none';
  }
});

document.addEventListener('click', function(event) {
  if (!dropMenu.contains(event.target) && event.target !== buttonDropmenuCountry) {
    dropMenu.style.opacity = '0';
    dropMenu.style.pointerEvents = 'none';
  }
});
