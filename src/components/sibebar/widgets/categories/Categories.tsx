import { FC, useLayoutEffect, useState } from "react";
import "./Categories.scss";
import { ICategory } from "../../../../interfaces/ICategory";
import { getAllCategories } from "../../../../services/CategoryService";
import { Link, useParams } from "react-router-dom";
import loader from "../../../../assets/loading.gif";
import LoadingWrapper from "../../../ui/loadingWrapper/LoadingWrapper";

const CategoriesWidget: FC = () => {
  const { category } = useParams();
  const [items, setItems] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    getAllCategories().then((categories) => {
      setItems(categories);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="aside-widget categories-widget">
      <h3 className="widget-title">Categories</h3>
      <div className="widget-content">
        <ul>
          <LoadingWrapper isLoading={isLoading}>
            <>
              <li className={category ? undefined : "active"}>
                <Link
                  to={{
                    pathname: `/catalog`,
                  }}
                >
                  All
                </Link>
              </li>
              {items.map((item) => (
                <li
                  key={item.slug}
                  className={category === item.slug ? "active" : undefined}
                >
                  <Link
                    to={{
                      pathname: `/catalog/${item.slug}`,
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </>
          </LoadingWrapper>
        </ul>
      </div>
    </div>
  );
};

export default CategoriesWidget;
