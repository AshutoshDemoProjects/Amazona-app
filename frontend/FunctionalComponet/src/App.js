import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import { signout } from './action/userActions';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import ProfileScreen from './screen/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screen/SellerScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';

export default function App() {
  const cart = useSelector(state => state.cart);
  const cartItems = cart.cartItems
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div><Link className="brand" to="/">amazona</Link></div>
          <div>
            <Link to="/cart">Cart{cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li><Link to="/profile">User Details</Link></li>
                  <li><Link to="/orderhistory">Order History</Link></li>
                  <li><Link to="#signout" onClick={signoutHandler}>SignOut</Link></li>
                </ul>
              </div>
            ) : (<Link to="/signin">SignIn</Link>)}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">Seller <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li><Link to="/productlist/seller">Products</Link></li>
                  <li><Link to="/orderlist/seller">Orders</Link></li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#">Admin <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li><Link to="/dashbord">Dashbord</Link></li>
                  <li><Link to="/productlist">Products</Link></li>
                  <li><Link to="/orderlist">Orders</Link></li>
                  <li><Link to="/userlist">Users</Link></li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} ></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen} ></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} ></SellerRoute>
          <SellerRoute path="/product/:id/edit" component={ProductEditScreen}></SellerRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">@2021 copyright </footer>
      </div>
    </BrowserRouter >
  );
}