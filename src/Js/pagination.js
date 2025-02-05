import cardTemplate from '../template/card.hbs'
footerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        footerBtns.forEach(button => {
            button.classList.remove("footer__btn--piced");
            button.disabled = false;

        });
        btn.classList.add("footer__btn--piced");
    
        
        if( +btn.textContent === 29){
            
        }else if(+btn.textContent === 1){

        }
        else if(+btn.textContent > 25){
            btn.disabled = true;
            btn.parentElement.nextElementSibling.classList.remove("footer__item--unvisible")
            btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("footer__item--unvisible")
          
        }
        else if(+btn.textContent > 4){
            btn.disabled = true;
            btn.parentElement.nextElementSibling.classList.remove("footer__item--unvisible")
            btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("footer__item--unvisible")
            btn.parentElement.previousElementSibling.classList.remove("footer__item--unvisible")
            btn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("footer__item--unvisible")
        }
        
         else{
            btn.disabled = true;
            btn.parentElement.previousElementSibling.classList.remove("footer__item--unvisible")
            btn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("footer__item--unvisible")
        }

    });
});
const footerBtnPiced = document.querySelector(".footer__btn--piced")

const limitEvents = 580
const limitEventsPerPage = 20 
let page = 1 

const mainCards = document.querySelector('.main__cards')


const queryParams = new URLSearchParams({
        apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
        size: 20,
        page: page
})
    
const getEvents = async () => {
    
    console.log(queryParams.toString());
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?${queryParams.toString()}`)
    const event = await response.json()

    console.log(event);
    return event
    
}
getEvents()

const tenderEvents = async () => {
    const responseEvents = await getEvents()
    const events = responseEvents._embedded.events
    events.forEach((value) => {
        console.log(value);
        const event = {
            title: value.name,
            image: value.images[0].url,
            date: value.dates.start.localDate,
            location: value._embedded.venues[0].name
        }

        mainCards.insertAdjacentHTML("beforeend", cardTemplate(event)) 
    })
}
tenderEvents()

const footerBtns = document.querySelectorAll(".footer__btn");

