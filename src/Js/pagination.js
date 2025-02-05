import cardTemplate from '../template/card.hbs'
const limitEvents = 20
let page = 1 

const mainCards = document.querySelector('.main__cards')


const queryParams = new URLSearchParams({
        apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
        size: limitEvents,
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
