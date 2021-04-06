import { routes, rootDiv, loadFirebase } from './routes.js';
import * as firebase from './firebase.js';

// ESTO SI VIVE AQUI
loadFirebase(firebase);
let homeView = routes[window.location.pathname];
homeView(rootDiv, firebase);

window.onpopstate = () => {
  homeView = routes[window.location.pathname];
  homeView(rootDiv, firebase);
};
