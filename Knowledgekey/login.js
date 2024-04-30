import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


const loginForm = document.getElementById('paginaLogin');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    // Realizar login com e-mail e senha
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Usuário logado com sucesso
            const user = userCredential.user;
            alert('Usuário logado com sucesso!');
            loginForm.reset()
            window.location.href = "perfil.html";
            // Redirecionar ou realizar outra ação após o login
        })
        .catch((error) => {
            // Ocorreu um erro durante o login
            const errorMessage = error.message;
            loginForm.reset()
            alert(errorMessage);
        });
});