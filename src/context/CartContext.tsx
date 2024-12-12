import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import { IProduct } from "../interfaces/IProduct";

type CartItem = {
  product: IProduct;
  quantity: number;
};

type CartContextProps = {
  items: CartItem[];
  addToCart?: (item: CartItem) => void;
  removeFromCart?: (productId: number) => void;
  clearCart?: () => void;
  getTotalSum?: () => number;
  getQuantity?: (productId: number) => number;
};

export const CartContext = createContext<CartContextProps>({
  items: [],
});

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const storageKey = "cart-items";

  const [items, setItems] = useState<CartItem[]>(
    localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey)!)
      : []
  );

  useEffect(() => {
    const storageItems = localStorage.getItem(storageKey);
    if (storageItems) {
      setItems(JSON.parse(storageItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    const isItemInCart = items.find(
      (cartItem) => cartItem.product.id === item.product.id
    );

    if (isItemInCart && item.quantity == 0) {
      return removeFromCart(item.product.id);
    }

    if (isItemInCart) {
      setItems(
        items.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        )
      );
    } else {
      setItems([...items, { ...item }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const isItemInCart = items.find(
      (cartItem) => cartItem.product.id === productId
    );

    if (isItemInCart?.quantity === 1) {
      setItems(items.filter((cartItem) => cartItem.product.id !== productId));
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalSum = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getQuantity = (productId: number) => {
    const isItemInCart = items.find(
      (cartItem) => cartItem.product.id === productId
    );
    return isItemInCart?.quantity ?? 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalSum,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
