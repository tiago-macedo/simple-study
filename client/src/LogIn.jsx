import React, {useState} from 'react';
import APIService from "./APIService";
import './App.css'

function LogIn()
{
    const [access, setAccess] = useState(false);
    const [email, setEmail] = useState(null)
    const [password, setPwd] = useState(null)

    const api = new APIService();

    const enter = async () => 
    {
        if (!email || !password)
        {
            window.alert("Insert credentials before");

            return;
        }

        const res = await api.signIn(email, password);

        if(res)
        {
            window.alert("Success");
        }
        else
        {
            window.alert("Failed");
        }

        setAccess(true)
    }

    function getEmail(email)
    {

        setEmail(email.target.value)
    }

    function getPwd(senha)
    {
        setPwd(senha.target.value)
    }

    return(
        <div className="login">
            
            <h3>Acesse sua conta</h3>

            <h4>E-mail:</h4>

            <input type="text" onChange={getEmail} />

            <h4>Senha:</h4>

            <input type="text" onChange={getPwd} />

            <button onClick={enter}>Acessar</button>

        </div>
    );
}

export default LogIn;