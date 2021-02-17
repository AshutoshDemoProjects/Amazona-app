import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, orderReset } from '../action/orderAction';
import CheckoutSteps from './../components/CheckoutSteps';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';

function mapStateToProps(state) {
    return {
        cart: state.cart,
        loading: state.orderCreate.loading,
        success: state.orderCreate.success,
        error: state.orderCreate.error,
        order: state.orderCreate.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createOrder: (order) => dispatch(createOrder(order)),
        resetOrder: () => dispatch(orderReset())
    };
}

class PlaceOrderScreen extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.success !== this.props.success) {
            this.props.history.push(`/order/${nextProps.order._id}`);
            this.props.resetOrder();
        }
    }
    componentDidMount() {
        if (!this.props.cart.paymentMethod) {
            this.props.history.push('/payment');
        }

    }
    toPrice = (num) => Number(num.toFixed(2));
    placeOrderHandler = () => {
        this.props.createOrder({ ...this.props.cart, orderItems: this.props.cart.cartItems });

    }
    render() {
        const cart = this.props.cart;
        cart.itemsPrice = this.toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
        cart.shippingPrice = cart.itemsPrice > 500 ? this.toPrice(0) : this.toPrice(80);
        cart.taxPrice = this.toPrice(0.15 * cart.itemsPrice);
        cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
        return (
            <div>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                <div className="row top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {cart.shippingAddress.fullName}<br />
                                        <strong>Address:</strong>{cart.shippingAddress.address},
                                        {cart.shippingAddress.city}, {cart.shippingAddress.postalcode},
                                        {cart.shippingAddress.country}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {cart.paymentMethod}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Order Items</h2>
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
                                                    <div>{item.qty} x  &#8377;{item.price} =  &#8377;{item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Items</div>
                                        <div>&#8377;{cart.itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>&#8377;{cart.shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>&#8377;{cart.taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>&#8377; {cart.totalPrice}</strong></div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="primary block"
                                        disabled={cart.cartItems.length === 0}
                                        onClick={this.placeOrderHandler}>Place Order</button></li>
                                {this.props.loading && <LoadingBox></LoadingBox>}
                                {this.props.error && <MessageBox variant='danger'>{this.props.error}</MessageBox>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);