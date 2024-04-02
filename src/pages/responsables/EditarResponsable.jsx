import * as React from "react";
import "dayjs/locale/en-gb";
import { useParams } from "react-router-dom";
import { EditarResponsableFormulario } from "./EditarResponsableFormulario";
import { useState, useEffect } from "react";



export function EditarResponsable() {
 
    let { id } = useParams();
    const [Responsable, setResponsable] = useState(null);
  
    useEffect(() => {
      consumeApiResidentes();
    }, []);
  
    const consumeApiResidentes = async () => {
      const data = await fetch("http://localhost:4000/responsables/editar/" + id);
      const dataJson = await data.json();
      setResponsable(dataJson);
    };
  
    
    if (Responsable) {
      return <EditarResponsableFormulario res={Responsable} />;
    } else {
      return <h1>Cargando...</h1>;
    }
  }
