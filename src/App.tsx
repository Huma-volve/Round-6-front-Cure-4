// import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./pages/Appointment/Appointment"



import Layout from "./logicalComponents/Layout/Layout";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="Appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
