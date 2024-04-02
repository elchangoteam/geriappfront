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

export const ListaDePrescripcionesActivas = () => {
  let { id } = useParams();

  const [prescripciones, setPrescripciones] = useState([]);

  useEffect(
    () => {
      consumeApiPrescripciones();
    }, []
  );

  const consumeApiPrescripciones = async () => {
    
    const data = await fetch("http://localhost:4000/prescripciones/" + id);
    const dataJson = await data.json();
    setPrescripciones(dataJson);
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre de la Droga</TableCell>
              <TableCell>Nombre Comercial</TableCell>
              <TableCell>Dosis</TableCell>
              <TableCell>Via</TableCell>
              <TableCell>D</TableCell>
              <TableCell>A</TableCell>
              <TableCell>M</TableCell>
              <TableCell>C</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {prescripciones.map(
              ({
                Desayuno,
                Almuerzo,
                Merienda,
                Cena,
                Via,
                IdMedicamento,
                Estado,
                Observaciones,
                NombreDroga,
                NombreComercial,
                FormaFarmaceutica,
                Unidad,
                Dosis,
                TipoDeIndicacion,
                Id
              }) => {
                if (TipoDeIndicacion === "Permanente") {
                  return (
                    <TableRow className="" hover key={Id}>
                      <TableCell>
                        {" "}
                        <IconosPrescripciones
                          FormaFarmaceutica={FormaFarmaceutica}
                        />{" "}
                      </TableCell>
                      <TableCell>{NombreDroga}</TableCell>
                      <TableCell>{NombreComercial}</TableCell>
                      <TableCell>
                        {Dosis} {Unidad[1]}
                      </TableCell>
                      <TableCell>{Via}</TableCell>
                      <TableCell>{Desayuno}</TableCell>
                      <TableCell>{Almuerzo}</TableCell>
                      <TableCell>{Merienda}</TableCell>
                      <TableCell>{Cena}</TableCell>
                      <TableCell>{Observaciones}</TableCell>
                      <TableCell><Link to={"../prescripciones/editar/" + Id}>
                        <ModeEditOutlineOutlinedIcon
                          color="primary"
                          fontSize="small"
                        />
                      </Link></TableCell>
                    </TableRow>
                  );
                }
                return false;
              }
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
      ><Link to={"../prescripciones/nuevo/"+id}>
        <IconButton
          className="aling-center"
          color="primary"
          aria-label="Agregar Medicación"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        </Link>
      </Grid>
    </>
  );
};
