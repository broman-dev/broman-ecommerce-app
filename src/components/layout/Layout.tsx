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

      <div className="flex items-start gap-4 w-full container mx-auto px-5 py-24 md:flex-row flex-col">
        <Sidebar />
        <main className="w-full bg-white rounded-sm p-8">{children}</main>
      </div>
    </>
  );
};

export default Layout;
