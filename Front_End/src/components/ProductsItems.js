import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { select_products } from '../actions';
import { Card, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ProductsItems extends Component {
    state = { listProducts: [],}

    componentDidMount() {
        axios.get('http://localhost:2002/product/getproducts')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listProducts: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    onItemClick = () => {
        this.props.select_products(this.props.products);
    }

    renderListProducts = () => {
        var listJSXCategory = this.state.listProducts.map((item) => {
            return (
                <div>
                    <h1>{item.nama}</h1>
                    <h2>{item.harga}</h2>
                    <h4><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></h4>
                </div>
                
            )
        })
        return listJSXCategory;
    }

    render() {
        const { nama, harga, image } = this.props.products;
        return (
            <div>
                <div>
                    <Col md="4" className="rounded" style={{ marginBottom: "55px", paddingRight: "45px", paddingLeft: "45px" }}>
                        <Card style={{height: "350px"}} className="shadow">
                        <center>
                            <Link to="#" onClick={this.onItemClick}><b style={{ fontSize: 'medium' }}>
                            <img src={`http://localhost:2002${image}`} alt={image} className="img-responsive" /></b></Link>
                        </center>
                        <br/>
                        <div className="card-body card-body-cascade text-center">
                        <h4 className="card-title text-info"><strong><a href>{nama}</a></strong></h4>
                        <div className="pb-1" >
                        <span className="text-bold" style={{fontSize: '14px'}}>{rupiah.format(harga)}</span>
                        <br/>
                        <span className="" >
                            <button className="btn btn-info" title="Add To Cart" onClick={this.onItemClick} style={{borderRadius: '40px', height: '40px', width: '40px'}}><i className="fa fa-shopping-cart fa-lg fa-2x" /></button>
                        </span>
                        </div>
                    </div>
                        {/* <CardTitle id="cardTitle" style={{ padding: '0 0 0 20px', fontSize: '15px', margin: '0 0 10px 0' }}>
                            <Link to="#" onClick={this.onItemClick}><b style={{ fontSize: 'medium' }}>{rupiah.format(harga)}</b></Link>
                        </CardTitle>
                        <CardText id="id" style={{ padding: '0 0 0 20px', fontSize: '15px', margin: '0 0 5px 0', color: '#898989' }}>
                            {nama}
                        </CardText>
                        <Button style={{fontSize: "14px"}}
                            onClick={this.onItemClick} 
                            color="primary"><strong>See More</strong>
                        </Button> */}
                        </Card>
                    </Col>
                </div>
          </div>
        )
    }
}

export default connect(null, { select_products })(ProductsItems);