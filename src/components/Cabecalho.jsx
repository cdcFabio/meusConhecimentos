import {
  AppBar,
  Box,
  Drawer,
  fade,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useRef, useState } from "react";
import { CarregaArquivo } from "./CarregaArquivo";



const useStyles = makeStyles((theme) => ({
  modal : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
  paper: {
    //width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
 
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  filtro:{
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    color: theme.palette.common.white,
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    textAlign: 'center',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

/***************************Inicio do componente*************************************** */

export const Cabecalho = ({ abreFormulario, exporta, funcCarregaLista, funcFiltra }) => {
  
  const [state, setState] = useState(false);
  const [modalAberto,setModalAberto] = useState(false);
  const classes = useStyles();
  const [selecaoPadrao,setSelecaoPadrao] = useState('titulo');
  const buscaAtual =useRef('');


 
  const campoBusca = selecaoPadrao==='cor'?
  <Select
        onChange={(e)=>{funcFiltra(e.target.value,selecaoPadrao)}}
        fullWidth
        required
        className={classes.filtro}
    >
    {["azul","amarelo","verde","vermelho"].map((categoria, index) => {
        return (
          <MenuItem 
            key={index} 
            value={categoria}
            >
            {categoria}
          </MenuItem>
        );
      })
    }
    </Select>


  :
  <div className={classes.search}>
  <div className={classes.searchIcon}>
    <SearchIcon />
  </div>

  <InputBase
    placeholder="Buscar..."
    classes={{
      root: classes.inputRoot,
      input: classes.inputInput,
    }}
    value={buscaAtual.current}
    onChange={(e)=>{
      buscaAtual.current  = e.target.value;
      funcFiltra(e.target.value,selecaoPadrao)}}
    inputProps={{ "aria-label": "search" }}
  />
</div>



  const toogleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "Keydown" &&
      (event.key === "Tab" || event.key === "shift")
    ) {
      return;
    }

    setState(open);
  };

  const _handleClicaMenu = (nome) => {
    if (nome === "Novo") {
      abreFormulario();
    }
    if(nome === "exportar"){
      exporta();
    }
    if(nome === "importar"){
      setModalAberto(true);
    }
  };

  const _handleFechamento = () => {
    setModalAberto(false);
  }

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toogleDrawer(false)}
      onKeyDown={toogleDrawer(false)}
    >
      <List>
        {["Novo", "exportar", "importar"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              _handleClicaMenu(text);
            }}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toogleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={state} onClose={toogleDrawer(false)}>
              {list}
            </Drawer>
            <Typography className={classes.title} variant="h6" noWrap>
              Conhecimentos
            </Typography>
            <Box
              display='flex'
              
            >

            
            <Select
                  labelId="seletor-label"
                  onChange={(e)=>{
                    selecaoPadrao==='cor' && (buscaAtual.current='')
                    e.target.value === 'cor' ? funcFiltra('',e.target.value) : funcFiltra(buscaAtual.current,e.target.value)
                    setSelecaoPadrao(e.target.value)

                    
                  
                  }} 
                  value={selecaoPadrao}
                  fullWidth
                  required
                  className={classes.filtro}
              >
              {["titulo","resumo","exemplo",'cor'].map((categoria, index) => {
                  return (
                    <MenuItem 
                      key={index} 
                      value={categoria}
                      >
                      {categoria}
                    </MenuItem>
                  );
                })
              }
              </Select>

            {campoBusca}
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      
      </div>
          
    <Modal
      className={classes.modal}
      open={modalAberto}
      onClose={_handleFechamento}
      aria-labelledby="titulo-modal"
      aria-describedby="descricao-modal"
      
    >
     
        <div className={classes.paper} >
                <CarregaArquivo carregaLista={funcCarregaLista}/>
        </div>
     

    </Modal>
    </>
  );
};
