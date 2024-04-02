import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";

export default function SelectorDias({selectorDia}) {
  const [checked, setChecked] = React.useState([true, true, true, true, true, true, true]);

  useEffect(() => {
    selectorDia(checked)  
  }, [checked]);


  const handleChange1 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (event) => {
    setChecked([
      event.target.checked,
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };

  const handleChange3 = (event) => {
    setChecked([
      checked[0],
      event.target.checked,
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange4 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      event.target.checked,
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange5 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      event.target.checked,
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange6 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      event.target.checked,
      checked[5],
      checked[6],
    ]);
  };
  const handleChange7 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      event.target.checked,
      checked[6],
    ]);
  };
  const handleChange8 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      event.target.checked,
    ]);
  };

  const children = (
    <Box sx={{ display: "flex", justifyContent: 'space-between'  , flexDirection: "row", ml: 3 }}>
      <FormControlLabel
        label="Lunes"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Martes"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Miercoles"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Jueves"
        control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
      />
      <FormControlLabel
        label="Virenes"
        control={<Checkbox checked={checked[4]} onChange={handleChange6} />}
      />
      <FormControlLabel
        label="Sabado"
        control={<Checkbox checked={checked[5]} onChange={handleChange7} />}
      />
      <FormControlLabel
        label="Domingo"
        control={<Checkbox checked={checked[6]} onChange={handleChange8} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Todos los Días"
        control={
          <Checkbox
            checked={checked[0] && checked[1]  && checked[2]  && checked[3]  && checked[4]  && checked[5]  && checked[6]}
            
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
