import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Fab } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
export function CargarFoto(prop) {

  const { Foto } = prop.residente;
  const url = "/img/";

  const [archivos, setArchivos] = useState(null);

  const subirArchivos = (e) => {
    setArchivos(e);
  };

  const insertarArchivos = async () => {
    const f = new FormData();
    f.append("id", prop.residente.Id);
    f.append("tipo", "Perfil");
    f.append("nombre", prop.residente.Nombre);
    f.append("apellido", prop.residente.Apellido);

    for (let i = 0; i < archivos.length; i++) {
      f.append("files", archivos[i]);
    }

    console.log(f);
    const data = await fetch("http://localhost:4000/subirArchivo", {
      method: "POST",
      body: f,
    });
    const dataJson = await data.json();
    prop.residente.Foto = dataJson.catch((err) => ("Error occured", err));
  };

  if (prop) {
    return (
      <>
        {prop.residente.Foto ? (
          <img
            className="fotoResidente"
            width={210}
            src={url + prop.residente.Foto}
            alt={prop.residente.Nombre}
          />
        ) : (
          <Skeleton variant="rectangular" width={210} height={210} />
        )}

        <Grid item xs={12} md={12} lg={12}>
          <TextField
            onChange={(e) => subirArchivos(e.target.files)}
            id="files"
            name="files"
            type="file"
          >
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddAPhoto />
          </Fab>

          </TextField>
        </Grid>
        <Button onClick={() => insertarArchivos()} type="submit">
          {" "}
          Subir{" "}
        </Button>
      </>
    );
  } else {
    return <h1>Cargando..</h1>;
  }
}
