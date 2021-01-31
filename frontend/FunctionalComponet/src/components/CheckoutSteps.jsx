import React, { Component } from 'react';

class CheckoutSteps extends Component {
    render() {
        return (
            <div className="row checkout-steps">
                <div className={this.props.step1 ? 'active' : ''}>SignIn</div>
                <div className={this.props.step2 ? 'active' : ''}>Shipping</div>
                <div className={this.props.step3 ? 'active' : ''}>Payment</div>
                <div className={this.props.step4 ? 'active' : ''}>Place Order</div>
            </div>
        );
    }
}

export default CheckoutSteps;