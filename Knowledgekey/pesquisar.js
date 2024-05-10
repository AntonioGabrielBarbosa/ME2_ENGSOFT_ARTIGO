import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, orderByChild, startAt, endAt, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6yHr-xIuuga9isPeLnUoyh2578Ts3W0Y",
    authDomain: "knowledgekey-6cbe7.firebaseapp.com",
    databaseURL: "https://knowledgekey-6cbe7-default-rtdb.firebaseio.com",
    projectId: "knowledgekey-6cbe7",
    storageBucket: "knowledgekey-6cbe7.appspot.com",
    messagingSenderId: "753129151747",
    appId: "1:753129151747:web:a7fcd309d99f788d459d36",
    measurementId: "G-TF9SB5NB75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference to the database
const database = getDatabase(app);

const referecniaDb= ref(database, 'Público')

const referecniaDb1= referecniaDb.key;


