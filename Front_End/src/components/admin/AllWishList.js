import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertToIDR } from '../../actions';
import Pagination from 'react-js-pagination';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class AllWishList extends Component {

    state = {
        wishlist: [],
        selectedIdEdit: 0,
        searchList: [],
        activePage: 1,
        itemPerPage: 5
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.allWishlist()
    }

    allWishlist = () => {
        axios.get('http://localhost:2002/wishlist/allwishlist')
            .then((res) => {
                this.setState({
                    wishlist: res.data
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    btnDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete:?')) {
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
  
    renderWishlist = () => {
        var lastIndex = this.state.activePage * this.state.itemPerPage;
        var firstIndex = lastIndex - this.state.itemPerPage;
        var renderedProjects = this.state.wishlist.slice(firstIndex, lastIndex);
        var listJSXCart = renderedProjects.map((item) => {
            // if(this.props.username !== '') {
                return (
                    <tr>
                        {/* <td className="text-center" style={{ fontSize: '14px', }}><center>{item.id}</center></td> */}
                        <td style={{ fontSize: '14px', }}>{item.Nama_product}</td>
                        <td style={{ fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                        <td><center><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></center></td>
                        <td style={{ fontSize: '14px', }}>{item.username}</td>
                        <td>
                            <center>
                                <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                                    onClick={() => this.btnDeleteClick(item.id)}><i style={{fontSize: '14px'}} className="fa fa-trash"></i>
                                </button>
                            </center>
                        </td>
                    </tr>
                )
            // }
        })

        return listJSXCart;
    }
        
        
    render() {
        if (this.props.username !== "") {
            return (
            <div style={{ fontSize: "13px" }} className="">
            <br/>
            <div className="row justify-content-center">
            </div>
            <div className="table-responsive col-lg-12">
                <table className="table table-striped table-hover table-border shadow">
                    <thead className="thead-dark">
                        <tr>
                            {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>ID</center></th> */}
                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Product Name</th>
                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Price</th>
                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Image</th>
                            <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Username</th>
                            <th colSpan="2" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Options</th>
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
            </div>
            )
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
        myRole: state.auth.role
    }
}

export default connect(mapStateToProps, {convertToIDR})(AllWishList);