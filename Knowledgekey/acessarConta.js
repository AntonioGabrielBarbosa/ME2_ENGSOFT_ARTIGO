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
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Função para deletar um documento
function deletarDocumento(userID, documentoKey) {
    const documentoRef = ref(database, `ForumarioDeEnvio/${userID}/${documentoKey}`);
    const publicoRef = ref(database, `Público/${documentoKey}`);

    // Excluir do Realtime Database
    remove(documentoRef);
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

// Função para exibir o perfil do usuário e os artigos
function exibirPerfilUsuario(userID) {
    const userRef = ref(database, 'usuarios/' + userID);

    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            document.getElementById('nome1').textContent = userData.nome;
            document.getElementById('nome').textContent = userData.nome;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('criacao').textContent = userData.criacao;
        }
    });

    const documentosRef = ref(database, 'ForumarioDeEnvio/' + userID);

    onValue(documentosRef, (snapshot) => {
        const documentosData = snapshot.val();
        if (documentosData) {
            document.getElementById('artigosTableBody').innerHTML = '';

            Object.keys(documentosData).forEach((documentoKey) => {
                const documento = documentosData[documentoKey];
                const tr = document.createElement('tr');
                const dataCriacao = new Date(documento.Horario).toLocaleString(); // Convertendo para data e hora

                tr.innerHTML = `
                    <td>${documento.Titulo}</td>
                    <td>${dataCriacao}</td>
                `;
                const tdAcao = document.createElement('td');

                const btnDeletar = document.createElement('button');
                const imgLixeira = document.createElement('img');
                imgLixeira.src = 'delete.png';
                imgLixeira.alt = 'Deletar';
                imgLixeira.classList.add('icone-lixeira');
                btnDeletar.classList.add('btn-deletar');
                btnDeletar.onclick = function() {
                    deletarDocumento(userID, documentoKey);
                };
                btnDeletar.appendChild(imgLixeira);

                const btnEditar = document.createElement('button');
                const imgEditar = document.createElement('img');
                imgEditar.src = 'edit.png';
                imgEditar.alt = 'Editar';
                imgEditar.classList.add('icone-editar');
                btnEditar.classList.add('btn-editar');
                btnEditar.onclick = function() {
                    editarDocumento(userID, documentoKey);
                };
                btnEditar.appendChild(imgEditar);

                tdAcao.appendChild(btnDeletar);
                tdAcao.appendChild(btnEditar);
                tr.appendChild(tdAcao);
                document.getElementById('artigosTableBody').appendChild(tr);
            });
        }
    });
}

// Função de edição de documento (a ser implementada)
function editarDocumento(userID, documentoKey) {
    console.log('Editar documento:', userID, documentoKey);
}

// Verificar a autenticação do usuário
auth.onAuthStateChanged((user) => {
    if (user) {
        exibirPerfilUsuario(user.uid);
    } else {
        console.log("Usuário não autenticado");
    }
});
