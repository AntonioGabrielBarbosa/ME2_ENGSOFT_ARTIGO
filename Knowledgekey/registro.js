import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, nome, email, senha, dataNascimento){

    const db = getDatabase();
    set(ref(db, 'users/' + userId), {

        dataNascimento: dataNascimento,
        email: email,
        nome: nome,
        senha: senha,
    });

}