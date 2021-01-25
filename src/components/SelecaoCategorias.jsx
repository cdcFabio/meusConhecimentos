import { Box, Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import EntradaTexto from './EntradaTexto';
import CloseIcon from '@material-ui/icons/Close';

  

const SelecaoCategorias = ({ehNovaCategoria,funcao,categorias,valor,nome,fecharCategoria, ...rest}) => {
    

  if (ehNovaCategoria) {
    return (
      <Box display='flex' >
        <Box flexGrow='1'>
          <EntradaTexto name="..." classe="caixa" func={funcao} />
        </Box>
        
        <Button onClick={fecharCategoria} ><CloseIcon/></Button>
      </Box>
    );
  } else {
    return (
      
      
      <Box bgcolor="#ffffff" m={1} p={1} borderRadius={10} >
            <InputLabel id="seletor-label">{nome}</InputLabel>
              <Select
                  labelId="seletor-label"
                  onChange={funcao} 
                  value={valor}
                  name={nome}
                  id="seletor"
                  fullWidth
                  required
                
              >
              
              <MenuItem 
                value="nv-und"
                {...rest}
              >Adicionar..</MenuItem>
              {categorias && categorias.map((categoria, index) => {
                  return (
                    <MenuItem 
                      key={index} 
                      id={categoria} 
                      value={categoria}
                      >
                      {categoria}
                    </MenuItem>
                  );
                })
              }
              </Select>
        </Box>
      
      
    
    );
}

}

export default SelecaoCategorias;