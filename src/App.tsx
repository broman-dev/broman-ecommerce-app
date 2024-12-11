import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "./screens/catalog/Catalog";
import Contact from "./screens/contact/Contact";
import About from "./screens/about/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:category" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
