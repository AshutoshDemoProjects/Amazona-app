import React from 'react';
import data from './data.js'
function App() {
  return (
    <div className="grid-container">
        <header className="row">
            <div><a className="brand" href="index.html">amazona</a></div>
            <div><a href="cart.html">cart</a><a href="singin.html">signin</a></div>
        </header>
        <main>
            <div className="row center">
                { 
                    data.Products.map((product)=>(
                        <div key={product._id} className="card">
                        <a href="product.html"><img className="medium" src={product.image} alt={product.name} /></a>
                        <div className="card-body">
                            <a href={`/product/${product._id}`}>
                                <h2>{product.name}</h2>
                            </a>
                            <div className="rating">
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                            </div>
                            <div className="price">&#8377;{product.price}</div>
                        </div>
                    </div>
                    ))
                }
                
            </div>
        </main>
        <footer className="row center">@2021 copyright </footer>
    </div>
  );
}

export default App;