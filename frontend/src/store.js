import { createStore, combineReducers } from 'redux';
// createstore:Creates a Redux store that holds the complete state tree of your app. 
// There should only be a single store in your app.
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { productListReducer } from './reducers/productReducers';
import { productDetailsReducer } from './reducers/productReducers';
import { cartReducers  } from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
  } from './reducers/userReducers'
  import {
    orderCreateReducer,
    // orderDetailsReducer,
    // orderPayReducer,
    // orderDeliverReducer,
    // orderListMyReducer,
    // orderListReducer,
  } from './reducers/orderReducers'
const reducer = combineReducers({
    //this is really important because this is going to
    //show as a piece of state productList
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducers ,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,

})

//when we store some items in local storage we need to load them in initialState
const cartItemsFromStorages = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
  
const initialState = {
    cart: {cartItems: cartItemsFromStorages,shippingAddress: shippingAddressFromStorage},
    userLogin:{ userInfo:userInfoFromStorage}
}

//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
//Redux Middleware allows you to intercept every action sent to the reducer 
//so you can make changes to the action or cancel the action.
//used to make async requests
const middleware = [thunk]

const store = createStore(
    reducer,
    //A reducing function that returns the next state tree, given the current state tree and an action to handle.
    initialState,
    // The initial state. You may optionally specify it to hydrate the state from the server in universal apps, 
    //or to restore a previously serialized user session. 
    //If you produced reducer with combineReducers, 
    //this must be a plain object with the same shape as the keys passed to it. 
    //Otherwise, you are free to pass anything that your reducer can understand.


    composeWithDevTools(applyMiddleware(...middleware))
    //The store enhancer. You may optionally specify it to enhance the store with third-party 
    //capabilities such as middleware, time travel, persistence, etc. 
    //The only store enhancer that ships with Redux is applyMiddleware().

)

export default store
// A store holds the whole state tree of your application. 
// The only way to change the state inside it is to dispatch an action on it.