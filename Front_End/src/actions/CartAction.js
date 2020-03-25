import { 
  CART,
  SEARCH_BOX_CHANGE,
  SEARCH_PILIH_CHANGE,
  CART_ADDED
} from './types';


export const CartAction = (totalcart)=>{
    return {
      type: CART,
        payload: totalcart
    }
  }

  export const customerSearching = (text) => {
    return {
        type: SEARCH_BOX_CHANGE,
        payload: text,
        
    }
  }

  export const customerChoose = (text) => {
    return {
      type: SEARCH_PILIH_CHANGE,
      payload: text
    }
}

export const customerDiskon = (text) => {
  return {
    type: CART_ADDED,
    payload: text
  }
}