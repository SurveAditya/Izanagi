import axios from 'axios';

//the sequence of things is that we create a constant
//then the reducer then the action then we fire it of in a component
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'

import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

//this action pretty much does the job of a 
//useeffect in the homescreen component
//instead of doing it directly we do it here
//we are going to dispatch the action to the reducer

//this is also where redux thunk comes in
//what is does is that it allows us to create 
//a function within a function for async request
//
export const listProducts = () => async(dispatch) => {
     try {
         dispatch({type: PRODUCT_LIST_REQUEST})
         
         const { data } = await axios.get('/api/products');

         dispatch({type: PRODUCT_LIST_SUCCESS,
                   payload:data
                })
    }
    catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response
        })
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({type: PRODUCT_DETAILS_SUCCESS,
                  payload:data
               })
   }
   catch (error) {
       dispatch({
           type:PRODUCT_DETAILS_FAIL,
           payload:error.response
       })
   }
}