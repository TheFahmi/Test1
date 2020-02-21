import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class WIshlistCart extends Component {

    state = {
        wishlist: [],
        activePage: 1,
        itemPerPage: 3
    }

    handlePageChange(pageNumb) {
        console.log(`active page is ${pageNumb}`);
        this.setState({activePage: pageNumb});
    }
    
    componentDidMount() {
        // if (this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'EDITOR') {
        //     this.allWishlist();
        // } else {
            this.usersWishlist();
        // }
    }

    // allWishlist = () => {
    //     axios.get('http://localhost:2002/wishlist/allwishlist')
    //         .then((res) => {
    //             this.setState({
    //                 wishlist: res.data
    //             })
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }

    usersWishlist = () => {
        axios.get("http://localhost:2002/wishlist/wishlist?username=" + this.props.username)
                .then((res) => {
                    console.log(res);
                    this.setState({ 
                        wishlist: res.data
                    });
                }).catch((err) => {
                    console.log(err);
                })
    }

    btnDeleteClick = (id) => {
        if(window.confirm('Are you sure want to delete:?')) {
            axios.delete("http://localhost:2002/deletewishlist/deletewishlist/" + id)
                .then((res) => {
                    console.log(res);
                    this.usersWishlist();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // btnAllDeleteClick = (id) => {
    //     if(window.confirm('Are you sure want to delete:?')) {
    //         axios.delete("http://localhost:2002/deletewishlist/deleteallwishlist/" + id)
    //             .then((res) => {
    //                 console.log(res);
    //                 window.location = '/productsgridview'
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    // }

    btnMoveToCart = (harga, product_id, id) => {
        if(this.props.username === "") {
            alert("Please Login First!");
            window.location = "/login"
        } else {
            
            var kuantiti = 1;
            var total_harga = kuantiti * harga
            axios.get('http://localhost:2002/cart/cartproduct', {
                params: {
                    username: this.props.username,
                    product_id,
                }
            }).then((res) => {
                if (res.data.length > 0) {
                    axios.put("http://localhost:2002/editcart/protectcart/" + res.data[0].id, {
                        user_id : this.props.id,
                        product_id,
                        kuantiti,
                        total_harga
                    }).then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })
                    axios.delete("http://localhost:2002/deletewishlist/deletewishlist/" + id)
                    .then((res) => {
                        console.log(res);
                        this.usersWishlist();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    alert('Succes move to cart!')
                    window.location = "/cart";
                } else {
                    axios.post("http://localhost:2002/cartplus/cartplus", {
                        user_id : this.props.id,
                        product_id,
                        kuantiti,
                        total_harga
                    }).then((res) => {
                        console.log(res);
                        alert(`Success move to cart!`);
                        window.location = "/cart";
                    }).catch((err) => {
                        console.log(err);
                        alert(`Failed move to cart`);
                    })
                    axios.delete("http://localhost:2002/deletewishlist/deletewishlist/" + id)
                        .then((res) => {
                            console.log(res);
                            this.usersWishlist();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }).catch((err) => {
                console.log(err);
                })
        }
    }
    

  
    renderWishlist = () => {
        var lastIndex = this.state.activePage * this.state.itemPerPage;
        var firstIndex = lastIndex - this.state.itemPerPage;
        var renderedProjects = this.state.wishlist.slice(firstIndex, lastIndex);
        var listJSXCart = renderedProjects.map((item) => {
            // if (this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'ADMIN PAYMENT') {
            //     return (
            //         <tr>
            //             <td className="text-center" style={{ fontSize: '14px', }}><center>{item.id}</center></td>
            //             <td className="text-center" style={{ fontSize: '14px', }}>{item.Nama_product}</td>
            //             <td className="text-center" style={{ fontSize: '14px', }}>IDR. {item.harga}</td>
            //             <td><center><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100}/></center></td>
            //             <td className="text-center" style={{ fontSize: '14px', }}>{item.username}</td>
            //             <td>
            //                 <center>
            //                     <button className="btn btn-danger"
            //                         onClick={() => this.btnDeleteClick(item.id)}>Hapus
            //                     </button>
            //                 </center>
            //             </td>
            //         </tr>
            //     )
            // } else {
                return (
                    <tr>
                    <td style={{ fontSize: '14px', }}>{item.Nama_product}</td>
                    <td style={{ fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                        <td><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></td>
                    <td>
                        <center>
                            <button className="btn btn-danger" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                                onClick={() => this.btnDeleteClick(item.id)}>
                                <i className="fa fa-trash" style={{ fontSize: '13px', }}></i>
                            </button>
                            <button className="btn btn-primary" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                                onClick={() => this.btnMoveToCart(item.harga, item.product_id, item.id)}>
                                <i className="fa fa-cart-plus" style={{ fontSize: '14px', }}></i>
                            </button>
                        </center>
                    </td>
                </tr>
                )
        })
        
        return listJSXCart;
    }
        
    render() {
        if (this.props.username !== '') {
            if(this.props.status === 'Verified'){
                if(this.state.wishlist.length > 0){
                    return (
                        <article className="card-body mx-auto" style={{height: "700px"}}>
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">WIshlist</h2>
                                <br />
                            </div>
                            <br />
                            <div className="full-width-div table-responsive card shadow mb-5 bg-white rounded pt-5" style={{ marginTop: '-20px' }}>
                            <h2 className="section-heading text-uppercase text-center">WIshlist</h2>
                                <table align="center" className="table table-striped table-hover bordered shadow col-lg-8 justify-content-center mt-5">
                                    <thead className="thead-light">
                                        <tr>
                                            {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>ID</center></th> */}
                                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '16px', }}>Prouduct</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '16px', }}>Price</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '16px', }}>Image</th>
                                            {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}>Username</th> */}
                                            <th colSpan="2" className="font-weight-bold text-uppercase" style={{ fontSize: '16px', }}><center>Options</center></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderWishlist()}
                                    </tbody>
                                </table>
                                <div className="mx-auto">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemPerPage}
                                        totalItemsCount={this.state.wishlist.length}
                                        pageRangeDisplayed={3}
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </article>
                    )
                } else {
                    return (
                        <div  style={{height: '239px'}}>
                        <div className="d-flex justify-content-center" style={{marginTop: '130px'}}>
                            <div className="alert alert-warning col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                                <center><b>Upps, Your wishlist is empty!!!</b><br/></center>
                            </div>
                        </div>
                        </div>
                    )
                }
            } else {
                return (
                    <Redirect to="/waitingverification" />
                )
            }
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        myRole: state.auth.role,
        id: state.auth.id,
        status: state.auth.status
    }
}

export default connect(mapStateToProps)(WIshlistCart);