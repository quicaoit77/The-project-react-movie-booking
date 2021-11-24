import { Fragment } from "react";
import { Route } from "react-router-dom";
import BackToTopComponent from "./layout/backToTop/BackToTopComponent";
import FooterComponent from "./layout/footer/FooterComponent";
import HeaderComponent from "./layout/header/HeaderComponent";
import HeaderHidden from "./layout/headerHidden/HeaderHiddenComponent";
const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <HeaderHidden {...propsRoute} />
            <HeaderComponent {...propsRoute} />
            <Component {...propsRoute} />
            <FooterComponent {...propsRoute} />
            <BackToTopComponent />
          </Fragment>
        );
      }}
    ></Route>
  );
};
export default HomeTemplate;
