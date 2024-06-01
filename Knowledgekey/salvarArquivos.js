import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileInput = document.getElementById('pdfFile');

fileInput.onchange = function(event) {
    const arquivo = event.target.files[0];
    const arquivoNome = arquivo.name; // Obtém o nome original do arquivo

    const arquivoRef = ref(storage, 'arquivos/' + arquivoNome);

    uploadBytes(arquivoRef, arquivo).then(snapshot => {
        console.log('Snapshot:', snapshot);
        getDownloadURL(arquivoRef).then(url => {
            console.log('URL para download:', url);
        });
    }).catch(error => {
        console.error('Erro ao fazer upload do arquivo:', error);
    });
};
