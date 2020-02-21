import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { select_products } from '../actions';
import queryString from 'query-string';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
// import { Redirect } from 'react-router-dom';


class ProductsDetails extends Component {

    state = {
        totalQty: 0,
        category: '',
        location: [],
        allproducts: [],
        productdetail: []
    }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search);
        var id = params.id;
        console.log('Params id = ' + id)
        axios.get('http://localhost:2002/productdetail/productdetail', {
            params: {
                id
            }
        }).then((res) => {
                this.setState({ productdetail: res.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

// function untuk menambahkan produk ke cart, jika user memasukan product yang sma yang sudah ada dalam cart, maka otomatis barang tersebut akan ditimpa
    onBtnAddToCart = (harga, id) => {
        if(this.props.username === "") {
            alert("Please Login First!");
            window.location = "/login"
        } else {
            
            var kuantiti = this.refs.quantity.value;
            var total_harga = kuantiti * harga
            axios.get('http://localhost:2002/cart/cartproduct', {
                params: {
                    username: this.props.username,
                    product_id: id,
                }
            }).then((res) => {
                if (res.data.length > 0) {
                    axios.put("http://localhost:2002/editcart/protectcart/" + res.data[0].id, {
                        user_id : this.props.id,
                        product_id: id,
                        kuantiti,
                        total_harga
                    }).then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })
                    alert('Succes add to cart!')
                    window.location = "/cart";
                } else {
                    axios.post("http://localhost:2002/cartplus/cartplus", {
                        user_id : this.props.id,
                        product_id: id,
                        kuantiti,
                        total_harga
                    }).then((res) => {
                        console.log(res);
                        alert(`Success add to cart!`);
                        window.location = "/cart";
                    }).catch((err) => {
                        console.log(err);
                        alert(`Failed add to cart`);
                    })
                }
            }).catch((err) => {
                console.log(err);
                })
            }
    }

    
    btnAddWishlist = (id) => {
        var currentdate = new Date();
        var date = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate();
        
        // + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        if(this.props.username === "") {
            alert("Please Login First!");
            window.location = "/login"
        } else {
            axios.get('http://localhost:2002/wishlist/getprotectwishlist', {
                params: {
                    username: this.props.username,
                    product_id: id,
                }
            }).then((res) => {
                if (res.data.length > 0) {
                    axios.put("http://localhost:2002/editcart/protectwishlist/" + res.data[0].id, {
                        user_id: this.props.id,
                        product_id: id,
                        date 
                    }).then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })
                    alert('Succes add to wishlist!')
                        window.location = "/wishlist";
                } else {
                    axios.post("http://localhost:2002/wishlist/addwishlist", {
                        user_id: this.props.id,
                        product_id: id,
                        date
                    }).then((res) => {
                        console.log(res);
                        alert(`Success add to wishlist!`);
                        window.location = "/wishlist";
                    }).catch((err) => {
                        console.log(err);
                        alert(`Failed add to wishlist`);
                    })
                }
            }).catch((err) => {
                console.log(err);
                })
            }
    }


// render tampilkan produk details
    render() {
        var { id, nama, harga, image, deskripsi } = this.state.productdetail;
            return (
            <div className="row justify-content-center bg-light border shadow-lg" style={{marginLeft: '100px', marginRight: '100px', marginTop: '150px'}}>
            <div className="col-sm-10 bg" style={{ height: '500px', paddingTop: '30px', paddingBottom: '30px' }}>
            <h1 className="section-subheading text-center font-weight-bold" style={{ color: "black" }}>{nama}</h1>
            <div className="row" style={{paddingTop: '30px'}}>
                <div className="col-8 col-sm-6 bg-" style={{height: '300px'}}>
                    <img src={`http://localhost:2002${image}`} alt={image} height="250px" className="float-right"/>
                </div>
                <div className="col-4 col-sm-6" style={{height: 'auto'}}>
                <div style={{width: "380px"}}>
                    <h3 className="font-weight-normal">{deskripsi}</h3>
                    <br></br>
                    <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                            <select defaultValue="1" ref="quantity" innerRef="addquantity" type="number">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                    </InputGroup>
                    <br/>
                    <Button style={{ fontSize: '15px' }} color="primary" size="lg" block onClick={() => this.onBtnAddToCart(harga, id)}>Add To Cart</Button>
                    <br />
                    <Button style={{fontSize: '15px'}} color="success" size="lg" block onClick={() => this.btnAddWishlist(id)}>Wishlist</Button>
                </div>
                </div>
            </div>
            </div>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        products: state.selectedProducts,
        id : state.auth.id,
        status: state.auth.status
    }
}

export default connect(mapStateToProps, { select_products })(ProductsDetails);