import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from './../action/cartAction';

function mapStateToProps(state) {
    return {
        userInfo: state.userSignIn.userInfo,
        shippingAddress: state.cart.shippingAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveShippingAddress: (data) => { dispatch(saveShippingAddress(data)) }
    };
}

class ShippingAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: this.props.shippingAddress.fullName,
            address: this.props.shippingAddress.address,
            city: this.props.shippingAddress.city,
            postalcode: this.props.shippingAddress.postalcode,
            country: this.props.shippingAddress.country,
        }
    }
    componentDidMount() {
        if (!this.props.userInfo)
            this.props.history.push('/signin')
    }
    submitHandler = (e) => {
        e.preventDefault();
        const { fullName, address, city, postalcode, country } = this.state;
        this.props.saveShippingAddress({ fullName, address, city, postalcode, country });
        this.props.history.push('/payment');
    }
    onChangeName = (e) => {
        this.setState({ fullName: e.target.value });
    }
    onChangeAddress = (e) => {
        this.setState({ address: e.target.value });
    }
    onChangeCity = (e) => {
        this.setState({ city: e.target.value });
    }
    onChangePostalCode = (e) => {
        this.setState({ postalcode: e.target.value });
    }
    onChangeCountry = (e) => {
        this.setState({ country: e.target.value });
    }
    render() {

        return (
            <div>
                <CheckoutSteps step1 step2></CheckoutSteps>
                <form className="form" onSubmit={this.submitHandler}>
                    <div>
                        <h1>Shipping Address</h1>
                    </div>
                    <div><label htmlFor="fullName">Full Name</label><input type="text" id="fullName" placeholder="Enter Full Name" value={this.state.fullName} onChange={this.onChangeName} /></div>
                    <div><label htmlFor="address">Address</label><input type="text" id="address" placeholder="Enter Address" value={this.state.address} onChange={this.onChangeAddress} /></div>
                    <div><label htmlFor="city">City</label><input type="text" id="city" placeholder="Enter City" value={this.state.city} onChange={this.onChangeCity} /></div>
                    <div><label htmlFor="postalcode">Postalcode</label><input type="text" id="postalcode" placeholder="Enter Postalcode" value={this.state.postalcode} onChange={this.onChangePostalCode} /></div>
                    <div><label htmlFor="country">Country</label><input type="text" id="country" placeholder="Enter Country" value={this.state.country} onChange={this.onChangeCountry} /></div>
                    <div><label /><button type="submit" className="primary">Contnue</button></div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressScreen);