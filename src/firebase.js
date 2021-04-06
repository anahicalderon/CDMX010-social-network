// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// eslint-disable-next-line import/no-cycle
import { renderPost } from './home.js';
import { onNavigate } from './routes.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCE3V_6hn_oiPhJAvfRLJLygBVct9fIZRg',
  authDomain: 'novaapp-67e15.firebaseapp.com',
  projectId: 'novaapp-67e15',
  storageBucket: 'novaapp-67e15.appspot.com',
  messagingSenderId: '282489634860',
  appId: '1:282489634860:web:97a4ad5b81716f2b0f5189',
  measurementId: 'G-N31JQDJTSM',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const currentPost = (id) => db.collection('newPost').doc(id).get();

// GUARDA INFORMACIÓN DE USUARIIO EN LA BASE DE DATOS.
export const savePost = (post) => db.collection('newPost')
  .add({
    Title: post.title,
    Subtitle: post.subtitle,
    Body: post.body,
    Fecha: Date.now(),
    Like: [],
  });

// TRAE LA DATA DE LA BASE DE DATOS.
export const getData = () => {
  const postContainer = document.getElementById('printData');
  db.collection('newPost').orderBy('Fecha', 'desc')
    .onSnapshot((querySnapshot) => {
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const dataBase = doc.data();
        dataBase.id = doc.id; // CON ESTE ACCEDEMOS A LOS ID DE NUESTROS DATOS
        const id = dataBase.id;
        postContainer.innerHTML += renderPost(dataBase, id);
        // console.log(dataBase);
      });
    });
};

// BORRA LOS POST
export const deletePost = (id) => {
  // console.log('We are inside deletePost');
  console.log(id);
  db.collection('newPost').doc(id).delete()
    .then(() => {
      console.log('Post was deleted in firebase console');
    })
    .catch((error) => {
      console.log('An error have ocurred!');
    });
  // console.log(id);
};

export const stateVerif = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const animate = () => {
        setTimeout(() => {
          onNavigate('/home');
        }, 1500);
      };
      animate();
    } else {
      const animate = () => {
        setTimeout(() => {
          onNavigate('/login');
        }, 1500);
      };
      animate();
    }
  });
};

export const userInfo = () => {
  const user = firebase.auth().currentUser;
  const displayUserInfo = document.querySelector('#userName');
  const userName = user.email;
  const welcomeTemplate = `Bienvenida ${userName}`;

  displayUserInfo.innerHTML = welcomeTemplate;
};

export const likes = (id) => {
  const userEmail = auth.currentUser.uid;
  currentPost(id)
    .then((result) => {
      const postData = result.data();
      const likesArray = postData.Like;
      const likeViewer = likesArray.includes(userEmail);

      if (likeViewer === false) {
        db.collection('newPost').doc(id).update({ Like: firebase.firestore.FieldValue.arrayUnion(userEmail) });
      } else {
        db.collection('newPost').doc(id).update({ Like: firebase.firestore.FieldValue.arrayRemove(userEmail) });
      }
    }).catch(() => {
      console.log('an error has ocurried');
    });
};

// AUTH FROM FIREBASE
// CREATE USER
export const signUpWithEmailAndPassword = () => {
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  const expression = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (userName.length === 0
    || userEmail.length === 0
    || userPassword.length === 0) {
    alert('ERROR, Asegurate de llenar lo inputs');
  } else if (!expression.test(userEmail)) {
    alert('No es un formato de correo válido!');
  } else {
    auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        alert(`Bienvenida a novaApp! ${userName}`);
        onNavigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// SIGN-IN
export const signInWithEmailAndPassword = () => {
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  const expression = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (userEmail.length === 0
    || userPassword.length === 0) {
    alert('Error, asegurate de llenar los inputs.');
  } else if (!expression.test(userEmail)) {
    alert('No es un formato de correo válido!');
  } else {
    auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        console.log(user);
        onNavigate('/home');
      })
      .catch((error) => {
        alert('El correo o la contraseña ingresados son inválidos');
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }
};

// SIGN-OUT
export const signOut = () => {
  auth.signOut()
    .then((user) => {
      onNavigate('/');
    }).catch((error) => {
      alert('Un error ha ocurrido. Inténtalo de nuevo'); // Más adelante sería un error 404.
    });
};

// SIGN UP AND SIGN IN WITH GOOGLW
export const signUpWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((user) => {
      console.log(user);
      onNavigate('/home');
    }).catch((error) => {
      console.log(error);
      // eslint-disable-next-line no-alert
    });
};
