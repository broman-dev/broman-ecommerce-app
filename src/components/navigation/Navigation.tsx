import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

const Navigation: FC = () => {
  return (
    <nav>
      <input type="checkbox" id="nav-toggle" />
      <label className="header-action-btn" htmlFor="nav-toggle">
        <FontAwesomeIcon icon={faBars} className="nav-toggle-show" />
        <FontAwesomeIcon icon={faTimes} className="nav-toggle-hide" />
      </label>
      <ul>
        <li className="p-3 hover:bg-[#edfcff] hover:text-gray-800 rounded-md transition-all cursor-pointer">
          <Link to="/">Home</Link>
        </li>

        <li className="p-3 hover:bg-[#edfcff] hover:text-gray-800 rounded-md transition-all cursor-pointer">
          <Link to="/about">About</Link>
        </li>
        <li className="p-3 hover:bg-[#edfcff] hover:text-gray-800 rounded-md transition-all cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
