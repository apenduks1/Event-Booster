import modalTemplate from '../templates/modal.hbs';
const modalContent = document.querySelector('.modal-content');
const backDrop = document.querySelector('.js-backdrop');

const mainCards = document.querySelector('.main__cards');

mainCards.addEventListener('click', async function (event) {
  if (event.target.closest('.main__card')) {
    const id = event.target.closest('.main__card').dataset.id;
    backDrop.classList.add('is-open');
    console.log(event.target);
    console.log('id', id);
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=Shhg30GRJqiVh4F5zt8WhjlFpM0sHYGU`)
    const data = await response.json();
    console.log('data', data);
    const context = {
      smallImg: data.images[0].url,
      bigImg: data.images[1].url,
      info: data.info === undefined ? "Info not found" : data.info,
      whenDate: data.dates?.start?.localDate,
      whereCity: data._embedded?.venues[0]?.city?.name,
      whenTime: data.dates?.start?.localTime,
      whereLocation: data._embedded?.venues[0]?.name,
      who: data.name,
      ticketImg: data.images,
      standartPrice: data.priceRanges?.[0]?.min,
    }

    modalContent.innerHTML = modalTemplate(context);
  }
});


const closeModalBtn = document.querySelector('.modal__close');

closeModalBtn.addEventListener('click', function () {
  backDrop.classList.remove('is-open');
});

backDrop.addEventListener('click', function (event) {
  if (event.target === backDrop) {
    backDrop.classList.remove('is-open');
  }
})
