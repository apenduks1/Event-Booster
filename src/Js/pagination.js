import cardTemplate from '../template/card.hbs';

const limitEventsPerPage = 20;
let currentPage = 1;
const totalPages = 29;

const mainCards = document.querySelector('.main__cards');
const paginationContainer = document.querySelector('.footer__list');

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
            button.classList.add('footer__btn--piced');
            button.disabled = true;
        }
        button.addEventListener('click', async () => {
            currentPage = number;
            await renderEvents(currentPage);
            updatePagination();
        });
        li.appendChild(button);
    }
    return li;
};

const updatePagination = () => {
    paginationContainer.innerHTML = '';
    

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) {
        paginationContainer.appendChild(createPaginationItem(i));
    }

    if (currentPage < totalPages - 2) {
        paginationContainer.appendChild(createPaginationItem(null, true));
        paginationContainer.appendChild(createPaginationItem(totalPages));
    }

    const prevButton = document.querySelector('.footer__prev');
    const nextButton = document.querySelector('.footer__next');
    
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = async () => {
            if (currentPage > 1) {
                currentPage--;
                await renderEvents(currentPage);
                updatePagination();
            }
        };
    }
    
    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = async () => {
            if (currentPage < totalPages) {
                currentPage++;
                await renderEvents(currentPage);
                updatePagination();
            }
        };
    }
};

const renderEvents = async (page) => {
    mainCards.innerHTML = '';
    const responseEvents = await getEvents(page);
    if (!responseEvents?._embedded?.events) return;

    responseEvents._embedded.events.forEach((value) => {
        const event = {
            title: value.name,
            image: value.images[0].url,
            date: value.dates.start.localDate,
            location: value._embedded.venues[0].name
        };
        mainCards.insertAdjacentHTML("beforeend", cardTemplate(event));
    });
};

const getEvents = async (page) => {
    const queryParams = new URLSearchParams({
        apikey: 'Pih5LiNOpgXEI3dv2AQLDYBKjwzglj8d',
        size: limitEventsPerPage,
        page: page
    });

    try {

        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/?${queryParams}`);

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};


renderEvents(currentPage);
updatePagination();