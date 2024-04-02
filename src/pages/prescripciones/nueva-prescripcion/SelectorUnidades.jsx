import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import "dayjs/locale/en-gb";
import { useEffect } from "react";



export function SelectorUnidades({idDroga, selectorUnidades}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [unidades, setUnidades] = React.useState(null);
  const [IdFormulario, setIdFormulario] = React.useState(null);

  useEffect(() => {
    selectorUnidades(IdFormulario)
  }, [IdFormulario]);

  React.useEffect( () => {
    let active = true;
  
    
    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const data = await fetch("http://localhost:4000/vademecum/unidades/"+idDroga);
        const dataJson = await data.json();
        setOptions([...dataJson]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (   
            
              <Autocomplete
                id="Unidad"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.Unidad === value.Unidad
                }
                getOptionLabel={(option) => option.Unidad }
                options={options}
                loading={loading}
                
                disabled={idDroga ? false : true}
                onChange={(event, value) => {
                    if(value=== null){
                        value = []
                    }
                    setUnidades(value.Unidad);
                    setIdFormulario(value.Id)
                
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.Id}>                    
                    {option.Unidad}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Unidad" />
                )}
              />
           
           
  );
}
