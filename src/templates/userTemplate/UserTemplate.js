import { Redirect, Route } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { useSelector } from "react-redux";
import _ from "lodash";
import "./UserTemplateStyle.scss";

const UserTemplate = (props) => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { Component, ...restProps } = props;
  //   if (localStorage.getItem(USER_LOGIN)) {
  //     return <Redirect to="/home" />;
  //   }
  if (props.path === "/login" || props.path === "/restore-password") {
    if (!_.isEmpty(userLogin)) {
      return <Redirect to="/" />;
    }
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className="template__user">
            <CustomCard
              effectColor="#000"
              blur={10}
              className="template__userContent"
            >
              <Component {...propsRoute} />
            </CustomCard>
          </div>
        );
      }}
    />
  );
};

export default UserTemplate;
