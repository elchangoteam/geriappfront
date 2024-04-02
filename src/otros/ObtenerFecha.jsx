

export function ObtenerFecha(props) {
    let fechaEnviada = new Date(props.fecha);
    let dd = fechaEnviada.getUTCDate();
    let mm = fechaEnviada.getUTCMonth() + 1;
    let yy = fechaEnviada.getUTCFullYear();

    if(mm < 10 && dd < 10) {
      return (props = "0"+dd + "-0" + mm + "-" + yy);

    }
    else if(mm<10 && dd>=10){
      return (props = dd + "-0" + mm + "-" + yy);    
    }
    else if(mm>=10 && dd<10){
      return (props = "0"+dd + "-" + mm + "-" + yy);    
    }

    return (props = dd + "-" + mm + "-" + yy);
  }