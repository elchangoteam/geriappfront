import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Residentes from "./pages/residentes/Residentes";
import { FichaDeResidente } from "./pages/residentes/FichaDeResidente";
import { FichaDePrescripciones } from "./pages/prescripciones/FichaDePrescripciones";
import { NuevoResidente } from "./pages/residentes/NuevoResidente";
import { EditarResidente } from "./pages/residentes/EditarResidente";
import * as React from "react";
import { NuevoResponsable } from "./pages/responsables/NuevoResponsable";
import { EditarResponsable } from "./pages/responsables/EditarResponsable";
import { NuevaPrescripcion } from "./pages/prescripciones/NuevaPrescripcion";
import { Insumos } from "./pages/ingresoDeInsumos/Insumos";
import { IngresoDeInsumos } from "./pages/ingresoDeInsumos/IngresoDeInsumos";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />

          {/*DASHBOARD*/}

          <Route path="/dashboard" element={<Dashboard />} />

          {/*RESIDENTES*/}
          <Route path="/residentes" element={<Residentes />} />
          <Route path="/residentes/:id" element={<FichaDeResidente />} />
          <Route path="/residentes/editar/:id" element={<EditarResidente />} />
          <Route path="/residentes/nuevo" element={<NuevoResidente />} />
          {/*PRESCRIPCIONES*/}
          <Route path="/prescripciones/:id" element={<FichaDePrescripciones />}/>
          <Route path="/prescripciones/nuevo/:id" element={<NuevaPrescripcion/>}/>

          {/*RESPONSABLES*/}
          <Route
            path="/responsables/nuevo/:id"
            element={<NuevoResponsable />}
          />
          <Route
            path="/responsables/editar/:id"
            element={<EditarResponsable />}
          />

           {/*INSUMOS*/}
           <Route path="/insumos" element={<Insumos />} />
           <Route path="/insumos/nuevo" element={<IngresoDeInsumos />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}
