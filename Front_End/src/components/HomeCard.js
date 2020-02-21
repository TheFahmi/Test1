import React, { Component } from 'react';

class HomeCard extends Component {
    render() {
        return(
            <div>
            <div className="row">
                <div className="col col-md-6 firstBackground" style={{height: '400px'}}>
                </div>
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>iPhone Xs & Xs Max</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>Super Retina in two sizes — including the largest display ever on an iPhone. Even faster Face ID. The smartest, most powerful chip in a smartphone. And a breakthrough dual-camera system with Depth Control. iPhone XS is everything you love about iPhone. Taken to the extreme.</h5>
                    <center style={{paddingTop: '10px'}}>
                    <a href="/productsgridview">
                    <button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button>
                    </a>
                    </center>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>Apple Watch</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>All new! for a better you.
                    Introducing Apple Watch Series 4. Fundamentally redesigned and re-engineered to help you stay even more active, healthy and connected. The new all-screen design means iPad Pro is a magical piece of glass that does everything you need, any way you hold it.</h5>
                    <center style={{paddingTop: '10px'}}>
                    <a href="/productsgridview">
                    <button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button>
                    </a>
                    </center>
                </div>
                <div className="col col-md-6 firstBackground2" style={{height: '400px'}}>
                </div>
            </div>  
            
            <div className="row mt-5" style={{marginBottom: '100px'}}>
                <div className="col col-md-6 bgthird" style={{height: '400px'}}>
                </div>
                <div className="col col-md-6 bg-light border">
                    <h1 className="text-center text-uppercase bold" style={{paddingTop: '100px'}}>Ipad Pro</h1>
                    <h5 className="text-center" style={{fontSize: '18px', fontFamily: 'calibri', paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>It’s all new, all screen and all powerful. Completely redesigned and packed with our most advanced technology, it will make you rethink what iPad is capable of. The new all-screen design means iPad Pro is a magical piece of glass that does everything you need, any way you hold it.</h5>
                    <center style={{paddingTop: '10px'}}>
                    <a href="/productsgridview">
                    <button type="button" className="btn btn-primary btn-lg" style={{width: '150px', paddingTop: '10px'}}>Buy Now</button>
                    </a>
                    </center>
                </div>
            </div>
            </div>
        )
    }
}

export default HomeCard;