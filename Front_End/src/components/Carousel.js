import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";

class Carousels extends Component {
    render(){
        return (
            <Carousel autoPlay showThumbs={false} infiniteLoop={true} centerMode={true} axis="horizontal" className="full-width-div" style={{marginLeft: '-25px', marginRight: '-25px'}}>
                <div>
                    <a href="/productsgridview">
                    <h1 style={{color: 'white'}}>iPhone Xs & Xs Max</h1>
                    <img src="https://cdn.neow.in/news/images/uploaded/2018/09/1536774109_screenshot_(25).jpg"
                        alt="Adidas-Yeezy" width={500} height={300}
                        className="img-fluid" />
                    </a>
                </div>
                <div>
                    <a href="/productsgridview">
                    <h1 style={{color: 'white'}}>Apple Watch Series</h1>
                    <img src="https://i.ytimg.com/vi/naIaW4pk_-o/maxresdefault.jpg"
                        alt="adidas-nmd-x-bape" width={'500px'} height={'300px'} className="img-responsive" />
                    </a>
                </div>
                <a href="/productsgridview">
                <div>
                    
                    <h1 style={{color: 'white'}}>iPad Pro 2018</h1>
                    <img src="https://assets.pcmag.com/media/images/527386-apple-ipad-pro.jpg?width=810&height=456"
                        alt="air-jordan-one" width={500} height={300} className="img-responsive" />
                    
                </div>
                </a>
            </Carousel>
        );
    }
}

export default Carousels;
