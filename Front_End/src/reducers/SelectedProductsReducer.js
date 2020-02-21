import { 
    SELECTED_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = { 
                        id: 0, 
                        name: 0, 
                        price: 0,
                        category: '', 
                        img: 0, 
                        gender: '', 
                        description: '', 
                        stock: '', 
                    };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECTED_PRODUCTS:
            return action.payload;
        default :
            return state;
    }
}