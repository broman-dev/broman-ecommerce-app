import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "./screens/catalog/Catalog";
import Contact from "./screens/contact/Contact";
import About from "./screens/about/About";
import { CartProvider } from "./context/CartContext";
import Product from "./screens/product/Product";
import Cart from "./screens/cart/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:categoryParam" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
