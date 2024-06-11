import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import loginImage from "../../assets/registerImage.svg";
import logo from "../../assets/logo.png"
import SofiaLogo from "../../components/Icon/SofiaLogo.jsx";
import GoogleIcon from "../../components/Icon/AuthIcons/GoogleIcon.jsx";
import TwitterIcon from "../../components/Icon/AuthIcons/TwitterIcon.jsx";
import FacebookIcon from "../../components/Icon/AuthIcons/FacebookIcon.jsx";
import GithubIcon from "../../components/Icon/AuthIcons/GithubIcon.jsx";
import LinkedinIcon from "../../components/Icon/AuthIcons/LinkedinIcon.jsx";
import { registerUser } from "../../actions/register.js";
import hasToken from "../../services/authService";

const Register = (props) => {
  const [state, setState] = useState({ username: '', email: '', password: '' } )

  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const doRegister = (event) => {
    event.preventDefault();
    props.dispatch(registerUser({
      creds: state,
      history: props.history,
    }))
  }

  const { from } = props.location.state || { from: { pathname: '/template' } }

  if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
    return (
      <Redirect to={from} />
    );
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Đăng ký </p>
                <div className="nav-logo d-flex mb-2">
                    <img src={logo} className="mr-2" style={{height: "55px"}} />
                    <p style={{paddingTop: "18px", fontFamily: "Roboto, sans-serif", fontSize: "20px", fontWeight: "600"}}>SHOPPER</p>
                </div>
              </div>
              <form onSubmit={(event => doRegister(event))}>
                <FormGroup className="my-3">
                  <FormText>Tên đăng nhập</FormText>
                  <Input
                    id="username" 
                    className="input-transparent pl-3"
                    value={state.username}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required
                    name="username"
                    placeholder="Nhập tên đăng nhập tại đây"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCred(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="Nhập email tại đây"
                  />
                </FormGroup>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Mật khẩu</FormText>
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event => changeCred(event))}
                    type="password"
                    required
                    name="password"
                    placeholder="Nhập mật khẩu tại đây"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Đăng ký</Button>
                </div>
                <Link to="/login">Quay trở lại trang đăng nhập</Link>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
