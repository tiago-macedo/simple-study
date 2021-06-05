import React, {useState} from 'react';
import './App.css'

function SignUp(){
    const [access, setAccess] = useState(false);
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)
    const [tipo, setTipo] = useState("Aluno")

    const enter = () => {
        setAccess(true)
    }

    function getEmail(email){
        setEmail(email.target.value)
    }

    function getSenha(senha){
        setSenha(senha.target.value)
    }

    function getTipo(tipo){
        setTipo(tipo.target.value)
    }

    return(
        <div className="login">
            <h3>Registre sua conta</h3>
            <h4>E-mail:</h4>
            <input type="text" onChange={getEmail} />
            <h4>Senha:</h4>
            <input type="text" onChange={getSenha} />
            <h4>Tipo de conta:</h4>
            <select onChange={getTipo} value={tipo}>
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
            </select>
            <button onClick={enter}>Registrar</button>
        </div>
    );
}

export default SignUp;