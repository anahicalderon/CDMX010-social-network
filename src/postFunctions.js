// eslint-disable-next-line import/no-cycle
import {
  savePost, currentPost, db,
} from './firebase.js';

// TODA LA MECÁNICA DE CONSTRUCCIÓN DEL BOTÓN.
const postEditado = (id) => {
  const newCurrentPost = db.collection('newPost').doc(id);
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const body = document.getElementById('body').value;

  return newCurrentPost.update({
    Title: title,
    Subtitle: subtitle,
    Body: body,
    Fecha: Date.now(),
  })
    .then(() => {
      const editBotton = document.querySelector('.editButton');
      editBotton.classList.remove('editButton');
      editBotton.classList.add('dissapear');
      const saveBotton = document.getElementById('btn');
      saveBotton.classList.remove('dissapear');
      saveBotton.classList.add('button');

      document.getElementById('title').value = '';
      document.getElementById('subtitle').value = '';
      document.getElementById('body').value = '';
    })
    .catch((error) => console.log(error));
};

export function editPost(id) {
  currentPost(id)
    .then((result) => {
      const infoData = result.data();

      document.getElementById('title').value = infoData.Title;
      document.getElementById('subtitle').value = infoData.Subtitle;
      document.getElementById('body').value = infoData.Body;

      const editBotton = document.createElement('BOTTON');
      const printBotton = document.getElementById('newPost');

      editBotton.textContent = 'Editar Publicación';
      editBotton.classList.add('editButton');
      printBotton.appendChild(editBotton);

      const saveBotton = document.getElementById('btn');
      saveBotton.classList.remove('button');
      saveBotton.classList.add('dissapear');

      editBotton.addEventListener('click', () => {
        postEditado(id);
      });
    })
    .catch((error) => console.log(error));
}

export const makingPost = () => {
  const titleCard = document.getElementById('title');
  const subtitleCard = document.getElementById('subtitle');
  const bodyCard = document.getElementById('body');

  const post = {
    title: titleCard.value,
    subtitle: subtitleCard.value,
    body: bodyCard.value,
    fecha: Date.now(),
    Like: [],
  };

  if (!titleCard.value.trim() || !subtitleCard.value.trim() || !bodyCard.value.trim()) {
    alert('Te olvidaste de llenar los campos');
  } else {
    savePost(post)
      .then((docRef) => {
        titleCard.value = '';
        subtitleCard.value = '';
        bodyCard.value = '';
      })
      .catch((error) => console.log(error));
  }
};
