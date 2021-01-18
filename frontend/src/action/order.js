import { ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/order";

import { ORDER_CREATE_REQUEST } from './../constants/order';
import Axios from 'axios';
import { CART_EMPTY } from "../constants/cart";
export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payloar: order });
    try {
        const {
            userSignIn: { userInfo },
        } = getState();
        console.log(userInfo.token);
        const { data } = await Axios.post('http://localhost:5000/api/orders', order, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.token}` }
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}
export const orderReset = () => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_RESET });
}
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payloar: orderId });
    try {
        const {
            userSignIn: { userInfo },
        } = getState();
        const { data } = await Axios.get(`http://localhost:5000/api/orders/${orderId}`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.token}` }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}