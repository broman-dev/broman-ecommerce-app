import "./Header.scss";
import { FC, useState } from "react";
import Navigation from "../navigation/Navigation";
import Logo from "../../assets/logo.png";
import { useCart } from "../../hooks/useCart";
import CartSidebar from "../cartSidebar/CartSidebar";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header: FC = () => {
  const { items } = useCart();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  return (
    <header>
      <div className="container">
        <section className="logo ">
          <a href="/">
            <img alt="" src={Logo} />
          </a>
        </section>

        <section className="nav-wrap">
          <Navigation />
          <button
            onClick={() => setIsCartVisible(!isCartVisible)}
            className="cart-btn header-action-btn"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {items.length > 0 && (
              <div className="card-items-count">
                <span>{items.length}</span>
              </div>
            )}
          </button>
          <div
            className={`cart-sidebar-wrapper ${
              isCartVisible ? null : "hidden"
            }`}
          >
            <CartSidebar close={() => setIsCartVisible(false)} />
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
