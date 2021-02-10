import { Box, Button, Input } from '@material-ui/core';
import React, { useState } from 'react';

export const CarregaArquivo = ({carregaLista}) =>{

const [arquivoSelecionado,setArquivoSelecionado] = useState();


const changeHandle = (e) =>{
    setArquivoSelecionado(e.target.files[0]);
    
}

const handleClick = async() => {

    let resultado = JSON.parse(await arquivoSelecionado.text())
    carregaLista(resultado);

  //  console.log(resultado);
}

    return(
        <Box
            m={1}
            p={1}
            justifyContent='space-between'
            alignContent='center'
            display='flex'
           
        >
            <Input
                type='file'
                name='file'
                onChange={changeHandle}
                inputProps={{accept:".txt"}}
                
            />
            <Button
                color="primary"
                variant="contained"
                onClick={handleClick} 
            >
                Carregar
            </Button>
        </Box>
        )
}