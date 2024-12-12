import { useCart } from "../../hooks/useCart";
import { IProduct } from "../../interfaces/IProduct";
import QuantityPicker from "../ui/quantityPicker/QuantityPicker";
import "./ProductCard.scss";
import { FC } from "react";

type ProductCardProps = {
  item: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const { addToCart, getQuantity } = useCart();

  return (
    <div className="product-card">
      <div className="imgBox">
        <img src={item.thumbnail} alt="mouse corsair" />
      </div>

      <div className="contentBox">
        <h3>{item.title}</h3>
        <h2 className="price">{item.price} €</h2>
        {getQuantity!(item?.id!) == 0 ? (
          <a
            onClick={() => addToCart!({ product: item, quantity: 1 })}
            className="buy">
            Buy Now
          </a>
        ) : (
          <div className="quantity-picker-wrapper">
            <span>Quantity:</span>
          <QuantityPicker
            min={0}
            max={item?.stock!}
            step={1}
            value={getQuantity!(item?.id!)}
            onChange={(q) => addToCart!({ product: item!, quantity: q })}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
