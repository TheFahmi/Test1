import { combineReducers } from 'redux';
import HeaderReducers from './Headerreducers';
import AuthReducer from './AuthReducer';
import SelectedProductsReducer from './SelectedProductsReducer';

export default combineReducers (
    {
        Header:HeaderReducers,
        auth: AuthReducer,
        selectedProducts: SelectedProductsReducer
    }
);