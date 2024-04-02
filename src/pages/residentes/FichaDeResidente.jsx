import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { MenuPrincipal } from "../../navigation/MenuPrincipal";
import Alert from "@mui/material/Alert";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import Button from "@mui/material/Button";
import {  ListaDeResponsables} from "../responsables/ListaDeResponsables";
import { Link } from "react-router-dom";
import { ObtenerFecha } from "../../otros/ObtenerFecha";
import { CargarFoto } from "./CargarFoto";

export function FichaDeResidente() {
  const mdTheme = createTheme();

  let { id } = useParams();
  const [residente, setResidentes] = useState([]);

  useEffect(() => {
    consumeApiResidentes();
  }, []);

  

  const consumeApiResidentes = async () => {
    const data = await fetch("http://localhost:4000/residentes/" + id);
    const dataJson = await data.json();
    setResidentes(dataJson);
  };

  
  function calcularEdad(fecha) {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad = edad - 1;
    }
    return edad;
  }


  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuPrincipal nombrePagina={"Residentes - " + residente.Nombre} />
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
            <Container  maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Paper sx={{ p: 4 }}>
                  <Grid container item spacing={0}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Grid item xs={6} lg={2}>
                        <Alert
                          severity={
                            residente.Estado === "Activo"
                              ? "success"
                              : "error"
                          }
                        >
                          {residente.Estado}
                        </Alert>
                      </Grid>

                      <br />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                      <CargarFoto residente={residente} />
                      <br />
                      <h6 className="fichaDato">
                        {<ObtenerFecha fecha={residente.FechaDeAdmision}/>}
                      </h6>
                      <p className="fichaDescripcion">Fecha de Admisión</p>

                      <h6 className="fichaDato">
                        {residente.TipoDeHabitacion}
                      </h6>
                      <p className="fichaDescripcion">Tipo de Habitacion</p>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                      <h1>{residente.Apodo}</h1>
                      <h6>
                        Nombre: {residente.Nombre} {residente.Apellido}
                      </h6>
                      <h6>DNI: {residente.Dni}</h6>
                      <h6>
                        Fecha de Nacimiento:
                        {<ObtenerFecha fecha={residente.FechaDeNacimiento}/>}
                      </h6>
                      <h6>Edad: {calcularEdad(residente.FechaDeNacimiento)}</h6>
                      <h6>
                        {residente.ObraSocial}: {residente.NumeroDeAfiliado}
                      </h6>
                      <hr></hr>

                      <Button
                     component={Link} to={'../prescripciones/'+residente.Id}
                        variant="outlined"
                        startIcon={<MedicationOutlinedIcon />}
                      >
                        Ver Medicación
                      </Button>
                      <Button 
                     component={Link} to={'../residentes/editar/'+residente.Id}
                        variant="outlined"
                        startIcon={<MedicationOutlinedIcon />}
                      >
                        Editar Residente
                      </Button>
                    </Grid>
                    
                  </Grid>
                </Paper >
                <br />
                <Paper sx={{ p: 4 }}>
                <h6>Responsables</h6>
                <ListaDeResponsables />
                </Paper>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
