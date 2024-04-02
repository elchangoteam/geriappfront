import * as React from "react";
import Grid from "@mui/material/Grid";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

export function SelectorInicioFin({selectorFin, selectorInicio}) {
    const [FechaDeInicio, setFechaDeInicio] = React.useState(null);
    const [FechaDeFin, setFechaDeFin] = React.useState(null);

    useEffect(() => {
      selectorFin(FechaDeFin)
    }, [FechaDeFin]);

    useEffect(() => {
      selectorInicio(FechaDeInicio)
    }, [FechaDeInicio]);
   

  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            label="Fecha de Inicio"
            id="FechaDeInicio"
            value={FechaDeInicio}
            onChange={(newValue) => setFechaDeInicio(newValue)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker           
            label="Fecha de Fin"
            id="FechaDeFin"
            value={FechaDeFin}
            onChange={(newValue) => setFechaDeFin(newValue)}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}
