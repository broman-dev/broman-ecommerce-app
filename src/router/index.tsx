import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../screens/about/About";
import Cart from "../screens/cart/Cart";
import Catalog from "../screens/catalog/Catalog";
import Contact from "../screens/contact/Contact";
import Product from "../screens/product/Product";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:categoryParam" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};
