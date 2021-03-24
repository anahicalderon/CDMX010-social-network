import { deleteConfirmation } from './deleteConfirmation.js';

export const deleteModal = (id) => {
  const modalContainer = document.getElementById('modalContainer');
  deleteConfirmation(modalContainer, id);
  const modal = document.querySelector('.modal');
  const closeButton = document.querySelector('.close-button');

  modal.classList.toggle('show-modal');

  window.onclick = (event) => {
    if (event.target === modal || event.target === closeButton) {
      modal.classList.toggle('show-modal');
    }
  };
};