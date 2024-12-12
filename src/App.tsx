import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
