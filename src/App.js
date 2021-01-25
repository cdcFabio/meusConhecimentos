import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Cabecalho, FormularioCadastro, MuralDeEstudos, Rodape } from "./components";
import { EditaUnidade } from "./components/EditaUnidade";
import controle from './controller/Controller'

import { Box, Button, Container, Drawer, makeStyles, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ContextoPadroes, { cores, relacao } from './context/ContextoPadroes';

const drawerWidth = '28%';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

}));


function App() {

/***************************HOOKS*********************************************/  

const classes = useStyles();

const [materiasCarregadas,setMateriasCarregadas] = useState([]);
const [categoriasAtuais,setCategoriasAtuais] = useState([]);
const [edicao,setEdicao] = useState(false);
const [abrirNotificacao,setAbrirNotificacao] = useState(false);
const [abrirFormularioCadastro,setAbrirFormularioCadastro] = useState(false);


 const categoriaAberta = useRef(null);
 const mensagem = useRef('mensagem padrão');
 const statusMensagem = useRef('sucess');
 const conteudoEditado = useRef();
 const conteudoDrawer = useRef();


 useEffect(() => {
    carregaMaterias();
    document.title = "Conhecimentos"
  },[])

 useEffect(() => { 
    atualizaCategorias()   // eslint-disable-next-line 
  },[materiasCarregadas]); 
  
/******************************************************************************* */

/********************************Controle snackbar****************************** */
const _handleFecharNotificacao = (event,reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setAbrirNotificacao(false);
}

const _handleAbrirMensagem = (mens,status) =>{
    mensagem.current = mens;
    statusMensagem.current = status;
    setAbrirNotificacao(true);
}
 /******************************************************************************* */


/************Acessa uma base de dados e carrega assim que disponível************ */
async function carregaMaterias() {
    let transacao= await controle.CarregaDoBanco();
    setMateriasCarregadas(transacao); 
}

/************************Atualiza a lista de categorias disponíveis************* */
const atualizaCategorias = () =>{
    let valores = [];
    if(materiasCarregadas) {
        materiasCarregadas
            .forEach(unidade =>
              {unidade && ((valores.indexOf(unidade.materia)===-1) && valores.push(unidade.materia))}) 
    }
    if(valores)
      setCategoriasAtuais(valores)
}


/******************Adiciona novo conteudo no banco e recarrega***************** */
 async function adicionaNovoConteudo(conteudo) {
   
    let idRetornado = await controle.AdicionaMateria(conteudo);
    let resultado = {...conteudo,id:idRetornado};
    categoriaAberta.current = conteudo.materia;
    
    setMateriasCarregadas([...materiasCarregadas,resultado]); 
    atualizaCategorias();
    _handleAbrirMensagem("Adicionada com sucesso","sucess");   
  }

/*********************Abre a Janela de edição********************************* */
const alteraConteudo = (conteudo) => {
    conteudoEditado.current = conteudo;
    categoriaAberta.current = conteudo.materia;
    setEdicao(true);
}

/*******************Atualiza materia editada no banco************************* */
const _atualizaMateria = (conteudo) => {

   setEdicao(false);

    if(materiasCarregadas.some((atual)=>JSON.stringify(atual)===JSON.stringify(conteudo)))
          return;

    controle.AlteraMateria(conteudo);
    let materiasAtualizadas = materiasCarregadas.map(
                (atual) => {
                       if(atual.id===conteudo.id)
                         return(conteudo) ;
                        
                         return(atual) ;    
                      })
    
    setMateriasCarregadas(materiasAtualizadas);
   
}

/*****************Remove um conteudo do banco********************************* */
const removeConteudo = (conteudo) => {
    controle.RemoveMateria(conteudo);
    let novoVetor = materiasCarregadas.filter((atual) => atual.id !== conteudo.id);
    setMateriasCarregadas(novoVetor);
}

/*******************Altera nome da Categoria*********************************** */
async function _alteraNomeCategoria(nomeAnterior,novoNome){
    let listaAtualizada = materiasCarregadas
                              .filter((atual)=>{if(atual.materia === nomeAnterior){return(true)}else{return(false)}})
                              .map((atual)=>{
                                  return ({...atual,materia:novoNome})
                              })

    await listaAtualizada.forEach((item)=> controle.AlteraMateria(item));

    listaAtualizada = materiasCarregadas.map((atual)=>{
      if(atual.materia === nomeAnterior)
        {return ({...atual,materia:novoNome})}
       return atual;
    })

    setMateriasCarregadas(listaAtualizada);
}

  var ladoEsquerdo = (!edicao) ?
  
     <MuralDeEstudos 
          materias={materiasCarregadas} 
          categorias={categoriasAtuais} 
          edita={alteraConteudo}  
          remove={removeConteudo}
          funcAlteraCategoria={_alteraNomeCategoria}
          atual={categoriaAberta.current}
      />
    :
     <EditaUnidade 
          conteudo={conteudoEditado.current} 
          categorias={categoriasAtuais} 
          atualizaConteudo={_atualizaMateria}
      />
  

      conteudoDrawer.current = (abrirFormularioCadastro===true) 
      ?  <>
          <Box
            display='flex'
            justifyContent='flex-end'
          >
            <Button onClick={()=>{setAbrirFormularioCadastro(false)}}>
                <CloseIcon/>
            </Button>
          </Box>
  
          <FormularioCadastro categorias = {categoriasAtuais}  adicionaConteudo={adicionaNovoConteudo}/>
        </>
      :
      <>nada</>

  return (
    <>
      <ContextoPadroes.Provider value ={{cores,relacao}}>
            <Cabecalho abreFormulario={()=>{ setAbrirFormularioCadastro(true);}}/>
            
            <Container component="article"  maxWidth="md" > 
                <Box 
                    display="flex" 
                    flexDirection="row" 
                    m={1} 
                    p={1} 
                >
                    {ladoEsquerdo}      
                </Box>
                <Rodape />
            </Container>  



        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={abrirFormularioCadastro}
          classes={{
            paper: classes.drawerPaper,
          }}
        >  
           {conteudoDrawer.current}
  
        </Drawer>

        <Snackbar open={abrirNotificacao} autoHideDuration={1000} onClose={_handleFecharNotificacao} message={mensagem.current}/>
      
      </ContextoPadroes.Provider>
    
    </>
  );
}

export default App;
