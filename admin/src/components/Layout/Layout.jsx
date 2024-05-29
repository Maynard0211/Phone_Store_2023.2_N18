// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import Dashboard from "../../pages/dashboard/Dashboard";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import Charts from "../../pages/uielements/charts/Charts";
import Icons from "../../pages/uielements/icons/IconsPage";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";

// -- Component Styles
import s from "./Layout.module.scss";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import EditProduct from "../EditProduct/EditProduct";
import InsertProduct from "../InsertProduct/InsertProduct";
import ViewsPhoneSale from "../ViewsPhoneSale/ViewsPhoneSale";
import { Chart } from "../Chart/Chart";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Switch>
          <Route path="/template" exact render={() => <Redirect to="template/dashboard"/>} />
            <Route path="/template/dashboard" exact component={Dashboard}/>
            <Route path="/template/typography" exact component={Typography} />
            <Route path="/template/tables" exact component={Tables} />
            <Route path="/template/products" exact component={Products} />
            <Route path="/template/insertProduct" component={InsertProduct} />
            <Route path="/template/editProduct/:productID" component={EditProduct} />
            <Route path="/template/viewsPhoneSale" exact component={ViewsPhoneSale} />
            <Route path="/template/chart" exact component={Chart} />
            <Route path="/template/orders" exact component={Orders} />
            <Route path="/template/notifications" exact component={Notifications} />
            <Route path="/template/ui-elements" exact render={() => <Redirect to={"/template/ui-elements/charts"} />} />
            <Route path="/template/ui-elements/charts" exact component={Charts} />
            <Route path="/template/ui-elements/icons" exact component={Icons} />
            <Route path="/template/ui-elements/maps" exact component={Maps} />
            <Route path='*' exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
