// Importar o módulo Firebase App e Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6yHr-xIuuga9isPeLnUoyh2578Ts3W0Y",
  authDomain: "knowledgekey-6cbe7.firebaseapp.com",
  databaseURL: "https://knowledgekey-6cbe7-default-rtdb.firebaseio.com",
  projectId: "knowledgekey-6cbe7",
  storageBucket: "knowledgekey-6cbe7.appspot.com",
  messagingSenderId: "753129151747",
  appId: "1:753129151747:web:1e5ef7601e19a24b459d36",
  measurementId: "G-Z6J3V8G1N6"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência ao formulário de registro
const registroForm = document.getElementById('registroForm');

// Adicionar evento de submit ao formulário
registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impedir o envio do formulário padrão

    // Coletar valores dos campos do formulário
    const nome = registroForm['nome'].value;
    const email = registroForm['email'].value;
    const data = registroForm['data'].value;
    const senha = registroForm['senha'].value;
    const confirmarSenha = registroForm['confirmarSenha'].value;

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    // Referência ao serviço de autenticação do Firebase
    const auth = firebase.auth();

    // Criar usuário com e-mail e senha
    createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    registroForm.reset();
    alert('Registro realizado com sucesso!')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error('Erro ao registrar usuário:', error.message);
    alert('Erro ao registrar usuário. Verifique o console para mais detalhes.');
    // ..

})
})
