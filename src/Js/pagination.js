const limitEvents = 20
let page = 1

const getEvents = async () => {
    const queryParams = new URLSearchParams({
        apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
        size: limitEvents,
        page: page
    })
    console.log(queryParams.toString());
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?${queryParams.toString()}`)
    const events = await response.json()

    console.log(events);
}

getEvents()

const tenderEvents = async () => {
    const responseEvents = await getEvents()
    const events = responseEvents._embedded.events
    events.forEach((value) => {
        const event = {
            title: value.name,
            images: value.images[0].URLSearchParams,
            date: value.dates,
            location : value.locale
        }

        container.innerHTML = menuTemplate(event)
    })
}