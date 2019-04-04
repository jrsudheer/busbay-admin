const USERS_REF = 'users/';

var config = {
  apiKey: "AIzaSyDWGB6R4QZGTEurfzIbPQ_D4qZVs8wa4dE",
  authDomain: "buspassauto1.firebaseapp.com",
  databaseURL: "https://buspassauto1.firebaseio.com",
  projectId: "buspassauto1",
  storageBucket: "buspassauto1.appspot.com",
  messagingSenderId: "939429380851"
};
firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.database();

async function presentToast(message, color) {
  const toastController = document.querySelector('ion-toast-controller');
  await toastController.componentOnReady();

  const toast = await toastController.create({
    message: message,
    duration: 2000,
    color: color
  });
  return await toast.present();
}

function writeUserData(userId, username, email, userType) {
  db.ref(USERS_REF + userId).set({
    username: username,
    email: email,
    userType: userType,
  }).then(function (response) {
    console.log("User added to database successfully")
    console.log(response);
    presentToast("User added successfully!", "primary");
  }).catch(function (err) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error occured while adding user. Error Code : " + errorCode);
    console.log(errorMessage);
    presentToast(`Error occured while adding user. ${errorMessage}`, "danger");
  });
}

const addUserForm = document.getElementById('user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Button clicked");
  const username = addUserForm.elements.username.value;
  const email = addUserForm.elements.email.value;
  const password = addUserForm.elements.password.value;
  const userType = parseInt(addUserForm.elements.usertype.value);
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(userType);

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      console.log("User added to authentication successfully")
      console.log(response);
      const id = response.user.uid;
      writeUserData(id, username, email, userType)
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error occured while adding user. Error Code : " + errorCode);
      console.log(errorMessage);
      presentToast(`Error occured while adding user. ${errorMessage}`, "danger");
    });
});