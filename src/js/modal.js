import modalTemplate from '../templates/modal.hbs';
const modalContent = document.querySelector('.modal-content');
const backDrop = document.querySelector('.js-backdrop');

// document.addEventListener('DOMContentLoaded', function () {

// const openModalBtn = document.querySelector('button[data-action="open-modal"]');
const mainCards = document.querySelector('.main__cards');

mainCards.addEventListener('click', async function (event) {
  if (event.target.closest('.main__card')) {
    const id = event.target.closest('.main__card').dataset.id;
    backDrop.classList.add('is-open');
    console.log('id', id);
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=Shhg30GRJqiVh4F5zt8WhjlFpM0sHYGU`)
    const data = await response.json();
    console.log('data', data);
    const context = {
      smallImg: data.images[0].url,
    }

    modalContent.innerHTML = modalTemplate(context);
  }
});

// console.log(openModalBtn);


const closeModalBtn = document.querySelector('.modal__close');

// openModalBtn.addEventListener('click', function () {
//   backDrop.classList.add('is-open');
// });

closeModalBtn.addEventListener('click', function () {
  backDrop.classList.remove('is-open');
});

backDrop.addEventListener('click', function (event) {
  if (event.target === backDrop) {
    backDrop.classList.remove('is-open');
  }
})
// })

let source = document.getElementById("content");

let context = {
  smallImg: "./images/modal-images/modal-small-svg.svg",
  bigImg: "./images/modal-images/modal-big-photo.png",
  info: "Atlas Weekend is the largest music festival in Ukraine.More than 200 artists will create a proper music festival atmosphere on 10 stages.",
  whenDate: "2021-06-09",
  whenTime: "20:00 (Kyiv/Ukraine)",
  whereCity: "Kyiv, Ukraine",
  whereLocation: "VDNH",
  who: "The Black Eyed Peas",
  ticketImg: "./images/modal-images/modal-ticket.svg",
  standartPrice: "Standart 300-500 UAH",
  vipPrice: "VIP 1000-1500 UAH"
};


let html = modalTemplate(context);
console.log(html);
// document.getElementById("content").innerHTML = html;
