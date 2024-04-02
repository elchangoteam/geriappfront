import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SanitizerOutlinedIcon from "@mui/icons-material/SanitizerOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';


export function IconosPrescripciones(props){

    

    if(props.FormaFarmaceutica === "Comprimidos"){
        return <RemoveCircleOutlineOutlinedIcon />
    }
    else if(props.FormaFarmaceutica === "Crema"){
        return <SanitizerOutlinedIcon />
    }
    else if(props.FormaFarmaceutica === "Polvo"){
        return <MedicationOutlinedIcon />
    }
    else if(props.FormaFarmaceutica === "Gotas"){
        return <OpacityOutlinedIcon />
    }
    else {
        return <LocalHospitalOutlinedIcon />
    }
        
    

}