import { getDatabase, ref, set } from "firebase/database";

function writeUserData(nome, email, senha, dataNascimento){

    const db = getDatabase();
    set(ref(db, 'users/' + email), {

        dataNascimento: dataNascimento,
        email: email,
        nome: nome,
        senha: senha,
    });

}