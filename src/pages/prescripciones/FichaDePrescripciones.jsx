import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { MenuPrincipal } from "../../navigation/MenuPrincipal";
import {ListaDePrescripcionesActivas} from './ListaDePrescripcionesActivas'
import {ListaDePrescripcionesSos} from './ListaDePrescripcionesSos'
import { ListaDePrescripcionesTemporales } from "./ListaDePrescripcionesTemporales";


export function FichaDePrescripciones() {
  const mdTheme = createTheme();

  let { id } = useParams();
  const [residente, setResidentes] = useState([]);

  useEffect(
    () => {
      consumeApiResidentes();
    }, []
  );

  const consumeApiResidentes = async () => {
    const data = await fetch("http://localhost:4000/residentes/" + id);
    const dataJson = await data.json();
    setResidentes(dataJson);
  };

 
 

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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Paper sx={{m:1, p: 4 }}>
                  <h5>Medicaciones Permanetes</h5>
                    <ListaDePrescripcionesActivas/>
                  <h5>Medicaciones SOS</h5>

                    <ListaDePrescripcionesSos/>

                </Paper>
               
                <Paper sx={{m:1, p: 4 }}>
                  <h5>Medicaciones Temporales</h5>
                    <ListaDePrescripcionesTemporales/>
                   
                  

                </Paper>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
