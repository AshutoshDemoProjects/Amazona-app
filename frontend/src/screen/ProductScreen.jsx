import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
/* import data from './../data'; */
import { connect } from 'react-redux';
import { detailsProduct } from '../action/product';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
class ProductScreen extends Component {
    componentDidMount() {
        this.props.detailsProductAction();
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
                                        <li>
                                            <button className="primary block">Add To Cart</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
        }</div>);
    }
}
let mapStateToProps = (props) => {
    return {
        product: props.productDetails.product,
        loading: props.productDetails.loading,
        error: props.productDetails.error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return { detailsProductAction: () => { dispatch(detailsProduct(ownProps.match.params.id)); } }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);