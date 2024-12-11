import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
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

      <span
        className="xl:hidden block text-5xl cursor-pointer"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </span>

      <div
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col 
                    items-center gap-6 font-semibold text-lg transform transition-transform ${
                      isMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
      ></div>
    </>
  );
};

export default Navigation;
