import { useParams } from "react-router-dom";

import { FC, useLayoutEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { IProduct } from "../../interfaces/IProduct";
import { getProductsById } from "../../services/ProductService";
import LoadingWrapper from "../../components/ui/loadingWrapper/LoadingWrapper";
import { faArrowLeft, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product: FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct | null>(null);

  useLayoutEffect(() => {
    if (id) {
      getProductsById(id as unknown as number).then((response) => {
        setProduct(response);
        setIsLoading(false);
      });
    }
  }, []);
  return (
    <Layout sidebar={true}>
      <LoadingWrapper isLoading={isLoading}>
        <section className="relative ">
          <button
            onClick={() => {
              window.history.back();
            }}
            className="max-w-[200px] py-4 text-center justify-center items-center font-semibold text-lg text-gray-600 flex transition-all duration-500 hover:scale-[1.1]"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-5" />
            <span> Go back</span>
          </button>
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
              <div className="img">
                <div className="img-box h-full max-lg:mx-auto ">
                  <img
                    src={product?.images.pop() ?? product?.thumbnail}
                    className="max-lg:mx-auto lg:ml-auto h-full object-cover"
                  />
                </div>
              </div>
              <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data w-full max-w-xl">
                  <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                    {product?.category.toUpperCase()}
                  </p>
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                    {product?.title}
                  </h2>
                  <div>
                    <span>Stock: {product?.stock}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      {product?.price} €
                    </h6>
                    <div className="flex items-center gap-2">
                      <span>
                        Rating: {product?.rating}
                        <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                          ({product?.reviews.length} review)
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-base font-normal mb-5">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!!product?.reviews.length && (
            <div>
              <h2 className="font-bold text-[16pt]">Reviews</h2>
              {product?.reviews.map((review) => (
                <article className="p-6 my-3 text-base bg-[#f7f7f7] rounded-md">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-1 text-sm text-gray-900 font-semibold">
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className="text-[24px] mr-2"
                      />
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      rated with {review.rating} points on {new Date(review.date).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      
                    </p>
                  </div>
                  <p className="text-gray-500 p-4">{review.comment}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </LoadingWrapper>
    </Layout>
  );
};

export default Product;
