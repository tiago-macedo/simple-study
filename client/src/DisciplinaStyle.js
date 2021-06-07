import { css } from "styled-components"

export const DisciplinaStyle = css`
.disciplina {
    background-color: ${props => props.feito ? "white" : "grey" };
}
`;
