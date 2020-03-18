import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { select_products } from '../actions';
import { FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { APIURL } from '../supports/APiUrl';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class HomeCard extends Component {
    state = {
        listiphone: [],
        listipad: [],
        listiwatch: []
    }

    componentDidMount() {
        axios.get(`${APIURL}/product/getproducts`)
            .then((res) => {
                // console.log(res);
                this.setState({
                    listiphone: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    // getdataiphone=()=>{
    //     axios.get('${APIURL}/product/getproducts')
    //     .then((res) => {
    //         // console.log(res);
    //         this.setState({
    //             listiphone: res.data
    //         });
    //     }).catch((err) => {
    //         console.log(err);
    //     }) 
    // }

    onItemClick = () => {
        this.props.select_products(this.props.products);
        // console.log(this.props.products)
    }


    render() {
        const { nama, harga, image, stok } = this.props.products;
        console.log(this.props.products)
        return (
            <div className="col-md-12">
                <div className="card card-product card-plain">
                    <div className="card-image" style={{ height: "300px" }}>
                        {/* <Link to="#" onClick={this.onItemClick}>*/}
                        <b style={{ fontSize: 'medium' }}>
                            <img src={`${APIURL}${image}`} style={{ height: "300px" }} alt={image} className="img-responsive" />
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
                            <h4 className="card-title">{nama}</h4>
                        </h4>
                        <p className="card-description">Bergaransi Resmi iBox Indonesia selama 1 Tahun, Dapatkan segera</p>
                        <div className="footer">
                            <div className="price-container">

                                <span className="price price-new">{rupiah.format(harga)}</span>
                            </div>
                            <div className="stats">
                                {
                                    stok === 0 ?
                                        <button disabled className='rounded-pill px-2 btn-danger' >NOT AVAILABLE</button>
                                        :
                                        <button disabled className='rounded-pill px-2 btn-success' >AVAILABLE</button>
                                }

                                <span className="" >
                                    {/* <button className="btn btn-info" title="Add To Cart" onClick={this.onItemClick} style={{borderRadius: '40px', height: '40px', width: '40px'}}><i className="fa fa-shopping-cart fa-lg fa-2x" /></button> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(null, { select_products })(HomeCard);