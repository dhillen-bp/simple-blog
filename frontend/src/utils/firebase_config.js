import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgKwvQxZcRGKAPj-N-0Moq6LBNkSMOunQ",
  authDomain: "ideation-392108.firebaseapp.com",
  projectId: "ideation-392108",
  storageBucket: "ideation-392108.appspot.com",
  messagingSenderId: "406810858266",
  appId: "1:406810858266:web:790a65df5eaca456fe52a3",
  measurementId: "G-DV36BWV529",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
