import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSteps from './../components/CheckoutSteps';
import { savePaymentMethod } from './../action/cartAction';

function mapStateToProps(state) {
    return {
        shippingAddress: state.cart.shippingAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        paymentMethod: (paymentMethod) => { dispatch(savePaymentMethod(paymentMethod)) }
    };
}

class PaymentMethodScreen extends Component {
    constructor() {
        super();
        this.state = {
            paymentMethod: 'PayPal'
        }
    }
    componentDidMount() {
        if (!this.props.shippingAddress.address)
            this.props.history.push('/shipping')
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.paymentMethod(this.state.paymentMethod)
        this.props.history.push('/placeorder');
    }
    onChangePaymentMethod = (e) => {
        this.setState({ paymentMethod: e.target.value });
    }
    render() {
        return (
            <div>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <form className="form" onSubmit={this.submitHandler}>
                    <div>
                        <h1>Payment</h1>
                    </div>
                    <div>
                        <div><input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={this.onChangePaymentMethod} /><label htmlFor="paypal">PayPal</label></div>
                    </div>
                    <div>
                        <div><input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={this.onChangePaymentMethod} /><label htmlFor="stripe">Stripe</label></div>
                    </div>
                    <div><button type="submit" className="primary">Continue</button></div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen);