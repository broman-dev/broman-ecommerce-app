import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import "./Cart.scss";
import { FC } from "react";
import { faArrowRight, faInbox } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/useCart";
import QuantityPicker from "../../components/ui/quantityPicker/QuantityPicker";

const Cart: FC = () => {
  const { items, getTotalSum, removeFromCart, addToCart, clearCart } =
    useCart();

  return (
    <Layout sidebar={false}>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>
          {items.length == 0 && (
            <div className="flex flex-col justify-center text-center mt-10">
              <FontAwesomeIcon icon={faInbox} className="text-[48px]" />
              <span className="font-normal">Your cart is empty.</span>
            </div>
          )}

          {items.length > 0 && (
            <>
              <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-xl leading-8 text-gray-500">
                  Product
                </div>
                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                  <span className="w-full max-w-[200px] justify-center text-center">
                    Quantity
                  </span>
                  <span className="w-full max-w-[200px] justify-center text-center">
                    Total
                  </span>
                </p>
              </div>
              {items.map((item) => (
                <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box">
                      <img
                        src={item.product.thumbnail}
                        className="xl:w-[140px] rounded-xl object-cover"
                      />
                    </div>
                    <div className="pro-data w-full max-w-sm ">
                      <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                        {item.product.title}
                      </h5>
                      <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                        {item.product.price} €
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center flex-col min-[450px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <div className="flex items-center w-full max-w-[200px] mx-auto justify-center">
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
                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[200px] text-center">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </h6>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-400">
                    Sub Total
                  </p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">
                    {getTotalSum!().toFixed(2)} €
                  </h6>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                  <p className="font-normal text-xl leading-8 text-gray-400">
                    Delivery Charge
                  </p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">
                    0.00 €
                  </h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                    {getTotalSum!().toFixed(2)} €
                  </h6>
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <a
                  onClick={clearCart}
                  className="rounded-full flex items-center justify-center border border-transparent bg-[#b35959] cursor-pointer px-6 py-4 text-base font-medium text-white shadow-sm hover:scale-[1.1]"
                >
                  Clear All
                </a>

                <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:scale-[1.1]">
                  <span> Continue to Payment</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-8" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
