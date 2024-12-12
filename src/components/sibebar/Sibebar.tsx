import { FC } from "react";
import "./Sibebar.scss";
import CategoriesWidget from "./widgets/categories/Categories";

const Sibebar: FC = () => {
  return (
    <aside className="stiky top-[120px] w-[340px] bg-white rounded-sm p-8">
      <CategoriesWidget />
    </aside>
  );
};

export default Sibebar;
