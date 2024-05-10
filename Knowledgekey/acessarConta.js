import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, onValue, set, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as storageRef, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const auth = getAuth(app);
const storage = getStorage(app);

// Função para deletar um documento
function deletarDocumento(userID, documentoKey) {
    const documentoRef = ref(database, `ForumarioDeEnvio/${userID}/${documentoKey}`);

    const publicoRef = ref(database, `Público/${documentoKey}`)

    // Excluir do Realtime Database
    remove(documentoRef)
    remove(publicoRef)
        .then(() => {
            console.log('Documento no Realtime Database deletado com sucesso.');
            
            // Agora, exclua o arquivo no Firebase Storage
            const storageRef1 = storageRef(storage, `arquivos/${userID}/${documentoKey}`);
            deleteObject(storageRef1)
                .then(() => {
                    console.log('Arquivo no Firebase Storage deletado com sucesso.');
                })
                .catch((error) => {
                    console.error('Erro ao deletar arquivo no Firebase Storage:', error);
                });

        })
        .catch((error) => {
            console.error('Erro ao deletar documento no Realtime Database:', error);
        });
}

// Função para puxar e exibir os dados do perfil do usuário
function exibirPerfilUsuario(userID) {
    // Referência ao nó do usuário no banco de dados
    const userRef = ref(database, 'usuarios/' + userID);

    // Observando as mudanças nos dados do usuário
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            // Atualizar os elementos HTML com os dados do usuário
            document.getElementById('nome1').textContent = userData.nome;
            document.getElementById('nome').textContent = userData.nome;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('criacao').textContent = userData.criacao;
        }
    });

    // Referência ao nó dos documentos do usuário no banco de dados
    const documentosRef = ref(database, 'ForumarioDeEnvio/' + userID);

    // Observando as mudanças nos dados dos documentos do usuário
    onValue(documentosRef, (snapshot) => {
        const documentosData = snapshot.val();
        if (documentosData) {
            // Limpar a tabela antes de adicionar novos dados
            document.getElementById('artigosTableBody').innerHTML = '';

            // Iterar sobre os documentos e criar linhas na tabela
            Object.keys(documentosData).forEach((documentoKey) => {
                const documento = documentosData[documentoKey];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${documento.titulo}</td>
                    <td>${documento.data}</td>
                `;
                const tdAcao = document.createElement('td');
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = 'Deletar';
                btnDeletar.classList.add('btn-deletar');
                btnDeletar.onclick = function() {
                    deletarDocumento(userID, documentoKey);
                };
                tdAcao.appendChild(btnDeletar);
                tr.appendChild(tdAcao);
                document.getElementById('artigosTableBody').appendChild(tr);
            });
        }
    });
}

// Verificar a autenticação do usuário
auth.onAuthStateChanged((user) => {
    if (user) {
        // Se o usuário estiver autenticado, exibir o perfil
        exibirPerfilUsuario(user.uid);
    } else {
        // Se o usuário não estiver autenticado, faça algo (por exemplo, redirecionar para a página de login)
        console.log("Usuário não autenticado");
    }
});