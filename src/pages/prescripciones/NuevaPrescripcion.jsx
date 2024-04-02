import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { MenuPrincipal } from "../../navigation/MenuPrincipal";
import { FormularioPrescripcion } from "./FormularioPrescripcion";
import { useFetch } from "../../useFetch";


export function NuevaPrescripcion() {
  const mdTheme = createTheme();

  let { id } = useParams();
  const {data, loading, error} = useFetch("http://localhost:4000/residentes/"+id);
  
  return (
    <>
     
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {data && <MenuPrincipal nombrePagina={"Residentes - " + data.Nombre} />}
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
                  <h5>Agregar nueva prescripcion:</h5>
                  {loading && <h1>Loading...</h1>}
                  {error && <h1>Error:{error}</h1>}
                  {data &&  <FormularioPrescripcion idResidente={data.Id}/>}
                   
                  

                </Paper>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
