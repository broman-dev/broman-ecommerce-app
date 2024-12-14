import { FC, useEffect, useLayoutEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { getProductsById } from "../../services/ProductService";
import LoadingWrapper from "../ui/loadingWrapper/LoadingWrapper";
import { useCart } from "../../hooks/useCart";
import QuantityPicker from "../ui/quantityPicker/QuantityPicker";
import "./Promo.scss";

const Promo: FC = () => {
  const promoProductId = 10;
  const { addToCart, getQuantity } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
  }, [promoProductId]);

  useLayoutEffect(() => {
    getProductsById(promoProductId).then((response) => {
      setProduct(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="promo container">
      <LoadingWrapper isLoading={isLoading}>
        <>
          <div className="promo-content">
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <div className="flex justify-center">
              {getQuantity!(product?.id!) == 0 ? (
                <button
                  className="promo-add-to-cart-btn"
                  type="button"
                  onClick={() => addToCart!({ product: product!, quantity: 1 })}
                >
                  Add to cart
                </button>
              ) : (
                <QuantityPicker
                  min={0}
                  max={product?.stock!}
                  step={1}
                  value={getQuantity!(product?.id!)}
                  onChange={(q) =>
                    addToCart!({ product: product!, quantity: q })
                  }
                />
              )}
              <a
                href={`/product/${product?.id}`}
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                DISCOVER
              </a>
            </div>
          </div>
          <div className="promo-image">
            <img
              alt={product?.title}
              src={product?.images.pop() ?? product?.thumbnail}
            />
          </div>
        </>
      </LoadingWrapper>
    </div>
  );
};

export default Promo;
