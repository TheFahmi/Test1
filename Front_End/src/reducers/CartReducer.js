const INITIAL_STATE = {
    cart:0,
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CART":
            return {...state,cart:action.payload}
        case "TOTALPOTONGAN":
            return {...state,totalpotongan:action.payload}
        default:
            return state
    }
}

