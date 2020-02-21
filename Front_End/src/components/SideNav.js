import React, { Component } from 'react';

class CardHome extends Component {
    render() {
        return(
            <div>
            <div className="row">
                <div className="col col-md-6 firstBackground" style={{height: '400px'}}>
                </div>
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>iPhone Xs & Xs Max</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>This is the most hyped and pinnacle sneaker of the collection. Celebs got their own pairs from Virgil. That made them kind of uncool, but still cooler than most. And this is one and only Air Jordan sneaker most valuable in the world.</h5>
                    <center style={{paddingTop: '10px'}}><button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button></center>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>Adidas NMD x Bape</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>One of the most prominent Japanese streetwear brands, A Bathing Ape, aka Bape, is dropping collaborative Camo adidas NMDs.  Bape was founded in 1993 by designer and all around creative, Nigo. Through limited releases and unprecedented collaborative partnerships, A Bathing Ape grew to become one of the most popular streetwear brands of the 1990s and 2000s.</h5>
                    <center style={{paddingTop: '10px'}}><button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button></center>
                </div>
                <div className="col col-md-6 firstBackground2" style={{height: '400px'}}>
                </div>
            </div>  
            
            <div className="row mt-5" style={{marginBottom: '100px'}}>
                <div className="col col-md-6 bgthird" style={{height: '400px'}}>
                </div>
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>Ipad Pro</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>It’s all new, all screen and all powerful. Completely redesigned and packed with our most advanced technology, it will make you rethink what iPad is capable of.</h5>
                    <center style={{paddingTop: '10px'}}><button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button></center>
                </div>
            </div>
            </div>
        )
    }
}

export default CardHome;