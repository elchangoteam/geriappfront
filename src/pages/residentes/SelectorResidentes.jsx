import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

export function SelectorResidentes({ residenteSeleccionado }) {
  const [open, setOpen] = React.useState(false);
  const [idResidente, setIdResidente] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  residenteSeleccionado(idResidente)
 

  useEffect(() => {
  
  }, );

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const data = await fetch("http://localhost:4000/residentes/");
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
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Autocomplete
          id="nombreResidente"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre
          }
          getOptionLabel={(option) => option.Apodo} 
          options={options}
          loading={loading}
          onChange={(event, value) => {
            if (value === null) {
              value = [];
            }
            setIdResidente(value.Id);
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.Apodo} - {option.Nombre} {option.Apellido}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Nombre del Residente" />
          )}
        />
      </Grid>
     
      
    </>
  );
}
