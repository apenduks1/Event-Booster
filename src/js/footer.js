const footerBtns = document.querySelectorAll(".footer__btn");

footerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        footerBtns.forEach(button => {
            button.classList.remove("footer__btn--piced");
            button.disabled = false;

        });
        btn.classList.add("footer__btn--piced");
        btn.disabled = true;
        btn.parentElement.nextElementSibling.classList.remove("footer__item--unvisible")
        btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("footer__item--unvisible")

        
    });
});
const footerBtnPiced = document.querySelector(".footer__btn--piced")