import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { MenuPrincipal } from "../../navigation/MenuPrincipal";
import { Copyright } from "../../otros/Copyright";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import { esES as dataGridesES } from "@mui/x-data-grid";
import { esES as coreesES } from "@mui/material/locale";
import { esES } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";


const mdTheme = createTheme(
  esES, // x-date-pickers translations
  dataGridesES, // x-data-grid translations
  coreesES // core translations
);

export function NuevoResidente() {
  const [FechaDeAdm, setFechaDeAdmision] = React.useState(null);
  const [FechaDeNac, setFechaDeNacimiento] = React.useState(null);
  const [Sexo, setSexo] = React.useState('');
  const [EstadoCivil, setEstadoCivil] = React.useState('');
  const [Planta, setPlanta] = React.useState('');
  const [Estado, setEstado] = React.useState('');
  const [Id, setId] = React.useState('');

  let IdRespuesta = Id.IdRespuesta
  
  async function capturarFormulario() {
    
    const Nombre = document.getElementById("Nombre").value;
    const Apellido = document.getElementById("Apellido").value;
    const Apodo = document.getElementById("Apodo").value;
    const Nacionalidad = document.getElementById("Nacionalidad").value;
    const Dni = document.getElementById("Dni").value;
    const ObraSocial = document.getElementById("ObraSocial").value;
    const NumeroDeAfiliado = document.getElementById("NumeroDeAfiliado").value;
    const UltimoDomicilio = document.getElementById("UltimoDomicilio").value;
    const Planta = document.getElementById("Planta").value;
    const Observaciones = document.getElementById("Observaciones").value;
   
   
      
    const residente = {
      Nombre,
      Apodo,
      Apellido,
      Dni,
      ObraSocial,
      NumeroDeAfiliado,
      Sexo,
      Nacionalidad,
      EstadoCivil,
      FechaDeAdm,
      FechaDeNac,
      UltimoDomicilio,      
      Planta,
      Estado,
      Observaciones,
    };

    if (
      Nombre &&
      Apellido      
    ) {
      console.log(residente)
      const data = await fetch("http://localhost:4000/residentes", {
        method: "post",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(residente),   
       
      })    
      const dataJson = await data.json(); 
      setId(dataJson)
  
    

    } else {
      let alert = document.getElementById("alert");
      alert.innerHTML =  ` Complete todos los campos obligatorios`
                    
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
     {Id !== '' ? <Navigate to={"/residentes/"+IdRespuesta}/> : '' }    
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuPrincipal nombrePagina="Nuevo Residente" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Container spacing={3} maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Paper
                sx={{
                  p: 2,
                }}
              >
                <Grid container padding={3} spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <h6>Datos del Residente</h6>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField required id="Nombre" label="Nombre" />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      required
                      id="Apellido"
                      label="Apellido"
                      defaultValue=""
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      required
                      id="Apodo"
                      label="Apodo"
                      defaultValue=""
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <TextField id="Dni" label="DNI" />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <TextField select onChange={(event) =>{ setSexo(event.target.value)}
                    } id="Sexo" value={Sexo} label="Sexo">
                      <MenuItem key="1" value="Masculino">
                        Masculino
                      </MenuItem>
                      <MenuItem key="2" value="Femenino">
                        Femenino
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <TextField id="Nacionalidad" label="Nacionalidad" />
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <TextField value={EstadoCivil} onChange={(event) =>{ setEstadoCivil(event.target.value)}
                    } id="EstadoCivil" select label="Estado Civil">
                      <MenuItem key="1" value="Casado">
                        Casado
                      </MenuItem>
                      <MenuItem key="2" value="Viudo">
                        Viudo
                      </MenuItem>
                      <MenuItem key="3" value="Divorciado">
                        Divorciado
                      </MenuItem>
                      <MenuItem key="4" value="Soltero">
                        Soltero
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                         id="FechaDeNacimiento"
                         openTo="year"
                        label="Fecha de Nacimiento"
                        value={FechaDeNac}
                        onChange={(newValue) => setFechaDeNacimiento(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <TextField id="UltimoDomicilio" label="Ultimo Domicilio" />
                  </Grid>                 

                  <Grid item xs={12} md={12} lg={12}>
                    <h6>
                      <br />
                      Obra Social
                    </h6>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField id="ObraSocial" label="Obra Social" />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <TextField
                      id="NumeroDeAfiliado"
                      label="Numero De Afiliado"
                    />
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <h6>
                      <br />
                      Detalles de la residencia
                    </h6>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField onChange={(event) =>{ setPlanta(event.target.value)}
                    } value={Planta} id="Planta" select label="Planta">
                      <MenuItem key="1" value="PB">
                        PB
                      </MenuItem>
                      <MenuItem key="2" value="PA">
                        PA
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      id="Estado"
                      select
                      label="Estado"
                      required
                      onChange={(event) =>{ setEstado(event.target.value)}
                    }
                    value={Estado}
                    >
                      <MenuItem key="1" value="Ingreso">
                        Ingreso
                      </MenuItem>
                      <MenuItem key="2" value="Activo">
                        Activo
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        label="Fecha de Admision"
                        id="FechaDeAdmision"
                        value={FechaDeAdm}
                        onChange={(newValue) => setFechaDeAdmision(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      id="Observaciones"
                      label="Observaciones"
                      multiline
                      rows={4}
                      defaultValue=""
                    />
                  </Grid>
                  <Grid className="aling-right" item xs={12} md={12} lg={12}>
                    <div id="alert"></div>
                    <Button onClick={capturarFormulario} variant="contained">
                      Cargar Residente
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
