import React from 'react';
import DisciplinaStyle from './DisciplinaStyle';

function Disciplina(props){

    return(
        <div className="disciplina">
            {/* organizar a partir do props.periodo */}
            <p className="nome">{props.nome}</p>
            <p className="codigo">{props.codigo}</p>
            <p className="horario">{props.horario}</p>
        </div>
    )
}

export default Disciplina;
