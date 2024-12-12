import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./CartSidebar.scss";
import { FC } from "react";
import QuantityPicker from "../ui/quantityPicker/QuantityPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

type CartSidebarProps = {
  close: () => void;
};

const CartSidebar: FC<CartSidebarProps> = ({ close }) => {
  const { items, getTotalSum, removeFromCart, addToCart, clearCart } =
    useCart();

  return (
    <div className="fixed inset-0 overflow-hidden w-inherit p-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 overflow-hidden flex max-w-full p-0">
          <div className="pointer-events-auto w-[480px]">
            <div className="flex h-full flex-col bg-white shadow-xl overflow-hidden">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      onClick={close}
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.length == 0 && (
                        <div className="flex flex-col justify-center text-center mt-10">
                          <FontAwesomeIcon
                            icon={faInbox}
                            className="text-[48px]"
                          />
                          <span className="font-normal">
                            Your cart is empty.
                          </span>
                        </div>
                      )}
                      {items.map((item) => (
                        <li className="flex py-6" key={item.product.id}>
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">{item.product.title}</a>
                                </h3>
                                <p className="ml-4 whitespace-nowrap">
                                  {item.product.price} €
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="quantity-picker-wrapper">
                                <QuantityPicker
                                  min={1}
                                  max={item.product.stock!}
                                  step={1}
                                  value={item.quantity}
                                  onChange={(q) =>
                                    addToCart!({
                                      product: item.product,
                                      quantity: q,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="text-[16px] hover:scale-[1.2]"
                                  onClick={() =>
                                    removeFromCart!(item.product.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{getTotalSum!().toFixed(2)} €</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="flex justify-between mt-6">
                    <a
                      onClick={clearCart}
                      className="flex items-center justify-center rounded-md border border-transparent bg-[#b35959] cursor-pointer px-6 py-3 text-base font-medium text-white shadow-sm hover:scale-[1.1]"
                    >
                      Clear All
                    </a>

                    <Link
                      to="/cart"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:scale-[1.1]"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
