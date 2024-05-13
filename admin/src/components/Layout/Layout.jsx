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
import Dashboard from "../../pages/dashboard/DashBoard";

// -- Component Styles
import s from "./Layout.module.scss";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import EditProduct from "../EditProduct/EditProduct";
import InsertProduct from "../InsertProduct/InsertProduct";
import CreatePhoneSale from "../CreatePhoneSale/CreatePhoneSale";
import EditPhoneSale from "../EditPhoneSale/EditPhoneSale";
import ViewsPhoneSale from "../ViewsPhoneSale/ViewsPhoneSale";
import CreateEnterPhone from "../CreateEnterPhone/CreateEnterPhone";
import EditEnterPhone from "../EditEnterPhone/EditEnterPhone";
import ViewsEnterPhone from "../ViewsEnterPhone/ViewsEnterPhone";
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
            <Route path="/template/products" exact component={Products} />
            <Route path="/template/editProduct/:slug" component={EditProduct} />
            <Route path="/template/insertProduct" component={InsertProduct} />
            <Route path="/template/createPhoneSale" exact component={CreatePhoneSale} />
            <Route path="/template/editPhoneSale/:slug" exact component={EditPhoneSale} />
            <Route path="/template/viewsPhoneSale" exact component={ViewsPhoneSale} />
            <Route path="/template/createEnterPhone" exact component={CreateEnterPhone} />
            <Route path="/template/editEnterPhone/:slug" exact component={EditEnterPhone} />
            <Route path="/template/viewsEnterPhone" exact component={ViewsEnterPhone} />
            <Route path="/template/chart" exact component={Chart} />
            <Route path="/template/orders" exact component={Orders} />
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
