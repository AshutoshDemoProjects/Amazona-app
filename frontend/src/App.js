import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signout } from './action/user';

import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';

class App extends Component {
  signoutHandler = () => {
    this.props.signout();
  }
  render() {
    const cartItems = this.props.cartItems;
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div><Link className="brand" to="/">amazona</Link></div>
            <div>
              <Link to="/cart">Cart{cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link>

              {this.props.userInfo ? (
                <div className="dropdown">
                  <Link to="#">{this.props.userInfo.name}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={this.signoutHandler}>SignOut</Link>
                  </ul>
                </div>
              ) : (
                  <Link to="/signin">SignIn</Link>
                )}
            </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/signin" component={SignInScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
          <footer className="row center">@2021 copyright </footer>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (props) => {
  return {
    userInfo: props.userSignIn.userInfo,
    cartItems: props.cart.cartItems
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => { dispatch(signout()) }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
/* import React from 'react';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import CartScreen from './screen/CartScreen';
import { useSelector, connect } from 'react-redux';
import SignInScreen from './screen/SignInScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const cartItems = cart.cartItems
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div><Link className="brand" to="/">amazona</Link></div>
          <div><Link to="/cart">cart{cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link><Link to="/singin">signin</Link></div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/singin" component={SignInScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">@2021 copyright </footer>
      </div>
    </BrowserRouter>
  );
}

export default App; */