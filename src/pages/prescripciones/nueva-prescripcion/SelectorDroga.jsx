import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectorUnidades } from "./SelectorUnidades";
import { useEffect } from "react";

export function SelectorDroga({ idResidente, selectorDroga }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [idDroga, setIdDroga] = React.useState("");
  const [unidad, setUnidad] = React.useState("");
  const [nombreDroga, setNombreDroga] = React.useState({});
  const [NombreComercial, setNombreComercial] = React.useState("");

  function selectorUnidades(unidadSeleccionada) {
    setUnidad(unidadSeleccionada);
  }

  useEffect(() => {
    selectorDroga(idDroga, unidad);
  }, [idDroga,unidad]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const data = await fetch("http://localhost:4000/vademecum/");
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
      <Grid item xs={12} md={6} lg={6}>
        <Autocomplete
          id="nombreDroga"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.NombreDroga === value.NombreDroga
          }
          getOptionLabel={(option) => option.NombreDroga}
          options={options}
          loading={loading}
          onChange={(event, value) => {
            if (value === null) {
              value = [];
            }
            setNombreDroga(value.NombreDroga);
            setNombreComercial(value.NombreComercial);
            setIdDroga(value.id);
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.NombreDroga}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Nombre de la Droga" />
          )}
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <TextField
          disabled
          id="nombreComercial"
          label="Nombre Comercial"
          value={NombreComercial}
          defaultValue="Nombre Comercial"
        />
      </Grid>
        {/*

        DOSIS
      
      <Grid item xs={12} md={4} lg={4}>
        <TextField id="Dosis" label="Dosis" />
      </Grid>

 
      
      SELECTOR DE UNIDADES

      <Grid item xs={12} md={4} lg={4}>
        <SelectorUnidades
          idDroga={idDroga}
          selectorUnidades={selectorUnidades}
        />
      </Grid>*/}
    </>
  );
}
