import { createContext } from 'react';

const CoresContext = createContext();

export const relacao = {
    Amarelo: 'Elementos',
    Azul: 'Funções',
    Verde: 'Links',
    Vermelho:'A estudar'
}

export const cores = {
    Amarelo:"#ffeaa7",
    Azul: "#74b9ff",
    Verde : "#00cec9",
    Vermelho: "#ff7675"
}

export default CoresContext;
  