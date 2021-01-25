import {
  Box,
  Divider,
  Fab,
  makeStyles,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import PadraoCores from "../context/ContextoPadroes"
import { memo, useContext } from "react";


const useStyles = makeStyles((theme) => ({
  margin: {
    transform: "scale(0.8)",
  },
}));

const CardEstudos = ({ entrada, remove, edita, exibe }) => {
  
const {cores} =  useContext(PadraoCores);
const classes = useStyles();

  return (
    <Box
      m={0.5}
      p={1.5}
      borderRadius={10}
      bgcolor={cores[entrada.cor]}
      display="flex"
      flexDirection="column"
      //caixa da materia
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        minWidth="100px"

        //caixa icones
      >
        <Fab
          color="primary"
          aria-label="edit"
          size="small"
          className={classes.margin}
          onClick={() => edita(entrada)}
        >
          <EditIcon />
        </Fab>
        <Fab
         
          aria-label="remove"
          size="small"
          className={classes.margin}
          onClick={() => remove(entrada)}
        >
          <Delete />
        </Fab>
      </Box>
      <div style={{ width: "8rem", whiteSpace: "nowrap" }}>
        <Box
          component="div"
          my={2}
          textOverflow="ellipsis"
          overflow="hidden"
          onClick={() => {
            exibe(entrada);
          }}
        >
          <Typography variant="h6">{entrada.titulo}</Typography>
          <Divider />
          <Typography variant="subtitle1">{entrada.resumo}</Typography>
          <Divider />

          <Typography variant="subtitle2" gutterBottom>
            {entrada.exemplo}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default memo(CardEstudos);
