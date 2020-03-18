import { combineReducers } from 'redux';
import HeaderReducers from './Headerreducers';
import AuthReducer from './AuthReducer';
import SelectedProductsReducer from './SelectedProductsReducer';
import CartReducer from './CartReducer'

export default combineReducers (
    {
        Header:HeaderReducers,
        auth: AuthReducer,
        Cart: CartReducer,
        selectedProducts: SelectedProductsReducer
    }
);