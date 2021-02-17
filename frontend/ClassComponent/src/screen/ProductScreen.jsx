import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
/* import data from './../data'; */
import { connect } from 'react-redux';
import { detailsProduct } from '../action/productAction';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';

const mapStateToProps = (state) => {
    return {
        product: state.productDetails.product,
        loading: state.productDetails.loading,
        error: state.productDetails.error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return { detailsProductAction: () => { dispatch(detailsProduct(ownProps.match.params.id)); } }
}

class ProductScreen extends Component {
    constructor() {
        super();
        this.state = {
            qty: 1
        }
    }
    setQty = (count) => {
        this.setState({ qty: count });
    }
    componentDidMount() {
        this.props.detailsProductAction();
    }
    addToCartHandler = () => {
        this.props.history.push(`/cart/${this.props.product._id}?qty=${this.state.qty}`)
    }
    render() {
        const product = this.props.product;
        if (!product)
            return <div>Product Not Found</div>;
        return (<div>{
            this.props.loading ? (<LoadingBox></LoadingBox>) :
                this.props.error ? (<MessageBox variant="danger">{this.state.error}</MessageBox>)
                    : (<div>
                        <Link to="/">Back to Home</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name}></img>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li><h1>{product.name}</h1></li>
                                    <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                                    <li>Price : &#8377;{product.price}</li>
                                    <li>Description: {product.description}</li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">{product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>{product.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="error">Unavailable</span>)}</div>
                                            </div>

                                        </li>
                                        {product.countInStock > 0 && (<>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select value={this.state.qty} onChange={(e => this.setQty(e.target.value))}>
                                                            {[...Array(product.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button className="primary block" onClick={this.addToCartHandler}>Add To Cart</button>
                                            </li>
                                        </>)}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
        }</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);