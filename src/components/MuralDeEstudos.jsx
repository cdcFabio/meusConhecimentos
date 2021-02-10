import { Accordion,   Box, Button, Fab,  makeStyles, Modal, Typography, withStyles } from '@material-ui/core';
import React, {  useEffect, useRef, useState } from 'react';
import CardEstudos from './CardEstudos';
import EntradaTexto from './EntradaTexto';
import EditIcon from '@material-ui/icons/Edit';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ExibeTexto } from './ExibeTexto';


const AccordionSummary = withStyles({
    root: {
      backgroundColor: '#82ccdd',
      
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
        
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {
        backgroundColor: "#B0F1FF",
        
    },
  })(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: "#B0F1FF",
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    modal : {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     
   //   width: '50%',
     
      
      height: 'auto',
    },
    paper: {
     // position: 'relative',
     // top:'10%',
     // left:'25%',
      width: '50%',
      height: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: 'auto'
    },
  }));

export const MuralDeEstudos = ({materias, categorias, edita, remove,funcAlteraCategoria,atual}) => {

const [modalAberto,setModalAberto] = useState(false);
const [editaCategoria,setEditaCategoria]= useState({nome:'',estaEditando:false, novoNome:''}) 
const [expanded, setExpanded] = useState();
const abertoModal = useRef();


const classes = useStyles();

useEffect(()=>{

  setExpanded(atual);
},[atual])

/* useEffect(()=>{

  console.log("Mural Renderizado");
}) */

const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false); 
  };

const _handleAlteraTexto = (e) =>{
    e.stopPropagation();
    setEditaCategoria({...editaCategoria,novoNome:e.target.value})
}

const _handleAbreCard = (conteudo) => {

  abertoModal.current = conteudo;
  setModalAberto(true);

}

const _handleFechamento = () => {
  setModalAberto(false);
}

const campoCategoria = (categoria) =>{
    
    if(editaCategoria.estaEditando)
      {if(editaCategoria.nome===categoria)
          {return (<Box display='flex'>         
                      <Box flexGrow='1'> 
                          <EntradaTexto 
                              valor={editaCategoria.novoNome}
                              func={_handleAlteraTexto}
                          />
                      </Box>
                      
                      <Button 
                          onClick = {(e)=>{
                              e.preventDefault();
                              funcAlteraCategoria(editaCategoria.nome,editaCategoria.novoNome)
                              setEditaCategoria({...editaCategoria,estaEditando:false})
                          }}    
                      > 
                        OK
                      </Button>
                    </Box>)}}
    return(
            <Box
                display="flex"
                justifyContent= "space-between"              
            >
                <Typography variant="h5" >
                    {categoria}
                </Typography> 
        
                <Fab
                    color="primary" 
                    aria-label="edit"
                    size='small'
                    onClick={() =>{setEditaCategoria({nome:categoria,estaEditando:true,novoNome:categoria})}}
                >
                <EditIcon />
                
                </Fab>
            </Box>
    )

    }


    return (
        
       <Box
            display="flex" 
            flexDirection="column" 
            m={1} 
            p={1} 
            flexGrow={1}
            bgcolor="#82ccdd"
            borderRadius={16}
            
            
       >
          {categorias ? categorias.map((categoria, index) => {
              return (
                  <Box key={index}
                    //caixa esquerda 
                  >  
                    <Accordion square expanded={expanded === categoria} onChange={handleChange(categoria)} >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                            <Box
                                m={1} 
                                p={1.5}  
                                borderRadius={16}   
                                bgcolor="#60a3bc"
                                width= "100%"
                                //caixa do titulo
                            >
                                {campoCategoria(categoria)}
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box 
                                m={1} 
                                display="flex" 
                                flexDirection="row" 
                                flexWrap="wrap"
                                //caixa da Materia
                            >
                                {materias.filter(valor => {return valor.materia === categoria})
                                          .map((valor, chave) => {
                               
                                    return <CardEstudos entrada={valor} remove={remove} edita={edita} key={chave} exibe={_handleAbreCard}/>;
                                
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                  </Box>
              );
           }): <>Nada a carregar</> }
    
    <Modal
      className={classes.modal}
      open={modalAberto}
      onClose={_handleFechamento}
      aria-labelledby="titulo-modal"
      aria-describedby="descricao-modal"
      
    >
     
        <div  className={classes.paper}>
          <ExibeTexto conteudo={abertoModal.current}/>
        </div>
     

    </Modal>


    </Box>
    
            
            
       
            
   
  
  
    );
  };
  