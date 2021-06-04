import React, {useState} from 'react';
import './App.css'

function LogIn(){
    const [access, setAccess] = useState(false);
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)

    const enter = () => {
        setAccess(true)
    }

    function getEmail(email){
        setEmail(email.target.value)
    }

    function getSenha(senha){
        setSenha(senha.target.value)
    }

    return(
        <div className="login">
            <h2>Acesse sua conta</h2>
            <h3>E-mail</h3>
            <input type="text" onChange={getEmail} />
            <h3>Senha</h3>
            <input type="text" onChange={getSenha} />
            <button onClick={enter}>Acessar</button>
        </div>
    );
}

export default LogIn;