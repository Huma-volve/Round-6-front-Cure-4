import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search/search";
import Map from "./pages/Search/map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
