import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"; // Importando o módulo do Firebase Storage


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

const auth = getAuth();

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
        const userId = auth.currentUser.uid;
        
        

        const newPostRef = push(ref(database, 'ForumarioDeEnvio/' + userId));

        // Obter a chave única gerada
        const newPostKey = newPostRef.key;

        const newFormsRef= push((database, 'Público/'));
        const storageReference = storageRef(storage, 'arquivos/' + userId + '/' + newPostKey);
        await uploadBytes(storageReference, pdfFile);

        // Gerar uma nova chave única para o novo item



        

        // Crie o objeto de dados a serem salvos
        const postData = {
            Autor: nome,
            Email: email,
            Titulo: titulo,
            Assunto: assunto,
            Descricao: descricao,
            Horario: Date.now(),
            NomeArquivo:pdfFile.name,
            UrlPdf: await getDownloadURL(storageReference) // Obter o URL do arquivo no Storage
        };

        const salvarDataPost = {
            Autor: nome,
            Titulo: titulo,
            Assunto: assunto,
            Descricao: descricao,
            NomeArquivo:pdfFile.name,
            URLPdf: await getDownloadURL(storageReference) // Obter o URL do arquivo no Storage

        }

        // Execute a operação de gravação
        await set(newPostRef, postData);

        await set(newFormsRef,salvarDataPost)

        // Operação concluída com sucesso
        alert('Formulário enviado com sucesso!');
        window.location.href = `perfil.html?userId=${userId}`;
    } catch (error) {
        // Lidar com erros
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
});

