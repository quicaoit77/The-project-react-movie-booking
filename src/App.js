import "./App.css";
// setup react-router-dom
import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// setup loading screen
import LazyLoadingLogoComponent from "./components/LazyLoadingComponent/LazyLoadingLogoComponent";
// setup antd
import "antd/dist/antd.css";
// setup slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// setup aos
import "aos/dist/aos.css";
// template
import UserTemplate from "./templates/userTemplate/UserTemplate";
import HomeTemplate from "./templates/homeTemplate/HomeTemplate";
import CheckoutTemplate from "./templates/checkOutTemplate/CheckoutTemplate";
import AdminTemplate from "./templates/adminTemplate/AdminTemplate";
// setup scroll to top
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// page
import HomePage from "./pages/HomePage/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfiePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MovieDetailComingSoonPage from "./pages/MovieDetailComingSoonPage/MovieDetailComingSoonPage";
// component admin-template
import DashboardAdminComponent from "./pages/Admin/Dashboard/DashboardAdminComponent";
import ShowFilmsAdminComponent from "./pages/Admin/ShowFilms/ShowFilmsAdminComponent.jsx";
import ShowCinemaAdminComponent from "./pages/Admin/ShowCinemas/ShowCinemasAdminComponent";
import ShowUsersAdminComponent from "./pages/Admin/ShowUsers/ShowUsersAdminComponent";
import RestorePasswordPage from "./pages/RestorePasswordPage/RestorePasswordPage";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LazyLoadingLogoComponent />
      <Switch>
        <HomeTemplate exact path="/" Component={HomePage} />
        <HomeTemplate exact path="/home" Component={HomePage} />
        <HomeTemplate
          exact
          path="/movie-detail/:id"
          Component={MovieDetailPage}
        />
        <HomeTemplate
          exact
          path="/movie-comingSoon-detail/:id"
          Component={MovieDetailComingSoonPage}
        />
        <CheckoutTemplate
          exact
          path="/check-out/:id"
          Component={CheckoutPage}
        />
        <UserTemplate exact path="/login" Component={LoginPage} />
        <UserTemplate exact path="/profile" Component={ProfilePage} />
        <UserTemplate exact path="/register" Component={RegisterPage} />
        <UserTemplate
          exact
          path="/restore-password"
          Component={RestorePasswordPage}
        />

        <AdminTemplate
          exact
          path="/admin"
          Component={DashboardAdminComponent}
        />
        <AdminTemplate
          exact
          path="/admin/dashboard"
          Component={DashboardAdminComponent}
        />
        <AdminTemplate
          path="/admin/showfilms"
          Component={ShowFilmsAdminComponent}
        />
        <AdminTemplate
          path="/admin/showTimes"
          Component={ShowCinemaAdminComponent}
        />
        <AdminTemplate
          path="/admin/showUsers"
          Component={ShowUsersAdminComponent}
        />
        <Route path="">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
