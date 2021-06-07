import React, {useState, useEffect} from 'react';
import APIService from './APIService';

import Disciplina from './Disciplina'

const api = new APIService();

function Grade(props){
    const [list, setList] = useState([]);
    useEffect(() => {
        api.getClasses("teste@gmail.com").then( (l) => setList(l) );
    }, []);

    const disciplinas = {
        "MAB111": {
            "nome": "Fundamentos da Computação Digital",
            "horario": "60",
            "periodo": "1"
        },
        "MAB112": {
            "nome": "Sistemas de Informação",
            "horario": "60",
            "periodo": "1"
        },
        "MAB120": {
            "nome": "Computacao I (CC)",
            "horario": "90",
            "periodo": "1"
        },
        "MAB624": {
            "nome": "Números Inteiros Criptografia",
            "horario": "90",
            "periodo": "1"
        },
        "MAE111": {
            "nome": "Cálculo Infinitesimal I",
            "horario": "90",
            "periodo": "1"
        }
    }

    return (
        <div className="grade">
            {
                // list.map((code) => {
                Object.keys(disciplinas).map((code) => {
                    if (list.includes(code)) {
                        return <Disciplina nome={disciplinas[code].nome} codigo={code} Horario={disciplinas[code].horario} Periodo={disciplinas[code].periodo} feito />
                    }
                    return <Disciplina nome={disciplinas[code].nome} codigo={code} Horario={disciplinas[code].horario} Periodo={disciplinas[code].periodo} />
                })
            }
            {/* <Disciplina nome="Fund da Computação Digital" codigo="MAB111" Horario="60" Periodo="1" feito="True"/>
            <Disciplina nome="Sistemas de Informação" codigo="MAB112" Horario="60" Periodo="1"/>
            <Disciplina nome="Computacao I (CC)" codigo="MAB120" Horario="90" Periodo="1"/>
            <Disciplina nome="Números Inteiros Criptografia" codigo="MAB624" Horario="90" Periodo="1"/>
            <Disciplina nome="Cálculo Infinitesimal I" codigo="MAE111" Horario="90" Periodo="1"/>

            <Disciplina nome="Organização da Informação" codigo="MAB113" Horario="60" Periodo="2"/>
            <Disciplina nome="Computação II (CC)" codigo="MAB240" Horario="90" Periodo="2"/>
            <Disciplina nome="Circuitos Lógicos" codigo="MAB245" Horario="60" Periodo="2"/>
            <Disciplina nome="Matemática Combinatória" codigo="MAB352" Horario="60" Periodo="2"/>
            <Disciplina nome="Cálculo Integ e Diferencial II" codigo="MAE992" Horario="60" Periodo="2"/>

            <Disciplina nome="Mecânica, Oscilação e Ondas" codigo="FIW125" Horario="90" Periodo="3"/>
            <Disciplina nome="Álgebra Linear Algorítmica" codigo="MAB115" Horario="90" Periodo="3"/>
            <Disciplina nome="Estrutura dos Dados" codigo="MAB116" Horario="60" Periodo="3"/>
            <Disciplina nome="Linguagens Formais" codigo="MAB123" Horario="60" Periodo="3"/>
            <Disciplina nome="Computadores e Programação" codigo="MAB353" Horario="60" Periodo="3"/>
            <Disciplina nome="Cálculo Int e Diferencial III" codigo="MAE993" Horario="60" Periodo="3"/>

            <Disciplina nome="Eletromagnetismo e Ótica" codigo="FIW230" Horario="90" Periodo="4"/>
            <Disciplina nome="Computação Concorrente" codigo="MAB117" Horario="60" Periodo="4"/>
            <Disciplina nome="Cálculo Numérico (CC)" codigo="MAB230" Horario="60" Periodo="4"/>
            <Disciplina nome="Algoritmos e Grafos" codigo="MAB368" Horario="60" Periodo="4"/>
            <Disciplina nome="Cálculo Int e Diferencial IV" codigo="MAE994" Horario="60" Periodo="4"/>

            <Disciplina nome="Lógica" codigo="MAB236" Horario="60" Periodo="5"/>
            <Disciplina nome="Computadores e Sociedade" codigo="MAB354" Horario="60" Periodo="5"/>
            <Disciplina nome="Arquitetura de Computadores I" codigo="MAB355" Horario="60" Periodo="5"/>
            <Disciplina nome="Compiladores I" codigo="MAB471" Horario="60" Periodo="5"/>
            <Disciplina nome="Banco de Dados I" codigo="MAB489" Horario="60" Periodo="5"/>
            <Disciplina nome="Fund da Engenharia de Software" codigo="MAB533" Horario="60" Periodo="5"/>

            <Disciplina nome="Computação Gráfica I" codigo="MAB122" Horario="60" Periodo="6"/>
            <Disciplina nome="Programação Linear I" codigo="MAB232" Horario="60" Periodo="6"/>
            <Disciplina nome="Inteligência Artificial" codigo="MAB508" Horario="60" Periodo="6"/>
            <Disciplina nome="Estatística e Probabilidade" codigo="MAD243" Horario="60" Periodo="6"/>

            <Disciplina nome="Sistemas Operacionais I" codigo="MAB366" Horario="60" Periodo="7"/>
            <Disciplina nome="Avaliação e Desempenho" codigo="MAB515" Horario="60" Periodo="7"/>

            <Disciplina nome="Teleprocessamento e Redes" codigo="MAB510" Horario="60" Periodo="8"/> */}
        </div>
    )
}

export default Grade;
