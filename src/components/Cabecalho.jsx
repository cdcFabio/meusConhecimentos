import {
  AppBar,
  Drawer,
  fade,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";


const useStyles = makeStyles((theme) => ({
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

export const Cabecalho = ({ abreFormulario, funcFiltra }) => {
  
  const [state, setState] = useState(false);
  const classes = useStyles();

  



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
  };

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
                onChange={funcFiltra}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
      
      </div>
    </>
  );
};
