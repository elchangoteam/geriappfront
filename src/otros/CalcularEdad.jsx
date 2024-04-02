function CalcularEdad(props) {
    let hoy = new Date();
    let cumpleanos = new Date(props.fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad = edad - 1;
    }
    return edad;
  }