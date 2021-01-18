import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../action/order';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function mapStateToProps(state) {
    return {
        order: state.orderDetails.order,
        loading: state.orderDetails.loading,
        error: state.orderDetails.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        detailsOrder: (id) => dispatch(detailsOrder(id))
    };
}

class OrderScreen extends Component {
    componentDidMount() {
        this.props.detailsOrder(this.props.match.params.id)
    }
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

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);