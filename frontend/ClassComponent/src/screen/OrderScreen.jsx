import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import { detailsOrder, payOrder } from '../action/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function mapStateToProps(state) {
    return {
        order: state.orderDetails.order,
        loading: state.orderDetails.loading,
        error: state.orderDetails.error,
        errorPay: state.orderPay.error,
        successPay: state.orderPay.success,
        loadingPay: state.orderPay.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        detailsOrder: (id) => dispatch(detailsOrder(id)),
        payOrder: (ordre, paymentRsult) => dispatch(payOrder(ordre, paymentRsult)),
        payReset: () => dispatch({ type: ORDER_PAY_RESET })
    };
}

class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sdkReady: false
        }
    }
    successPaymentHandler = (paymentRsult) => {
        this.props.payOrder(this.props.order, paymentRsult);
    }

    setSdkReady = (val) => {
        this.setState({ sdkReady: val });
    }
    addPayPalScript = async () => {
        const { data } = await Axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=INR`;
        script.async = true;
        script.onload = () => {
            this.setSdkReady(true);
        }
        document.body.appendChild(script);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.order !== this.props.order)
            if (!this.props.order.isPaid) {
                if (!window.paypal) {
                    this.addPayPalScript();
                } else {
                    this.setSdkReady(true);
                }
            }

    }
    componentWillMount() {
        if (!this.props.order || this.props.successPay || (this.props.order._id !== this.props.match.params.id)) {
            this.props.payReset();
            this.props.detailsOrder(this.props.match.params.id);
        }
    }
    /* shouldComponentUpdate(nextProps, nextState) {
        if (this.props.loading === nextProps.loading || this.state.sdkReady === nextState.sdkReady) {
            return true;
        }
        else {
            return false;
        }
    } */

    render() {
        const order = this.props.order;
        return this.props.loading ? (<LoadingBox></LoadingBox>) :
            this.props.error ? (<MessageBox variant='danger'>{this.props.error}</MessageBox>) : (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                                            <strong>Address:</strong>{order.shippingAddress.address},
                                        {order.shippingAddress.city}, {order.shippingAddress.postalcode},
                                        {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ?
                                            <MessageBox variant="Success">Deliver At {order.deliveredAt}</MessageBox>
                                            : <MessageBox variant="danger">Not Delivered</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ?
                                            <MessageBox variant="Success">Paid At {order.paidAt}</MessageBox>
                                            : <MessageBox variant="danger">Not Paid</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
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
                                            <div>&#8377;{order.itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>&#8377;{order.shippingPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>&#8377;{order.taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong></div>
                                            <div><strong>&#8377; {order.totalPrice}</strong></div>
                                        </div>
                                    </li>
                                    {!order.isPaid && (<li>
                                        {!this.state.sdkReady ? (<LoadingBox></LoadingBox>) : (
                                            <>
                                                {this.props.errorPay && (<MessageBox variant="danger">{this.props.errorPay}</MessageBox>)}
                                                {this.props.loadingPay && (<LoadingBox></LoadingBox>)}
                                                <PayPalButton amount={order.totalPrice} currency="INR" onSuccess={this.successPaymentHandler}></PayPalButton>
                                            </>
                                        )}
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);