import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconosPrescripciones } from "./IconosPrescripciones";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { ObtenerFecha } from "../../otros/ObtenerFecha";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ListaDePrescripcionesTemporales = () => {
  let { id } = useParams();
  const [prescripciones, setPrescripciones] = useState([]);

  useEffect(() => {
    consumeApiPrescripciones();
  }, []);

  const consumeApiPrescripciones = async () => {
    const data = await fetch("http://localhost:4000/prescripciones/" + id);
    const dataJson = await data.json();
    setPrescripciones(dataJson);
  };

  const [alignment, setAlignment] = React.useState("verTodo");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
    setAlignment(newAlignment);}
  };



  // DEFINIMOS EL FORMATO Y CONTENIDO DE LAS FILAS
  const row = ({
    Desayuno,
    Almuerzo,
    Merienda,
    Cena,
    Via,
    IdMedicamento,
    TipoDeIndicacion,
    Observaciones,
    NombreDroga,
    NombreComercial,
    FormaFarmaceutica,
    Unidad,
    Dosis,
    FechaDeInicio,
    FechaDeFin,
    Id,
  }) => {
    return (
      <TableRow key={Id}
        className={ new Date(FechaDeFin) < new Date() ? "finalizado" : new Date(FechaDeInicio) === null || new Date(FechaDeInicio) > new Date()  ? "sinAsignar" : "enProceso"
        }
      >
        <TableCell>
          <IconosPrescripciones FormaFarmaceutica={FormaFarmaceutica} />{" "}
        </TableCell>
        <TableCell>{NombreDroga}</TableCell>
        <TableCell>
          {Dosis} {Unidad[1]}
        </TableCell>
        <TableCell>{Via}</TableCell>
        <TableCell>{Desayuno}</TableCell>
        <TableCell>{Almuerzo}</TableCell>
        <TableCell>{Merienda}</TableCell>
        <TableCell>{Cena}</TableCell>
        <TableCell>
          <ObtenerFecha fecha={FechaDeInicio} />
        </TableCell>
        <TableCell>
          <ObtenerFecha fecha={FechaDeFin} />
        </TableCell>
        <TableCell>{Observaciones}</TableCell>
        <TableCell>
          <Link to={"../prescripciones/editar/" + Id}>
            <ModeEditOutlineOutlinedIcon color="primary" fontSize="small" />
          </Link>
        </TableCell>
      </TableRow>
    );
  };


  // FILTRAMOS POR ESTADO DE LA MEDICACION TEMPORAL
  function filtroDeMedicacionTemporal(prescripciones) {
    if (prescripciones.TipoDeIndicacion === "Temporal") {
      if (alignment === "verTodo") {
        return row(prescripciones);
      }
      if (alignment === "finalizado") {
        if (new Date(prescripciones.FechaDeFin) < new Date()) {
          return row(prescripciones);
        }
      }
      if (alignment === "enCurso") {
        if (new Date(prescripciones.FechaDeFin) > new Date() && new Date(prescripciones.FechaDeFin) != null && new Date(prescripciones.FechaDeInicio) < new Date() ) {
          return row(prescripciones);
        }
      }
      if (alignment === "sinEmpezar") {
        if (new Date(prescripciones.FechaDeInicio) > new Date() || new Date(prescripciones.FechaDeInicio) === null ) {
          return row(prescripciones);
        }
      }
    }
    return false;
  }

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="verTodo">Ver todo</ToggleButton>
        <ToggleButton value="sinEmpezar">Sin empzar</ToggleButton>
        <ToggleButton value="enCurso">En Curso</ToggleButton>
        <ToggleButton value="finalizado">Finalizadas</ToggleButton>
      </ToggleButtonGroup>

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre de la Droga</TableCell>
              <TableCell>Dosis</TableCell>
              <TableCell>Via</TableCell>
              <TableCell>D</TableCell>
              <TableCell>A</TableCell>
              <TableCell>M</TableCell>
              <TableCell>C</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Fecha de Fin</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {prescripciones.map((prescripciones) =>
              filtroDeMedicacionTemporal(prescripciones)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          className="aling-center"
          color="primary"
          aria-label="Agregar Medicación"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </>
  );
};
