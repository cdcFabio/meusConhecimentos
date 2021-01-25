import { Box, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import PadraoCores from '../context/ContextoPadroes'




export const ExibeTexto = ({ conteudo }) => {

const padraoCores =useContext(PadraoCores);

  return (
    <Box
        display="flex"
        flexDirection="column"
        bgcolor={padraoCores.cores[conteudo.cor]+'50'}
        borderRadius={16}
        m={1}
        p={1}
        height='100%'
        flexWrap='nowrap'

    >
        <Box
            m={1}
            display='flex'
            justifyContent='space-around'        
        >
            <TextField
                label="Categoria"
                value={conteudo.materia}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
            />
           
        </Box>
        <Box
            display ='flex'
            flexDirection='column'
            justifyContent='space-around'
            height='100%'
        >
            <Box
                flexGrow={1}
                m={1}
                display='flex'
                flexDirection="column"
                justifyContent='space-around'
            >
                <TextField
                    label="Titulo"
                    value={conteudo.titulo}
                    InputProps={{ readOnly: true}}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Resumo"
                    value={conteudo.resumo}
                    InputProps={{readOnly: true}}
                    fullWidth
                    variant="outlined"      
                />
            </Box>
            <Box
                 flexGrow={3}
                 m={1}
            >

                <TextField
                    label="Exemplo"
                    value={conteudo.exemplo}
                    variant="filled"
                    multiline
                    rows={25}
                    InputProps={{readOnly: true}}
                    fullWidth
                />
            </Box>
      
        
        </Box>
    </Box>
  );
};
