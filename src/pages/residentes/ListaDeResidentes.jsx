import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";


export const ListadoDeResidentes = () => {
  const [residentes, setResidentes] = useState([]);

  useEffect(() => {
    consumeApiResidentes();
  }, []);

  const consumeApiResidentes = async () => {
    const data = await fetch("http://localhost:4000/residentes");
    const dataJson = await data.json();

    setResidentes(dataJson);
  };


  const [alignment, setAlignment] = React.useState("verActivos");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
    setAlignment(newAlignment);}
  };

  // FILTRAMOS POR ESTADO DEL RESIDENTE
  function filtroDeResidentesPorEstado(residentes) {
    
      if (alignment === "verTodos") {
        return row(residentes);
      }
      if (alignment === "verActivos") {
        if (residentes.Estado === "Activo") {
          return row(residentes);
        }
      }
      if (alignment === "verBajas") {
        if (residentes.Estado === "Baja")  {
          return row(residentes);
        }
      }
      if (alignment === "verIngresos") {
        if (residentes.Estado === "Ingreso")  {
          return row(residentes);
        }
      }
    }
  


  const row = ({
      Nombre,
      Apellido,
      Edad,
      Apodo,
      ObraSocial,
      NumeroDeAfiliado,
      Dni,
      Id,
      Foto,
      Estado
    }) => {
      return (
        <TableRow hover key={Id}>
          <TableCell>
            <Avatar src={"/img/"+Foto} />
          </TableCell>
          <TableCell >{Apodo}</TableCell>
          <TableCell>{Nombre}</TableCell>
          <TableCell>{Apellido}</TableCell>
          <TableCell>{Dni}</TableCell>
          <TableCell>{ObraSocial}</TableCell>
          <TableCell>{NumeroDeAfiliado}</TableCell>
          <TableCell
            sx={{
              width: 10,
            }}
          >
            {" "}
            <Link to={"../residentes/" + Id}>
              <VisibilityOutlinedIcon color="primary" fontSize="small" />
            </Link>
          </TableCell>
          <TableCell
            sx={{
              width: 10,
            }}
          >
            {" "}
            <Link to={"../residentes/editar/" + Id}>
              <ModeEditOutlineOutlinedIcon color="primary" fontSize="small" />
            </Link>
          </TableCell>
        </TableRow>
      );
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
        <ToggleButton value="verActivos">Activos</ToggleButton>
        <ToggleButton value="verIngresos">Ingresos</ToggleButton>
        <ToggleButton value="verBajas">Bajas</ToggleButton>
        <ToggleButton value="verTodos">Todos</ToggleButton>
      </ToggleButtonGroup>
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell>Apodo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Obra Social</TableCell>
            <TableCell>Numero de Obra Social</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{residentes.map((residentes) =>
              filtroDeResidentesPorEstado(residentes))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );

}

