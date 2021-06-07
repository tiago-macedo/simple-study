import React from 'react';
import './Disciplina.css';

function Disciplina(props){

    return(
        <div className={props.feito ? "disciplina-feita" : "disciplina"}>
            {/* organizar a partir do props.periodo */}
            <p className="nome">{props.nome}</p>
            <p className="codigo">{props.codigo}</p>
            <p className="horario">{props.horario}</p>
        </div>
    )
}

export default Disciplina;
