import { IProduct } from "../../interfaces/IProduct";
import "./ProductCard.scss";
import { FC } from "react";

type ProductCardProps = {
  item: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({item}) => {
  return (
<div className="product-card">

<div className="imgBox">
  <img src={item.thumbnail} alt="mouse corsair" />
</div>

<div className="contentBox">
  <h3>{item.title}</h3>
  <h2 className="price">{item.price} €</h2>
  <a href="#" className="buy">Buy Now</a>
</div>

</div>

  );
};

export default ProductCard;
