import React, { Component } from 'react';
import Slider from 'react-slick'
import axios from 'axios';
import { connect } from 'react-redux';
import { select_products } from '../actions';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class Card extends Component {
    state = {
        listiphone: [],
        listipad: [],
        listiwatch: []
    }

    componentDidMount(){
        this.getdataiphone()
        // this.getdataipad(),
        // this.getdataiwatch()
    }

    getdataiphone=()=>{
        axios.get('http://localhost:2002/product/getproducts')
            .then((res) => {
                // console.log(res);
                this.setState({
                    listiphone: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    onItemClick = () => {
        this.props.select_products(this.props.listiphone);
        // console.log(this.props.products)
    }

    renderiphone=()=>{

        return this.state.listiphone.map((item)=>{
            return(
    
                <div className="col-md-12">
                        <div className="card card-product card-plain">
                            <div className="card-image">
                            {/* <Link to="#" onClick={this.onItemClick}>*/}
                            <b style={{ fontSize: 'medium' }}> 
                               <img src={`http://localhost:2002${item.image}`} alt={item.image} className="img-responsive" />
                               </b>
                            </div>
                            {/* </Link> */}
        
                            <div className="card-content">
                                <h4 className="card-title">
                                    <h4 className="card-title">{item.nama}</h4>
                                </h4>
                                <p className="card-description">Bergaransi Resmi iBox Indonesia selama 1 Tahun, Dapatkan segera</p>
                                <div className="footer">
                                    <div className="price-container">
                                    
                                        <span className="price price-new">{rupiah.format(item.harga)}</span>
                                    </div>
                                    <div className="stats">
                                    {
                                        item.stok === 0 ?
                                        <button disabled className='rounded-pill px-2 btn-danger' >NOT AVAILABLE</button>
                                        :
                                        <button disabled className='rounded-pill px-2 btn-primary' >AVAILABLE</button>
                                    }
                                    
                                         <span className="" >
                                       <button className="btn btn-info" title="Add To Cart" onClick={this.onItemClick} style={{borderRadius: '40px', height: '40px', width: '40px'}}><i className="fa fa-shopping-cart fa-lg fa-2x" /></button>
                                   </span>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                    </div>
            )
        })
            
    }

    render() {
        var settings = 
            {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000
                
              };
          var settings2 = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
            
          };
        return(
            <div className='container  px-1 pb-3' style={{marginTop: '150px'}}>
                
                <div className=' justify-content-center'>
                <h1>Our iPhone Products</h1>
                    {
                        window.innerWidth>400? 
                        <Slider {...settings}>{this.renderiphone()}</Slider>:
                        <Slider {...settings2}>{this.renderiphone()}</Slider>
                    }


                </div>
            </div>
        )
    }
}

export default connect(null, { select_products })(Card);