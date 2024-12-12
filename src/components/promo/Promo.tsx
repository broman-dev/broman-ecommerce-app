import { FC, useEffect, useLayoutEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { getProductsById } from "../../services/ProductService";
import LoadingWrapper from "../ui/loadingWrapper/LoadingWrapper";
import { useCart } from "../../hooks/useCart";
import QuantityPicker from "../ui/quantityPicker/QuantityPicker";

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
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center h-[490px]">
      <LoadingWrapper isLoading={isLoading}>
        <>
          <div className="text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:text-left mb-16 md:mb-0 items-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {product?.title}
            </h1>
            <p className="mb-8 leading-relaxed text-center">
              {product?.description}
            </p>
            <div className="flex justify-center">
              {getQuantity!(product?.id!) == 0 ? (
                <a
                  onClick={() => addToCart!({ product: product!, quantity: 1 })}
                  href="/"
                  className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Add to cart
                </a>
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
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
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
