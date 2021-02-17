import React, { Component } from 'react';
import { addToCart, removeFromCart } from './../action/cartAction';
import { connect } from 'react-redux';
import MessageBox from './../components/MessageBox';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCartAction: (id, qty) => { dispatch(addToCart(id, qty)) },
        removeFromCartHandler: (id) => { dispatch(removeFromCart(id)) }
    };
};

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            qty: this.props.location.search ? Number(this.props.location.search.split('=')[1]) : 1
        }
    }
    componentDidMount() {
        if (this.state.productId) {
            this.props.addToCartAction(this.state.productId, this.state.qty);
        }
    }
    removeFromCartHandler = (id) => {
        this.props.removeFromCartHandler(id);
    }
    checkOutHandler = () => {
        this.props.history.push(`/signin?redirect=shipping`)
    }
    render() {
        return (
            <div className="row top">
                <div className="col-2">
                    <h1>Shopping Cart</h1>
                    {this.props.cart.cartItems.length === 0 ? <MessageBox>Cart is empty.<Link to="/">Go Shoming</Link></MessageBox> : (
                        <ul>
                            {this.props.cart.cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small" />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={e => this.props.addToCartAction(item.product, Number(e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                            </select>
                                        </div>
                                        <div> &#8377; {item.price}</div>
                                        <div><button type="button" onClick={() => this.removeFromCartHandler(item.product)}>delete</button></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>subtotal ({this.props.cart.cartItems.reduce((a, c) => a + c.qty, 0)} items): &#8377; {this.props.cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h2>
                            </li>
                            <li><button className="primary block" type="button" onClick={this.checkOutHandler} disabled={this.props.cart.cartItems.length === 0}>
                                Proceed to checkout
                                </button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);