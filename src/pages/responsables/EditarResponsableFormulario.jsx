
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
import Switch from "@mui/material/Switch";
import { useParams } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Stack } from "@mui/material";

dayjs.extend(utc);

const mdTheme = createTheme(
    esES, // x-date-pickers translations
    dataGridesES, // x-data-grid translations
    coreesES // core translations
  );

export function EditarResponsableFormulario(props) {
    //Id del Residente
    const [ResidenteId, setResidenteId] = React.useState("");


    //Busco el ID del Responsable
    let { id } = useParams();
    const ResponsableId = parseInt(id)

    //Buscamos el Responsable y lo Guardo en Variable
    const Responsable = props.res[0]  


    //Seteo Estado de String a Booleano
    if(Responsable.Principal === '0'){
        Responsable.Principal = false
    }else{ Responsable.Principal = true}

    //Establesco los DefaultValue para los Select y Day
    const [FechaDeNacimiento, setFechaDeNacimiento] = React.useState( dayjs.utc(Responsable.FechaDeNacimiento));
    const [Sexo, setSexo] = React.useState(Responsable.Sexo);
    const [EstadoCivil, setEstadoCivil] = React.useState(Responsable.EstadoCivil);   
    const [Principal, setPrincipal] = React.useState(Responsable.Principal);
  
  
    const handleChange = (event) => {
      setPrincipal(event.target.checked);
    };
    
    async function borrar(){

        const data = await fetch("http://localhost:4000/responsables/borrar/"+ResponsableId, {
          method: "delete",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ResponsableId}), 
            
         
        })    
        const dataJson = await data.json(); 
        setResidenteId(dataJson.Id)

        
    }
   
    async function capturar() {
      const Nombre = document.getElementById("Nombre").value;
      const Apellido = document.getElementById("Apellido").value;
      const Direccion = document.getElementById("Direccion").value;
      const Email = document.getElementById("Email").value;
      const Nacionalidad = document.getElementById("Nacionalidad").value;
      const Dni = document.getElementById("Dni").value;
      const Telefono = document.getElementById("Telefono").value;
      const Profesion = document.getElementById("Profesion").value;
      const Parentesco = document.getElementById("Parentesco").value;
  
      const responsable = {
        ResponsableId,
        Nombre,
        Apellido,
        Direccion,
        Email,
        Nacionalidad,
        Dni,
        Telefono,
        Profesion,
        Parentesco,
        FechaDeNacimiento,
        Sexo,
        EstadoCivil,
        Principal
      };
  
      if (Nombre && Apellido && Parentesco) {
        
         const data = await fetch("http://localhost:4000/responsables/editar/"+ResponsableId, {
          method: "put",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsable),   
         
        })    
        const dataJson = await data.json(); 
        setResidenteId(dataJson.Id)

       
  
       
      } else {
        let alert = document.getElementById("alert");
        alert.innerHTML = ` Complete todos los campos obligatorios`;
      }
    }
  
    return (
      <ThemeProvider theme={mdTheme}>
        {ResidenteId !== "" ? <Navigate to={"/residentes/"+ResidenteId} /> : ""}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MenuPrincipal nombrePagina={"Editar Responsable - "+ Responsable.Nombre} />
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
                      <h6>Datos del Responsable</h6>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                      <TextField required id="Nombre" label="Nombre" defaultValue={Responsable.Nombre} />
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                      <TextField
                        required
                        id="Apellido"
                        label="Apellido"
                        defaultValue={Responsable.Apellido}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <TextField required id="Parentesco" label="Parentesco"  defaultValue={Responsable.Parentesco}/>
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        
                        id="Direccion"
                        label="Direccion"
                        defaultValue={Responsable.Direccion}
                      />
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        
                        id="Email"
                        label="Email"
                        defaultValue={Responsable.Email}
                      />
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DatePicker
                          id="FechaDeNacimiento"
                          label="Fecha de Nacimiento"
                          value={FechaDeNacimiento}
                          onChange={(newValue) => setFechaDeNacimiento(newValue)}
                        />
                      </LocalizationProvider>
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        select
                        onChange={(event) => {
                          setSexo(event.target.value);
                        }}
                        id="Sexo"
                        value={Sexo}
                        label="Sexo"
                      >
                        <MenuItem key="1" value="Masculino">
                          Masculino
                        </MenuItem>
                        <MenuItem key="2" value="Femenino">
                          Femenino
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField id="Nacionalidad" label="Nacionalidad"   defaultValue={Responsable.Nacionalidad}/>
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        value={EstadoCivil}
                        onChange={(event) => {
                          setEstadoCivil(event.target.value);
                        }}
                        id="EstadoCivil"
                        select
                        label="Estado Civil"
                      >
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
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField id="Dni" label="DNI" defaultValue={Responsable.Dni}/>
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField id="Telefono" label="Telefono" defaultValue={Responsable.Telefono}/>
                    </Grid>
  
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField id="Profesion" label="Profesion" defaultValue={Responsable.Profesion}/>
                    </Grid>
  
                    
  
                    <Grid item xs={12} md={4} lg={4}>
                      {" "}
                      <FormControlLabel
                        value="Principal"
                        control={
                          <Switch
                            checked={Principal}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Responsable Principal"
                        labelPlacement="end"
                      />
                    </Grid>
  
                    <Grid  padding={3} item xs={12} md={12} lg={12}>
                    <Stack justifyContent="flex-end" spacing={2} direction="row">
                      <div id="alert"></div>
                      <Button  onClick={capturar} variant="contained">
                        Actualizar Responsable
                      </Button>
                      <Button color="error" onClick={borrar} variant="contained">
                        Borar
                      </Button>
                      </Stack>
                     
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
  