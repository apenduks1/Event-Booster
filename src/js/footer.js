const footerBtns = document.querySelectorAll(".footer__btn");

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