import React, { useEffect, useState } from 'react';
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
import SearchScreen from './screen/SearchScreen';
import SearchBox from './components/SearchBox';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { listProductCategories } from './action/productActions';
import MapScreen from './screen/MapScreen';

export default function App() {
  const cart = useSelector(state => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cartItems = cart.cartItems
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}><i className="fa fa-bars"></i></button>
            <Link className="brand" to="/">amazona</Link>
          </div>
          <div><Route render={({ history }) => (<SearchBox history={history}></SearchBox>)}></Route>
          </div>
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
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar" type="button" ><i className="fa fa-close"></i></button>
            </li>
            {loadingCategories ? (<LoadingBox></LoadingBox>)
              : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>)
                : (categories.map((c) => (<li key={c}>
                  <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                </li>)))}
          </ul>
        </aside>
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
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
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