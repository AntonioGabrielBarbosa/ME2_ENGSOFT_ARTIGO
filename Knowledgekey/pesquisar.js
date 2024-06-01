import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const storage = getStorage(app);

// Function to search files based on input and selected filter
async function searchFiles(query, filter) {
    const listRef = ref(storage, 'arquivos/'); // Certifique-se de que o caminho seja correto
    try {
        const res = await listAll(listRef);
        const results = [];

        for (const itemRef of res.items) {
            const url = await getDownloadURL(itemRef);
            const itemName = itemRef.name.toLowerCase();

            // Check if the item matches the query and the filter
            if ((query === '' || itemName.includes(query.toLowerCase())) &&
                (filter === 'all' || (filter === 'pdf' && itemName.endsWith('.pdf')))) { // Verifica se é um PDF
                results.push({ name: itemRef.name, url });
            }
        }

        displayResults(results);
    } catch (error) {
        console.error("Error searching files:", error);
    }
}

// Function to display search results
function displayResults(results) {
    const resultadosBusca = document.getElementById('resultadosBusca');
    resultadosBusca.innerHTML = '';

    if (results.length === 0) {
        resultadosBusca.innerHTML = '<p>No results found</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<a href="${result.url}" target="_blank">${result.name}</a>`;
            resultadosBusca.appendChild(resultItem);
        });
    }
}

// Event listener for search button
document.getElementById('botaoPesquisar').addEventListener('click', () => {
    const query = document.getElementById('pesquisar').value;
    const filter = document.getElementById('filterSelect').value;
    searchFiles(query, filter);
});
