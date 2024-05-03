import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

var fileInput = document.getElementById('pdfFile')

var ref = firebase.storage().ref('arquivos')

fileInput.onchange = function(event){
    var arquivo = event.target.files[0];

    ref.child('arquivo').put(arquivo).then(snapshot =>{
        console.log('snapshot', snapshot);
        ref.child('arquivo').getDownloadURL().then(url => {
            console.log('string para download',url)
        })
    });
}