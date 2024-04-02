import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";

export function SelectorHorariosEspecifico({ selectorHorarioEspecifico }) {
  const defaultValue = dayjs("2022-04-17T00:00");
  const [hora, setHora] = React.useState([{ id: 0, hora: "", cantidad: "" }]);

  function agregarHora() {
    setHora([
      ...hora,
      {
        id: hora.length,
        hora: "",
        cantidad: "",
      },
    ]);
  }

  useEffect(() => {
    if (hora) {
      selectorHorarioEspecifico(hora);
    }
  }, [hora]);

  const modificarHoras = (value, id) => {
    for (var n = 0; n < hora.length; n++) {
      hora[id].hora = value.hour();
    }
  };

  const modificarCantidad = (e, id) => {
    for (var n = 0; n < hora.length; n++) {
      hora[id].cantidad = e;
    }
  };

  return (
    <>
      {hora.map((hora) => (
        <>
          <Grid item xs={12} md={3} lg={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                id={"hora" + hora.id}
                label="Hora"
                onChange={(value) => {
                  modificarHoras(value, hora.id);
                }}
                ampm={false}
                defaultValue={defaultValue}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3} lg={1}>
            <TextField
              id={"cantidad" + hora.id}
              label="Cantidad"
              defaultValue=""
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => {
                modificarCantidad(e.target.value, hora.id);
              }}
            />
          </Grid>
        </>
      ))}
      <Grid item xs={12} md={3} lg={1} alignItems="center">
        {hora.length === 1 ? (
          ""
        ) : (
          <Link
            onClick={() => {
              hora.pop();
            }}
          >
            <IconButton
              className="aling-center"
              color="primary"
              aria-label="Agregar Medicación"
            >
              <DeleteOutlineIcon color="neutral" />
            </IconButton>
          </Link>
        )}
        <Link
          onClick={() => {
            agregarHora();
          }}
        >
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
}
