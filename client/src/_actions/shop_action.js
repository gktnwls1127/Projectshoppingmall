import axios from 'axios';
import {
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function addToCart(id){

    let body = {
        productId : id
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {    
            // CartItem들에 해당하는 정보들을 
            // Product Collection에서 가져온 후에 
            // Quantity 정보를 넣어준다.

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;

    });
    

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId) {
    const request = axios.get(`/api/users/removeFromCart?_id=${productId}`)
        .then(response => {    
     
            //productInfo, cart 정보를 조합해서 CartDetail을 만든다
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if(item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }

                })
            })
            return response.data;

    });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`/api/users/successBuy`, data)
        .then(response =>  response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}

