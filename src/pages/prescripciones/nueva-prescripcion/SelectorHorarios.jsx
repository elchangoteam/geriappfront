import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SelectorHorariosEspecifico } from "./SelectorHorarioEspecifico";
import { useEffect } from "react";

export function SelectorHorarios({
  selectorHorarioEspecifico,
  selectorTipoDeHorario,
}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    selectorTipoDeHorario(checked);
  }, [checked]);

  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Horarios especificos"
        />
      </Grid>

      {checked ? (
        <>
          <SelectorHorariosEspecifico
            selectorHorarioEspecifico={selectorHorarioEspecifico}
          />
        </>
      ) : (
        <>
          <Grid item xs={12} md={3} lg={3}>
            <TextField id="Desayuno" label="Desayuno" defaultValue="" />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <TextField id="Almuerzo" label="Almuerzo" defaultValue="" />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <TextField id="Merienda" label="Merienda" defaultValue="" />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <TextField id="Cena" label="Cena" defaultValue="" />
          </Grid>
        </>
      )}
    </>
  );
}
