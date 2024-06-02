import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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

function formatarData(timestamp) {
    const data = new Date(timestamp);
    return data.toLocaleString();
}

formSub.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pegar os valores dos campos do formulário
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const titulo = document.getElementById('titulo').value;
    const assunto = document.getElementById('assunto').value;
    const descricao = document.getElementById('desc').value;
    const pdfFile = document.getElementById('pdfFile').files[0]; // Obter o arquivo do input

    // Verificar se o usuário está autenticado
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert('Usuário não autenticado.');
            return;
        }

        const userId = user.uid;
        console.log('User ID:', userId);
        console.log('PDF File:', pdfFile);

        // Verificar se o arquivo PDF está definido
        if (!pdfFile) {
            alert('Nenhum arquivo selecionado.');
            return;
        }

        try {
            // Cria uma referência para um novo post no banco de dados do usuário
            const userFormRef = ref(database, 'FormulariosDeEnvio/' + userId);
            const newPostRef = push(userFormRef);
            const newPostKey = newPostRef.key;

            // Cria uma referência para o armazenamento do arquivo
            const storageReference = storageRef(storage, 'arquivos/' + userId + '/' + newPostKey);
            uploadBytes(storageReference, pdfFile).then((snapshot) => {
                // Obtém a URL de download do arquivo PDF
                return getDownloadURL(storageReference);
            }).then((downloadURL) => {
                // Dados para o post do usuário
                const postData = {
                    Autor: nome,
                    Email: email,
                    Titulo: titulo,
                    Assunto: assunto,
                    Descricao: descricao,
                    Horario: formatarData(Date.now()),
                    NomeArquivo: pdfFile.name,
                    UrlPdf: downloadURL
                };

                // Dados para o post público
                const salvarDataPost = {
                    Autor: nome,
                    Titulo: titulo,
                    Assunto: assunto,
                    Descricao: descricao,
                    NomeArquivo: pdfFile.name,
                    URLPdf: downloadURL
                };

                // Salva os dados no banco de dados
                set(newPostRef, postData);
                return set(push(ref(database, 'Publico')), salvarDataPost);
            }).then(() => {
                alert('Formulário enviado com sucesso!');
                window.location.href = `perfil.html?userId=${userId}`;
            }).catch((error) => {
                console.error('Erro ao enviar formulário:', error);
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
            });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    });
});
