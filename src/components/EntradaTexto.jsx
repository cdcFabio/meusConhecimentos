import { Box, TextField } from '@material-ui/core';
import React from 'react';


const EntradaTexto = ({nome,func,valor,linhas,...rest}) =>{

    if(linhas)
    {return(
        <Box bgcolor="#ffffff" m={1} p={1} borderRadius={10} >
            <TextField
                name={nome}
                label={nome}
                onChange={func}
                required
                fullWidth
                value={valor}       
                multiline
               rows={linhas}
               {...rest}
            />
        </Box>)
    }
    return(
        <Box bgcolor="#ffffff" m={1} p={1} borderRadius={10} >
            <TextField
                name={nome}
                label={nome}
                onChange={func}
                required    
                value={valor}
                fullWidth
                {...rest}
            />
        </Box>
        
    )
}

export default EntradaTexto;