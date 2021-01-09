import React from 'react';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import CartScreen from './screen/CartScreen';
import { useSelector } from 'react-redux';

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
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">@2021 copyright </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;