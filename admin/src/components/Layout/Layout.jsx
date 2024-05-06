// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Footer from "../Footer/Footer";
import Login from "C:/Users/LE NHAT DUC/Phone_Store_2023.2_N18/admin/src/pages/login/Login";

// -- Component Styles
import s from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          {/* <Breadcrumbs url={props.location.pathname} /> */}
          <Switch>
            <Route path="/template" exact component={Login}/>
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
