// Importa as bibliotecas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Configuração do Firebase
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
const database = getDatabase(app);

// Referência para o nó do database onde os documentos estão armazenados
// Referência para o nó do database onde os documentos estão armazenados
const documentosRef = ref(database, 'Público/', '');

// Função para listar documentos
function listarDocumentos() {
    onValue(documentosRef, (snapshot) => {
        const documentos = snapshot.val();
        const resultadosBusca = document.getElementById('resultadosBusca');
        resultadosBusca.innerHTML = ''; // Limpa a lista

        for (const id in documentos) {
            const documento = documentos[id];
            const div = document.createElement('div');
            div.className = 'resultado-item';
            div.innerHTML = `
                <h3>Titulo: ${documento.Titulo}</h3>
                <p><strong>Autor:</strong> ${documento.Autor}</p>
                <p><strong>Assunto:</strong> ${documento.Assunto}</p>
                <p><strong>Url de destino</strong> ${documento.URLPdf}</p>
            `;
            resultadosBusca.appendChild(div);
        }
    });
}

// Chama a função para listar documentos ao carregar a página
<<<<<<< HEAD
window.onload = listarDocumentos;
=======
window.onload = listarDocumentos;

>>>>>>> de6b9a0a7f87908647f4b358c0f208cab8423b05
