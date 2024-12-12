import { FC, PropsWithChildren } from "react";
import "./Layout.scss";
import Sidebar from "../sibebar/Sibebar";
import Header from "../header/Header";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";

type LayoutProps = {
  sidebar: boolean;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, sidebar }) => {
  return (
    <>
      <Header />
      <div className="pt-[80px] bg-[#85d6a736]">
        <Promo />
      </div>

      <div className="container content-wrapper">
        {sidebar && <Sidebar />}
        <main>{children}</main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
