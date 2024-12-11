import { FC, PropsWithChildren } from "react";
import "./Layout.scss";
import Sidebar from "../sibebar/Sibebar"
import Header from "../header/Header";
import Promo from "../promo/Promo";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-[80px] bg-[#85d6a736]">
          <Promo />
      </div>

      <div className="container content-wrapper">
        <Sidebar />
        <main className="w-full bg-white rounded-sm p-8">{children}</main>
      </div>
    </>
  );
};

export default Layout;
