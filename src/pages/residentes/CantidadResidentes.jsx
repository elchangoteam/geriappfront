import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

export function CantidadResidentes() {
  const [residentes, setResidentes] = useState([]);

  useEffect(() => {
    consumeApiResidentes();
  }, []);

  const consumeApiResidentes = async () => {
    const data = await fetch("http://localhost:4000/residentes");
    const dataJson = await data.json();

    setResidentes(dataJson);
  };

  function contarResidentes(parametro) {
    let contador = 0;
    parametro.map(({ Estado }) => {
      if (Estado === "Activo") {
        return (contador = contador + 1);
      }
      return null
    });
    return contador;
  }

  function contarSexoFemenino(parametro) {
    let contadorF = 0;
    parametro.map(({ Sexo, Estado }) => {
      if (Sexo === "Femenino" && Estado === "Activo") {
        return (contadorF = contadorF + 1);
      }
      return null
    });
    return contadorF;
  }

  function contarSexoMasculino(parametro) {
    let contadorM = 0;
    parametro.map(({ Sexo, Estado }) => {
      if (Sexo === "Masculino" && Estado === "Activo") {
        return (contadorM = contadorM + 1);
      }
      return null
    });
    return contadorM;
  }

  const CantidadDeAlta = contarResidentes(residentes);
  const cantidadesMujeres = contarSexoFemenino(residentes);
  const cantidadesHombres = contarSexoMasculino(residentes);

  return (
    <>
      <br />

      <Grid container>
        <Grid item className="aling-center" xs={12} md={12} lg={12}>
          <h1>{CantidadDeAlta}</h1>
          <p className="fichaDescripcion">Residentes Activos</p>
        </Grid>
        <Grid item className="aling-center" xs={12} md={6} lg={6}>
          <h3>{cantidadesMujeres}</h3>
          <p className="fichaDescripcion">Mujeres</p>
        </Grid>
        <Grid item className="aling-center" xs={12} md={6} lg={6}>
          <h3>{cantidadesHombres}</h3>
          <p className="fichaDescripcion">Hombres</p>
        </Grid>
      </Grid>
    </>
  );
}
