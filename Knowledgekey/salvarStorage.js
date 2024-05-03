import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"; // Importando o módulo do Firebase Storage


// Configurações do Firebase
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

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Referência ao banco de dados
const database = getDatabase(app);

// Referência ao armazenamento
const storage = getStorage(app);

const formSub = document.getElementById('formSub');


formSub.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pegar os valores dos campos do formulário
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const titulo = document.getElementById('titulo').value;
    const assunto = document.getElementById('assunto').value;
    const descricao = document.getElementById('desc').value;
    const pdfFile = document.getElementById('pdfFile').files[0]; // Obter o arquivo do input


    try {
       // Upload do arquivo para o Firebase Storage
       const storageReference = storageRef(storage, 'arquivos/' + pdfFile.name); // Renomeando a variável
       await uploadBytes(storageReference, pdfFile);

        // Gerar uma nova chave única para o novo item
        const newPostRef = push(ref(database, 'ForumarioDeEnvio/'));

        // Obter a chave única gerada
        const newPostKey = newPostRef.key;

        // Crie o objeto de dados a serem salvos
        const postData = {
            nome: nome,
            email: email,
            titulo: titulo,
            assunto: assunto,
            descricao: descricao,
            horario: Date.now()
        };



        // Execute a operação de gravação
        await set(newPostRef, postData);

        // Operação concluída com sucesso
        alert('Formulário enviado com sucesso!');
    } catch (error) {
        // Lidar com erros
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
});

