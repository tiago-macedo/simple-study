import React, {useState} from 'react';
import APIService from './APIService';
import { useHistory } from "react-router-dom";
import './App.css'
import NavBar from './NavBar';

function SignUp()
{
    const history = useHistory();
    const [access, setAccess] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [tipo, setTipo] = useState("Aluno");

    const api = new APIService();

    const enter = async () => 
    {
        if (!email || !password)
        {
            window.alert("Insert credentials before");

            return;
        }

        let iStudent = tipo === "Aluno" ? true : false;

        const res = await api.signUp(email, password, iStudent);

        if(res)
        {
            window.alert("Sign up Succeeded");
            history.push("home");
        }
        else
        {
            window.alert("Sign up Failed");
        }
        
        setAccess(true)
    }

    function getEmail(email)
    {
        setEmail(email.target.value)
    }

    function getSenha(senha)
    {
        setPassword(senha.target.value)
    }

    function getTipo(tipo)
    {
        setTipo(tipo.target.value)
    }

    return(
        <div>
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
        </div>
    );
}

export default SignUp;
