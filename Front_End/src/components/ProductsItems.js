import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { select_products } from '../actions';
// import { Card, Col, CardText,CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { FaHeart } from "react-icons/fa";
import {FaCartPlus} from 'react-icons/fa'
import { APIURL } from '../supports/APiUrl';
import Rating from 'react-rating'



const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ProductsItems extends Component {
    state = { listProducts: [], }

    componentDidMount() {
        axios.get(`${APIURL}/product/getproducts`)
            .then((res) => {
                // console.log(res);
                this.setState({
                    listProducts: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
            
    }

    onItemClick = () => {
        this.props.select_products(this.props.products);
        console.log(this.props.products)
    }

    // renderListProducts = () => {
    //     var listJSXCategory = this.state.listProducts.map((item) => {
    //         return (
    //             <div>
    //                 <h1>{item.nama}</h1>
    //                 <h2>{item.harga}</h2>
    //                 <h4><img src={`${APIURL}${item.image}`} alt={item.image} width={100} /></h4>
    //             </div>

    //         )
    //     })
    //     return listJSXCategory;
    // }



    

    render() {
        const { nama, harga, image, stok, rating } = this.props.products;
        console.log(this.props.products)
        return (
            <div className="col-md-4" >
                <div className="card card-product card-plain" style={{height:"500px"}}>
                    <div className="card-image" style={{ height: "300px" }}>
                        {/* <Link to="#" onClick={this.onItemClick}>*/}
                        <b style={{ fontSize: 'medium' }}>
                            <img src={`http://localhost:2002${image}`} style={{ height: "300px" }} alt={image} className="img-responsive" />
                            <div className='kotakhitam'>
                                <Link to="" onClick={this.onItemClick} className='tombolebuynow'>
                                    <button className='tomboldalam' ><FaCartPlus /></button>
                                </Link>
                            </div>
                        </b>
                    </div>
                    {/* </Link> */}
                    

                    <div className="card-content">
                        <h4 className="card-title">
                            <h4 className="card-title" style={{height:"50px"}}>{nama}</h4>
                        </h4>
                        <p className="card-description">Bergaransi Resmi iBox Indonesia selama 1 Tahun, Dapatkan segera</p>
                        <div className="footer" >
                            <div className="price-container" style={{marginLeft:"20px"}}>

                                <span className="price price-new">{rupiah.format(harga)}</span>
                            </div>
                            <div className="stats">
                            <div style={{marginRight:"30px",color:"gold", marginTop:"40px"}}>
                            {/* <Rating 
                                  initialRating={rating}
                                  emptySymbol="fa fa-star-o fa-2x"
                                  fullSymbol="fa fa-star fa-2x"
                                  alt='filled star'
                                //   value={}
                                  readonly /> */}
                            </div>
                                
                                {
                                    stok === 0 ?
                                        <button disabled className='rounded-pill px-2 btn-danger' >NOT AVAILABLE</button>
                                        :
                                        <button disabled className='rounded-pill px-2 btn-success' >AVAILABLE</button>
                                }

                                <span className="" >
                                    <button className="btn btn-info" title="Add To Cart" onClick={this.onItemClick} style={{ borderRadius: '40px', height: '40px', width: '40px' }}><i className="fa fa-shopping-cart fa-lg fa-2x" /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(null, { select_products })(ProductsItems);