import { Box,  makeStyles,  TextField } from "@material-ui/core";
import React, { useContext } from "react";
import PadraoCores from "../context/ContextoPadroes";
import ReactHtmlParser from 'react-html-parser';


const useStyles = makeStyles ((theme) => ({
  exibir: {
   
		fontSize: '16px',
		fontFamily: 'arial'
  }
}));

export const ExibeTexto = ({ conteudo }) => {
  const padraoCores = useContext(PadraoCores);
  const classes = useStyles();
  
  const _trataLinks = (conteudo) => {
   
   var tratado = conteudo;
   let indice = 0;
    if (tratado.includes("http",indice)) {
        let reg = /http\S:\S*/gi;
        
        tratado = ReactHtmlParser(conteudo.replace(reg,' <a target="_blank" rel="noreferrer noopener" href="'+'$&'+'">'+'$&'+'</a> '));


    } 

        return tratado
    
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor={padraoCores.cores[conteudo.cor] + "50"}
      borderRadius={16}
      m={1}
      p={1}
     
      flexWrap="nowrap"
    >
      <Box m={1} display="flex" justifyContent="space-around">
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
          flexGrow={1}
          m={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Box m={1}>
             <TextField
            label="Titulo"
            value={conteudo.titulo}
            InputProps={{ readOnly: true }}
            fullWidth
            variant="outlined"
          />
          </Box>
         <Box m={1}>
            <TextField
            label="Resumo"
            value={conteudo.resumo}
            InputProps={{ readOnly: true }}
            fullWidth
            variant="outlined"
          />
         </Box>
         
        
        <Box 
            flexGrow={6} 
            m={1}
            p={2}
            bgcolor="#dfe6e9B0"
            borderRadius={20}
        >

            
         <pre
            width='auto'
            wrap='wrap'
            className={classes.exibir}
         >{_trataLinks(conteudo.exemplo)}
         </pre>
 
         {/* <TextField
            label="Exemplo"
            value= 
            variant="filled"
            multiline
            rows={25}
            InputProps={{ readOnly: true }}
            fullWidth
          />  */}


        </Box>
      </Box>
    </Box>
  );
};
