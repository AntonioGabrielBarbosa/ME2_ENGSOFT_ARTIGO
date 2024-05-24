import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
const db = getDatabase();

// Função para converter timestamp em uma string de data legível
function formatarData(timestamp) {
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

const registroForm = document.getElementById('registroForm');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = registroForm['nome'].value;
    const email = registroForm['email'].value;
    const data = registroForm['data'].value;
    const senha = registroForm['senha'].value;
    const confirmarSenha = registroForm['confirmarSenha'].value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            return set(ref(db, `usuarios/${user.uid}`), {
                nome: nome,
                email: email,
                dataNcto: data,
                criacao: formatarData(Date.now())  // Formatar a data de criação
            });
        })
        .then(() => {
            registroForm.reset();
            alert('Registro realizado com sucesso!');
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error('Erro ao registrar usuário:', error.message);
            alert('Erro ao registrar usuário. Verifique o console para mais detalhes.');
        });
});
