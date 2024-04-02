import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "dayjs/locale/en-gb";
import { esES as dataGridesES } from "@mui/x-data-grid";
import { esES as coreesES } from "@mui/material/locale";
import { esES } from "@mui/x-date-pickers";
import { SelectorInicioFin } from "./nueva-prescripcion/SelectorInicioFin";
import { SelectorHorarios } from "./nueva-prescripcion/SelectorHorarios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { SelectorVia } from "./nueva-prescripcion/SelectorVia";
import SelectorDias from "./nueva-prescripcion/SelectorDias";
import Button from "@mui/material/Button";
import { SelectorDroga } from "./nueva-prescripcion/SelectorDroga";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const mdTheme = createTheme(
  esES, // x-date-pickers translations
  dataGridesES, // x-data-grid translations
  coreesES // core translations
);

export function FormularioPrescripcion({ idResidente }) {
  //Declaracion de Variables
  const [TipoDeIndicacion, setTipoDeIndicacion] = React.useState("Permanente");
  const [idDroga, setIdDroga] = React.useState(null);
  const [FechaPrescripcion, setFechaPrescripcion] = React.useState(dayjs.utc());
  const [unidad, setUnidad] = React.useState(null);
  const [via, setVia] = React.useState(null);
  const [FechaDeInicio, setFechaDeInicio] = React.useState(null);
  const [FechaDeFin, setFechaDeFin] = React.useState(null);
  const [Dias, setDias] = React.useState([]);
  const [HorariosEspecificos, setHorariosEspecificos] = React.useState(null);
  const [HorariosEspecificosEstado, setHorariosEspecificosEstado] =
    React.useState(false);
  const [EnPastillero, setEnPastillero] = React.useState(true);
  const [Estado, setEstado] = React.useState("Activa");
  //Fin de Declaracion de Variables

  const handleChange = (event) => {
    setEnPastillero(event.target.checked);
  };

  //Callbacks
  function selectorVia(viaSeleccionada) {
    setVia(viaSeleccionada);
  }
  function selectorInicio(inicioSeleccionado) {
    setFechaDeInicio(inicioSeleccionado);
  }
  function selectorFin(finSeleccionado) {
    setFechaDeFin(finSeleccionado);
  }
  function selectorDia(diaSeleccionado) {
    setDias(diaSeleccionado);
  }
  function selectorDroga(drogaSeleccionada, unidadSeleccionada) {
    setUnidad(unidadSeleccionada);
    setIdDroga(drogaSeleccionada);
  }
  function selectorTipoDeHorario(tipo) {
    setHorariosEspecificosEstado(tipo);
  }
  function selectorHorarioEspecifico(horarioEspecifico) {
    setHorariosEspecificos(horarioEspecifico);
  }
  //Fin Callbacks

  //Funcion de Fetch a API
  async function cargarPrescripcion() {
    let Desayuno = null;
    let Almuerzo = null;
    let Merienda = null;
    let Cena = null;

    if (
      (TipoDeIndicacion === "Permanente" || TipoDeIndicacion === "Temporal") &&
      HorariosEspecificosEstado === false
    ) {
      Desayuno = parseInt(document.getElementById("Desayuno").value);
      Almuerzo = parseInt(document.getElementById("Almuerzo").value);
      Merienda = parseInt(document.getElementById("Merienda").value);
      Cena = parseInt(document.getElementById("Cena").value);
    }

    const Dosis = document.getElementById("Dosis").value;
    const Observaciones = document.getElementById("Observaciones").value;
    let DiasString = JSON.stringify(Dias);

    const Prescripcion = {
      idResidente,
      idDroga,
      via,
      Desayuno,
      Almuerzo,
      Merienda,
      Cena,
      Observaciones,
      EnPastillero,
      FechaPrescripcion,
      Dosis,
      FechaDeInicio,
      FechaDeFin,
      DiasString,
      TipoDeIndicacion,
      unidad,
      HorariosEspecificos,
      HorariosEspecificosEstado,
      Estado,
    };

    if (idDroga && idResidente) {
      console.log(Prescripcion);

      
      const data = await fetch("http://localhost:4000/prescripciones", {
        method: "post",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Prescripcion),   
       
      })    
      const dataJson = await data.json(); 
     // setId(dataJson)
    } else {
      let alert = document.getElementById("alert");
      alert.innerHTML = ` Complete todos los campos obligatorios`;
    }
  }
  // Fin de Fetch

  // Inicio del Front
  return (
    <ThemeProvider theme={mdTheme}>
      <Container spacing={3} maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container padding={0} spacing={1}>
            <Grid
              item
              style={{ paddingTop: 20, marginBottom: -5 }}
              xs={12}
              md={12}
              lg={12}
            >
              <h6>Tipo de Prescripcion</h6>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                select
                onChange={(event) => {
                  setEstado(event.target.value);
                }}
                id="Estado"
                value={Estado}
                label="Estado"
              >
                <MenuItem key="1" value="Activa">
                  Activa
                </MenuItem>
                <MenuItem key="2" value="Suspendida">
                  Suspendida
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <TextField
                select
                onChange={(event) => {
                  setTipoDeIndicacion(event.target.value);
                }}
                id="TipoIndicacion"
                value={TipoDeIndicacion}
                label="Tipo de Indicación"
              >
                <MenuItem key="1" value="Permanente">
                  Permanente
                </MenuItem>
                <MenuItem key="2" value="Sos">
                  SOS
                </MenuItem>
                <MenuItem key="3" value="Temporal">
                  Temporal
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="Fecha de Prescripcion"
                  id="FechaDePrescripcion"
                  value={FechaPrescripcion}
                  onChange={(newValue) => setFechaPrescripcion(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              style={{ paddingTop: 20, marginBottom: -5 }}
              xs={12}
              md={12}
              lg={12}
            >
              <h6>Droga y Dosis</h6>
            </Grid>
            <SelectorDroga selectorDroga={selectorDroga} />

            <Grid item xs={12} md={4} lg={4}>
              <SelectorVia selectorVia={selectorVia} />
            </Grid>
            <Grid
              item
              style={{ paddingTop: 20, marginBottom: -5 }}
              xs={12}
              md={12}
              lg={12}
            >
              <h6>Horarios y dias de toma</h6>
            </Grid>
            {TipoDeIndicacion === "Temporal" ? (
              <SelectorInicioFin
                selectorFin={selectorFin}
                selectorInicio={selectorInicio}
              />
            ) : (
              ""
            )}
            {TipoDeIndicacion === "Permanente" ||
            TipoDeIndicacion === "Temporal" ? (
              <SelectorHorarios
                selectorHorarioEspecifico={selectorHorarioEspecifico}
                selectorTipoDeHorario={selectorTipoDeHorario}
              />
            ) : (
              ""
            )}
            <Grid item xs={12} md={12} lg={12}>
              <SelectorDias selectorDia={selectorDia} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={EnPastillero}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Medicación en Pastillero"
              />
            </Grid>
            <Grid
              item
              style={{ paddingTop: 20, marginBottom: -5 }}
              xs={12}
              md={12}
              lg={12}
            >
              <h6>Observaciones</h6>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="Observaciones"
                label="Observaciones"
                defaultValue=""
              />
            </Grid>

            <Grid className="aling-right" item xs={12} md={12} lg={12}>
              <div id="alert"></div>
              <Button onClick={cargarPrescripcion} variant="contained">
                Cargar Prescripcion
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
