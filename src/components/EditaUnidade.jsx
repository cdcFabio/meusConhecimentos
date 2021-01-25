import { Box, Button, FormGroup, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import EntradaTexto from './EntradaTexto';
import SelecaoCategorias from './SelecaoCategorias';
import CloseIcon from '@material-ui/icons/Close';
import PadraoCores from '../context/ContextoPadroes'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        
        width: '100%',
        height:'100%',
       
        
      },
    },
  }));



export const EditaUnidade = ({conteudo,atualizaConteudo,categorias}) => {

const padraoCores = useContext(PadraoCores);



const classes = useStyles();

const [novaCategoria, setNovaCategoria] = useState(false);
const [materiaEditada,setMateriaEditada]= useState(conteudo);

const _handleAtualizaTitulo = (e) => {
    e.stopPropagation();
    setMateriaEditada({...materiaEditada,titulo:e.target.value})

}

const _handleAtualizaResumo = (e) => {
    e.stopPropagation();
    setMateriaEditada({...materiaEditada,resumo:e.target.value})

}

const _handleAtualizaExemplo = (e) => {
    e.stopPropagation();
    setMateriaEditada({...materiaEditada,exemplo:e.target.value})

}

const _handleAtualizaCategoria = (e) => {

    e.stopPropagation();
    
    if(e.target.selectedIndex === 1 ){
     setNovaCategoria(true);
    }

    setMateriaEditada({...materiaEditada,materia:e.target.value});  
}

const _handleAtualizaCor = (e) => {

    e.stopPropagation();
    

    setMateriaEditada({...materiaEditada,cor:e.target.value});  
}

const cancelaEdicao = () => {
    atualizaConteudo(conteudo);
}

    return (

        
            <Box
               
                m={1} 
                p={2} 
                flexGrow={1}
                bgcolor="#82ccdd"
                borderRadius={16}
               
                
                //materiaEditada.cor
             >
                 <Box display='flex' justifyContent='flex-end'>
                         <Button onClick={cancelaEdicao} ><CloseIcon color="disabled"/></Button>
                 </Box>
                <FormGroup className={classes.root} >
                    <Box
                        display="flex" 
                        flexDirection="column" 
                        m={1} 
                        p={2} 
                        bgcolor={padraoCores.cores[materiaEditada.cor]}
                        borderRadius={16}
                        
                        //materiaEditada.cor
        
                     >
                    <EntradaTexto
                        nome="Titulo"
                        func={_handleAtualizaTitulo}
                        valor={materiaEditada.titulo}
                    />
            
                
                    <EntradaTexto
                        nome="Resumo"
                        func={_handleAtualizaResumo}
                        valor={materiaEditada.resumo}
                    />
                
            
                    <EntradaTexto 
                        nome="exemplo"
                        func={_handleAtualizaExemplo}
                        valor={materiaEditada.exemplo}
                        linhas="10"
                    />     
                    <SelecaoCategorias 
                        nome="categoria" 
                        ehNovaCategoria={novaCategoria} 
                        funcao={_handleAtualizaCategoria} 
                        categorias={categorias} 
                        valor={materiaEditada.materia}
                    />
                    
                    <SelecaoCategorias 
                        nome="cor" 
                        funcao={_handleAtualizaCor} 
                        categorias={Object.keys(padraoCores.cores)} 
                        valor={materiaEditada.cor}
                    />
                    <Box m={1}>
                         <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={()=>{atualizaConteudo(materiaEditada)}}
                            fullWidth 
                         >
                          Salvar
                        </Button>
                    </Box>
                   
                    </Box>

                </FormGroup>
            </Box>
            
        
    )

} 