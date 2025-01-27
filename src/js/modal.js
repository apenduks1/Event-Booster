import modalTemplate from '../templates/modal.hbs';

// document.querySelector('.button[data-action="open-modal"]').addEventListener('click', () => {
//   const backdrop = document.querySelector('.backdrop');
//   backdrop.classList.add('is-visible');
//   const modal = backdrop.querySelector('.modal');
//   modal.classList.add('is-visible');
// });

// document.querySelector('.backdrop').addEventListener('click', (event) => {
//   if (event.target !== event.currentTarget) return;
//   closeModal();
// });
//
// function closeModal() {
//   const backdrop = document.querySelector('.backdrop');
//   const modal = backdrop.querySelector('.modal');
//   modal.classList.remove('is-visible');
//   setTimeout(() => {
//     backdrop.classList.remove('is-visible');
//   }, 300);
// }


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
document.getElementById("content").innerHTML = html;
