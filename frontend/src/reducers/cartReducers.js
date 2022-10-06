import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

//cart item is an array because you can have more than one item
export const cartReducers = (state = { cartItems: [], shippingAddress: {} },action)=>{
            switch( action.type ) {
                case CART_ADD_ITEM:
                    const item =  action.payload
                    //we also need to know if it already exists
                    const existItem = state.cartItems.find(x => x.product === item.product)
                    if (existItem) {
                        return {
                          ...state,
                          //here we map through the existing cart items  
                          cartItems: state.cartItems.map((x) =>
                            x.product === existItem.product ? item : x
                          ),
                        }
                      } else {
                        return {
                          ...state,
                          cartItems: [...state.cartItems, item],
                        }
                      }
                case CART_REMOVE_ITEM:
                      return { ...state, cartItems: state.cartItems.filter((x)=>x.product !== action.payload
                                )}
                case CART_SAVE_SHIPPING_ADDRESS:
                      return {
                                    ...state,
                                    shippingAddress: action.payload,
                                }
                case CART_SAVE_PAYMENT_METHOD:
                      return {
                                    ...state,
                                    paymentMethod: action.payload,
                                  }
                
                default: 
                        return state
             }
} 

