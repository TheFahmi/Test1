import { CART,SEARCH_BOX_CHANGE, SEARCH_PILIH_CHANGE, CART_ADDED } from '../actions/types';

const INITIAL_STATE = {
    cart: 0,
    searchInput: '',
    searchChoose: '',
    hasilDiskon: ''
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CART:
            return { ...state, cart: action.payload }
        case SEARCH_BOX_CHANGE:
            return { ...state, searchInput: action.payload }
        case SEARCH_PILIH_CHANGE:
            return { ...state, searchChoose: action.payload }
        case CART_ADDED:
                return {...state, hasilDiskon: action.payload }
        default:
            return state
    }
}

