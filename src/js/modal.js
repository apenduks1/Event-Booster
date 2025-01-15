document.querySelector('.button[data-action="open-modal"]').addEventListener('click', () => {
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.add('is-visible');
  const modal = backdrop.querySelector('.modal');
  modal.classList.add('is-visible');
});

document.querySelector('.backdrop').addEventListener('click', (event) => {
  if (event.target !== event.currentTarget) return;
  closeModal();
});

function closeModal() {
  const backdrop = document.querySelector('.backdrop');
  const modal = backdrop.querySelector('.modal');
  modal.classList.remove('is-visible');
  setTimeout(() => {
    backdrop.classList.remove('is-visible');
  }, 300);
}
