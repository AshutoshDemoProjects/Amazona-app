import React from 'react';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div><a className="brand" href="index.html">amazona</a></div>
          <div><a href="cart.html">cart</a><a href="singin.html">signin</a></div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">@2021 copyright </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;