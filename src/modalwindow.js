let modal = document.querySelector('#modal'),
  modalOverlay = document.querySelector('#modal-overlay'),
  closeButton = document.querySelector('#modal__close-button'),
  openButton = document.querySelector('#open__link');

openButton.addEventListener('click', function () {
  modal.style.display = 'inline-block';
  modalOverlay.style.display = 'inline-block';
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});
closeButton.addEventListener('click', function () {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
});
