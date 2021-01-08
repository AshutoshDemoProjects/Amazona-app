import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product.jsx';
import LoadingBox from '../components/LoadingBox.jsx';
import MessageBox from '../components/MessageBox.jsx';
import { listProducts } from './../action/product';
import { connect } from 'react-redux';
class HomeScreen extends Component {


    componentDidMount() {
        /* const fecthData = async () => {
            try {
                this.setState({ loading: true });
                const { data } = await axios.get("http://localhost:5000/api/products");
                this.setState({ products: data.Products, loading: false });
            }
            catch (err) {
                this.setState({ error: err.message, loading: false });
            }
        };
        fecthData(); */
    }
    render() {
        return (
            <div>
                {
                    this.props.loading ? (<LoadingBox></LoadingBox>) :
                        this.props.error ? (<MessageBox variant="danger">{this.state.error}</MessageBox>) : (
                            <div className="row center">
                                {this.props.products.map((product) => (<Product key={product._id} product={product} />))}
                            </div>)
                }
            </div>
        );
    }
}
let mapStateToProps = (props) => {
    return {
        products: props.productList.products,
        loading: props.productList.loading,
        error: props.productList.error
    };
};
const mapDispatchToProps = (dispatch) => {
    listProductsAction: dispatch(listProducts())
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);