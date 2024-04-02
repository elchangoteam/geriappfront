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
import { SelectorDroga } from "../prescripciones/nueva-prescripcion/SelectorDroga";
import { SelectorResidentes } from "../residentes/SelectorResidentes";

const mdTheme = createTheme();

export function IngresoDeInsumos() {
  const [idDroga, setIdDroga] = React.useState(null);
  const [unidad, setUnidad] = React.useState(null);
  const [residente, setResidente] = React.useState(null);

  const [insumos, setInsumos] = React.useState([
    { id: 0, idDroga: "", cantidad: "" },
  ]);

  function agregarInsumo() {
    setInsumos([
      ...insumos,
      {
        id: insumos.length,
        idDroga: "",
        cantidad: "",
      },
    ]);
  }

  

  function selectorDroga(drogaSeleccionada, unidadSeleccionada) {
    setUnidad(unidadSeleccionada);
    setIdDroga(drogaSeleccionada);
  }

  function residenteSeleccionado(residenteSeleccionado) {
    setResidente(residenteSeleccionado);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuPrincipal nombrePagina="Insumos" />
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
          <Container spacing={3} maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid container padding={0} spacing={1}>
                    <SelectorResidentes
                      residenteSeleccionado={residenteSeleccionado}
                    />
                   
                    <SelectorDroga selectorDroga={selectorDroga} />
                
                    <Grid item xs={12} md={2} lg={2}>
                      <TextField id="Cantidad" label="Cantidad" />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
