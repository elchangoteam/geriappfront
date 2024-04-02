import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export const ListaDeResponsables = () => {
  let { id } = useParams();
  const [responsables, setResponsables] = useState([]);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  useEffect(
    () => {
      consumeApiResponsables();
    }, []
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#ffffff",
      fontSize: "11px",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "0px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const consumeApiResponsables = async () => {
    const data = await fetch("http://localhost:4000/responsables/" + id);
    const dataJson = await data.json();
    setResponsables(dataJson);
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  if (responsables) {
    return (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <caption className="aling-center">
            <Button
              component={Link}
              to={"../responsables/nuevo/" + id}
              size="small"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
            >
              Agregar nuevo responsable
            </Button>
          </caption>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Parentesco</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>Profesion</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {responsables.map(
              ({
                Nombre,
                Apellido,
                Direccion,
                Email,
                FechaDeNacimiento,
                Sexo,
                Nacionalidad,
                EstadoCivil,
                Dni,
                Telefono,
                Profesion,
                Parentesco,
                Principal,
                Id,
                Foto,
              }) => {
                if (Id != null) {
                  return (
                    <TableRow className="" hover key={Id}>
                      <TableCell>
                        <StyledBadge
                          badgeContent="P"
                          color="success"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          invisible={Principal === "0"  ?  true :  false}
                        >
                          <Avatar {...stringAvatar(Nombre + " " + Apellido)} />
                        </StyledBadge>
                      </TableCell>
                      <TableCell>{Nombre + " " + Apellido}</TableCell>
                      <TableCell>{Parentesco}</TableCell>
                      <TableCell>{Telefono}</TableCell>
                      <TableCell>{Dni}</TableCell>
                      <TableCell>{FechaDeNacimiento}</TableCell>
                      <TableCell>{Direccion}</TableCell>
                      <TableCell>{Profesion}</TableCell>
                      <TableCell
                        sx={{
                          width: 10,
                        }}
                      >
                        {" "}
                        <Link to={"../responsables/editar/" + Id}>
                          <ModeEditOutlineOutlinedIcon
                            color="primary"
                            fontSize="small"
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow className="" hover>
                      <TableCell></TableCell>
                      <TableCell>No tiene responsables asignados</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                }
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <h1>Cargando</h1>;
  }
};
