export const CartAction=(totalcart,totalpotongan)=>{
    return {
      type: 'CART',
      payload: totalcart,totalpotongan
    }
  }