import React, { Component } from 'react';
import { addToCart } from './../action/cart';
import { connect } from 'react-redux';
class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            qty: this.props.location.search ? this.props.location.search.split('=')[1] : 1
        }
    }
    componentDidMount() {
        if (this.state.productId) {
            this.props.addToCartAction(this.state.productId, this.state.qty);
        }
    }
    render() {
        return (
            <div>
                <h1>Cart Screen</h1>
                <p>ADD To CART:ProductId {this.state.productId} Qty:{this.state.qty}</p>
            </div>
        );
    }
}
const mapStateToProps = (props) => { return {}; };
const mapDispatchToProps = (dispatch) => {
    return {
        addToCartAction: (id, qty) => { dispatch(addToCart(id, qty)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);