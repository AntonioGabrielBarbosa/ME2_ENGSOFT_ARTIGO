// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6yHr-xIuuga9isPeLnUoyh2578Ts3W0Y",
  authDomain: "knowledgekey-6cbe7.firebaseapp.com",
  databaseURL: "https://knowledgekey-6cbe7-default-rtdb.firebaseio.com",
  projectId: "knowledgekey-6cbe7",
  storageBucket: "knowledgekey-6cbe7.appspot.com",
  messagingSenderId: "753129151747",
  appId: "1:753129151747:web:472445c8d2cd1b4e459d36",
  measurementId: "G-MMLQV2HD6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const email = document.getElementById('email').value
const nome= document.getElementById('nome').value
const senha= document.getElementById('senha').value
const confirme= document.getElementById('confirme').value
const data = document.getElementById('data').value

const butao = document.getElementById('butao');
butao.addEventListener("click", function(event){
    event.preventDefault()
    alert(5)
})

if (validate_email(email)== false || validate_senha(senha) ==false ){
    alert('Email ou senha indevidos')
    return
}

if(validate_field(nome)==false ||validate_field(data)==false){
    alert('Nome ou data indevidos')
    return
}

if(senha != confirme){
    alert('As senhas devem ser iguais')
    return
}

auth.criarUserEmailSenha(email,senha)
.then(function(){

    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
        email:email,
        nome:nome,
        data:data,
        senha:senha,
        ultimo_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Usuário criado!!!')
})
.catch(function(error){
    var error_code = error.code
    var error_message = error.message

    alert(eror_message)
})




function validate_email(email){
    expression =/^[^@]+@\w+(\.\w+)+\w$/.test(str);
    if( expression.test(email) == true){
        return true;
    }else{
        return false;
    }
}

function validate_senha(senha){
    if(senha < 6){
        return false
    }else{
        return true
    }
}

function validate_field(){
    if(field == null){
        return false
    }

    if(field.length <= 0){
        return false
    }

    else{
        return true
    }
}