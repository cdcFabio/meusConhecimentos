import { Box, Button, Fade, makeStyles, Paper, Popper, Typography } from "@material-ui/core";
import React, { useContext, useRef, useState } from "react";
import EntradaTexto from "./EntradaTexto";
import SelecaoCategorias from "./SelecaoCategorias";
import PadraoCores from '../context/ContextoPadroes'


const useStyles = makeStyles ((theme) => ({
  root: {
    '& .MuiTextField-root': {
    
      width: '100%',
    },
  },
}));


export const FormularioCadastro = ({ categorias, adicionaConteudo }) => {

  const classes = useStyles();
  const {cores, relacao} = useContext(PadraoCores);
  const [novaCategoria, setNovaCategoria] = useState(false);
  const [conTeudoAtual, setConTeudoAtual] = useState({materia:'',titulo:'',resumo:'',exemplo:'',cor:''});
  const [popperOpen,setPopperOpen] = useState(false);
  const ancoraPopper = useRef(null);



  const _handleAdicionaMateria = (e) => {
    e.preventDefault();
    //cadastra a nova materia
    
    adicionaConteudo(conTeudoAtual);
    setNovaCategoria(false);
    setConTeudoAtual({materia:'',titulo:'',resumo:'',exemplo:'',cor:''});

  };

  const _handleAtualizaCampo = (e) => {
    e.stopPropagation();
    setConTeudoAtual({...conTeudoAtual, [e.target.name]:e.target.value});  
  };


    const _handleMudancaMateria = (e) => {
    e.stopPropagation();
   
       if(e.target.value === "nv-und" ){
         setNovaCategoria(true);
       }

       

       setConTeudoAtual({...conTeudoAtual,materia : e.target.value});    
  };

  const _handleSaiDaNovaCategoria = () => {
      setNovaCategoria(false)
  }

  return (
 
     <>
     
      <form
        className={classes.root}
        onSubmit={_handleAdicionaMateria}
        ref={ancoraPopper}
      >
        <Box
          m={1} 
          p={2} 
          bgcolor="#82ccdd"
          borderRadius={16}
          height='100%'
          
        >
        
        <Typography 
          variant="h3" 
          component="h1" 
          align="center"
          color="inherit"
        > 
          Cadastro
        </Typography>  

          
            <EntradaTexto
              nome="titulo"
              func={_handleAtualizaCampo}
              valor={conTeudoAtual.titulo}
            />
         
            <EntradaTexto
              nome="resumo"
              func={_handleAtualizaCampo}
              valor={conTeudoAtual.resumo}
            />
          
            <EntradaTexto 
              nome="exemplo"
              func={_handleAtualizaCampo}
              linhas="10"
              valor={conTeudoAtual.exemplo}
              
            />
         
            <SelecaoCategorias 
                  nome="categoria" 
                  ehNovaCategoria={novaCategoria} 
                  funcao={_handleMudancaMateria} 
                  categorias={categorias}
                  valor={conTeudoAtual.materia}
                  fecharCategoria={_handleSaiDaNovaCategoria}
            />
         
            <SelecaoCategorias 
                  nome='cor' 
                  funcao={_handleAtualizaCampo} 
                  categorias={Object.keys(cores)}
                  valor={conTeudoAtual.cor}
                  onFocus={(e)=>{
                    setPopperOpen(true)
                   }}
                
                 // onBlur={()=>{setPopperOpen(false)}}
                  />
         
         
              <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  type="submit" 
                  
                >
                  Cadastrar
                </Button>
          
            
                </Box>
               
          </form> 
          <Popper open={popperOpen} anchorEl={ancoraPopper?.current} placement={'left-end'} >
                   <Paper  >
                        
                          <ul>
                            {Object.keys(cores).map((valor,chave)=><li key={chave}>{valor+" - "+relacao[valor]+"  ."}</li>)}
                          </ul>
                        
                  </Paper>
                 </Popper>
        
          
     </>
      
    
  );
};
