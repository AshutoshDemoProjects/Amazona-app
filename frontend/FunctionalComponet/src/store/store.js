import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productCategoryListReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from '../reducer/productReducer';
import { userAddressMapReducer, userDeleteReducer, userListReducer, userRegisterReducer, userSignInReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from '../reducer/userReducer';
import { cartReducer } from './../reducer/cartReducer';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from './../reducer/orderReducer';
import { userDetailsReducer } from './../reducer/userReducer';
import { productCreateReducer } from './../reducer/productReducer';


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : [],
        paymentMethod: 'PayPal',
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userTopSellersList: userTopSellerListReducer,
    productCategoryList: productCategoryListReducer,
    productReviewCreate: productReviewCreateReducer,
    userAddressMap: userAddressMapReducer,
    orderSummary: orderSummaryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;