import { home } from './home.js';
import { login } from './login.js';
import { postPage } from './post.js';
import { novaApp } from './auth/nova.js';
import { signIn } from './auth/signIn.js';
import { signUp } from './auth/signUp.js';
import { deleteModal } from './PostController/modals.js';

// eslint-disable-next-line import/no-cycle
import { editPost, makingPost } from './postFunctions.js';

export const rootDiv = document.getElementById('root');

// DEPENDECY INJECTION
let firebase;
export const loadFirebase = (firebaseFromApp) => {
  firebase = firebaseFromApp;
};

// ROUTING
export const routes = {
  '/': novaApp,
  '/home': home,
  '/login': login,
  '/post': postPage,
  '/signIn': signIn,
  '/signUp': signUp,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  const view = routes[pathname];
  view(rootDiv, firebase);
};

// EVENT CONTROLLER
const eventsController = (e, id) => {
  // eslint-disable-next-line default-case
  switch (e) {
    case 'novaApp':
      onNavigate('/');
      break;
    case 'home':
      onNavigate('/home');
      break;
    case 'login':
      onNavigate('/login');
      break;
    case 'post':
      onNavigate('/post');
      break;
    case 'signIn':
      onNavigate('/signIn');
      break;
    case 'signUp':
      onNavigate('/signUp');
      break;
    case 'saveButton':
      makingPost();
      break;
    case 'signInUser':
      firebase.signInWithEmailAndPassword();
      break;
    case 'signUpButton':
      firebase.signUpWithEmailAndPassword();
      break;
    case 'signOut':
      firebase.signOut();
      break;
    case 'signUpWithGoogle':
      firebase.signUpWithGoogle();
      break;
    case 'signInWithGoogle':
      firebase.signUpWithGoogle();
      break;
    case 'delete':
      deleteModal(id);
      break;
    case 'edit':
      editPost(id);
      break;
    case 'like':
      firebase.likes(id);
      break;
    case 'confirm':
      firebase.deletePost(id);
      break;
  }
};

const addButtonEvents = () => {
  const parentContainer = document.querySelectorAll('#root');
  parentContainer.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const click = e.target.dataset.action;
      const id = e.target.dataset.id;
      eventsController(click, id);
    });
  });
};

addButtonEvents();
