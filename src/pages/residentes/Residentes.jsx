import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ListadoDeResidentes } from "./ListaDeResidentes";
import { MenuPrincipal } from "../../navigation/MenuPrincipal";
import { Copyright } from "../../otros/Copyright";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";



const mdTheme = createTheme();

function ResidentesContent() {

  return (
    <ThemeProvider theme={mdTheme}>
       
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuPrincipal nombrePagina="Residentes" />
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
              <Grid item className="aling-right">
                <Button component={Link} to={'./nuevo'} variant="contained">Nuevo Residente</Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ListadoDeResidentes />
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

export default function Residentes() {
  return <ResidentesContent />;
}
