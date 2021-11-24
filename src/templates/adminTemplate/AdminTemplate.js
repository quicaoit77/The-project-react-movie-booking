import { Fragment, useState, useEffect } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../../assets/img/logo_2.png";
import { useSelector, useDispatch } from "react-redux";
import {
  DISLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/types/lazyLoadingType";
// import { USER_LOGIN } from "../../util/settings/config";
import _ from "lodash";

import "./AdminTemplateStyle.scss";
import { deleteUserLogin } from "../../redux/actions/userAction";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  const [state, setState] = useState({
    collapsed: true,
  });
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { Component, ...restProps } = props;
  useEffect(() => {
    dispatch({
      type: DISLAY_LOADING,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADING,
      });
    }, 2000);
  }, []);
  const onCollapse = (collapsed) => {
    console.log("collapsed", collapsed);
    setState({ collapsed });
  };
  const { collapsed } = state;

  if (_.isEmpty(userLogin)) {
    return <Redirect to="/login" />;
  }
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    return <Redirect to="/" />;
  }
  const seclectedKey = () => {
    let keyNumber = "";
    switch (props.path) {
      case "/admin/dashboard": {
        return (keyNumber = "1");
      }

      case "/admin/showfilms": {
        return (keyNumber = "2");
      }

      case "/admin/showTimes": {
        return (keyNumber = "3");
      }
      case "/admin/showUsers": {
        return (keyNumber = "4");
      }

      default:
        return (keyNumber = "1");
    }
  };
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout className="adminTemplate" style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                //   trigger={hide}
              >
                <div className="logo">
                  <NavLink to="/">
                    <img src={logo} alt="" />
                  </NavLink>
                </div>
                <Menu
                  theme="dark"
                  defaultSelectedKeys={seclectedKey()}
                  mode="inline"
                >
                  <Menu.Item key="1">
                    <NavLink to="/admin/dashboard">
                      <i className="fa fa-chart-bar"></i>
                      <span>Dashboard</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/admin/showfilms">
                      <i className="fa fa-film"></i>
                      <span>Films</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <NavLink to="/admin/showTimes">
                      <i className="fa fa-clock"></i>
                      <span>ShowTimes</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to="/admin/showUsers">
                      <i className="fa fa-users"></i>
                      <span>ShowUsers</span>
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="admin__User">
                    <NavLink to="/profile">{userLogin.taiKhoan}</NavLink>
                    <NavLink
                      to=""
                      onClick={() => {
                        dispatch(deleteUserLogin());
                      }}
                    >
                      Sign Out
                    </NavLink>
                  </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  2021 © B.Movie | Booking Ticket Website | By{" "}
                  <a
                    href="https://portfolio-colin-wilbus.vercel.app/"
                    target="_blank"
                  >
                    Colin_Wilbus
                  </a>
                </Footer>
              </Layout>
            </Layout>
            <Layout className="layout adminTemplate__mobi">
              <Header>
                <div className="admin__HeaderContent">
                  <div className="logo">
                    <NavLink to="/">
                      <img src={logo} alt="" />
                    </NavLink>
                  </div>
                  <div className="admin__User">
                    <NavLink to="/profile">{userLogin.taiKhoan}</NavLink>
                    <NavLink
                      to=""
                      onClick={() => {
                        dispatch(deleteUserLogin());
                      }}
                    >
                      Sign Out
                    </NavLink>
                  </div>
                </div>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={seclectedKey()}
                >
                  <Menu.Item key="1">
                    <NavLink to="/admin/dashboard">
                      {/* <i className="fa fa-chart-bar"></i> */}
                      <span>Dashboard</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/admin/showfilms">
                      {/* <i className="fa fa-film"></i> */}
                      <span>Films</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <NavLink to="/admin/showTimes">
                      {/* <i className="fa fa-clock"></i> */}
                      <span>ShowTimes</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to="/admin/showUsers">
                      {/* <i className="fa fa-users"></i> */}
                      <span>ShowUsers</span>
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: "0 50px" }}>
                <Component {...propsRoute} />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                2021 © B.Movie | Booking Ticket Website | By{" "}
                <a
                  href="https://portfolio-colin-wilbus.vercel.app/"
                  target="_blank"
                >
                  Colin_Wilbus
                </a>
              </Footer>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;

{
  /* <Fragment>
            
          </Fragment> */
}
