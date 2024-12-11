import { FC, PropsWithChildren } from "react";
import "./LoadingWrapper.scss";

type LoadingWrapperProps = {
  isLoading: boolean;
};

const LoadingWrapper: FC<PropsWithChildren<LoadingWrapperProps>> = ({
  isLoading,
  children,
}) => {
  return isLoading ? <div className="loader"></div> : children;
};

export default LoadingWrapper;
