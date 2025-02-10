import modalTemplate from '../templates/modal.hbs';

document.addEventListener('DOMContentLoaded', function(){
  const openModalBtn = document.querySelector('button[data-action="open-modal"]');
  const closeModalBtn = document.querySelector('.modal__close');
  const backDrop = document.querySelector('.js-backdrop');

  openModalBtn.addEventListener('click', function(){
    backDrop.classList.add('is-open');
  });

  closeModalBtn.addEventListener('click', function(){
    backDrop.classList.remove('is-open');
  });

  backDrop.addEventListener('click', function(event){
    if (event.target === backDrop) {
      backDrop.classList.remove('is-open');
    }
  })
})

let source = document.getElementById("content");

let context = {
  closeImg: "./images/modal-images/close.svg",
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
