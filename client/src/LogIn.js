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
            <h3>Acesse sua conta</h3>
            <h4>E-mail:</h4>
            <input type="text" onChange={getEmail} />
            <h4>Senha:</h4>
            <input type="text" onChange={getSenha} />
            <button onClick={enter}>Acessar</button>
        </div>
    );
}

export default LogIn;