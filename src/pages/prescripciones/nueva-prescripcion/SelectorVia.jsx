import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import "dayjs/locale/en-gb";
import { useEffect } from "react";



export function SelectorVia({selectorVia}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [via, setVia] = React.useState(null);

  useEffect(() => {
    selectorVia(via)    
  }, [via]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const data = await fetch("http://localhost:4000/vademecum/vias/");
        const dataJson = await data.json();
        setOptions([...dataJson]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (   
           
              <Autocomplete
                id="Via"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.Via === value.Via
                }
                getOptionLabel={(option) => option.Via}
                options={options}
                loading={loading}
                disableClearable
                onChange={(event, value) => {
                    setVia(value.Id);
                
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.Id}>
                    {option.Via}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Via" />
                )}
              />
           
           
  );
}
