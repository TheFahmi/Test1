import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductsItems from './ProductsItems';
import Pagination from 'react-js-pagination';

class ProductsGridView extends Component {
    
    state = {   listProducts: [], 
                searchListProducts: [], 
                totalQty: 0, 
                activePage: 1,
                itemPerPage: 9
    }
    
    handlePageChange(pageNumb) {
        this.setState({activePage: pageNumb});
    }

    componentDidMount() {
        this.showProducts();
    }

    // product di get lagi untuk mendorting item dan juga membuat pagination, sedangkan di file productitem hanya mengget data secara keseluruhan sebelum di import ke file ini
    showProducts = () => {
        axios.get('http://localhost:2002/product/getproducts')
        .then((res) => {
            console.log(res);
            this.setState({ 
                listProducts: res.data, 
                searchListProducts: res.data,
            });
        }).catch((err) => {
            console.log(err);
        })
    }
// function untuk search produk berdasarkan nama
    onBtnSearchClick = () => {
        var nama = this.refs.produk.value;
        // var merk = this.refs.searchMerk.value;
        // var hargaMin = this.refs.hargaMinSearch.value;
        // var hargaMax = this.refs.hargaMaxSearch.value;

        var arrSearch = this.state.listProducts.filter((item) => {
            // return item.merk.toLowerCase().includes(merk.toLowerCase())
            //     && item.harga.toLowerCase() >= hargaMin.toLowerCase()
            //     && item.harga.toLowerCase() <= hargaMax.toLowerCase()
            //     && item.nama.toLowerCase().includes(nama.toLowerCase());
            return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProducts: arrSearch })
    }

// render produk dengan isi yang diimport dari file productitem
    renderListProducts = () => {
        var lastIndex = this.state.activePage * this.state.itemPerPage;
        var firstIndex = lastIndex - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(firstIndex, lastIndex);
        var listJSXProducts = renderedProjects.map((item) => {
            return (
                <ProductsItems products={item} />
            )
        })
        return listJSXProducts;

    }

// redirect ke page admin jiko role yang login adalah "ADMIN"
    adminToManage = () => {
        return window.location = "/admin/productslist";
    }

    render() { 
            if(this.props.products.id !== 0) {
                if(this.props.username !== ""){
                    if (this.props.status === "Verified") {
                        return <Redirect to={`/productsdetails?id=${this.props.products.id}`} />
                    } else {
                        return <Redirect to="/waitingverification"/>
                    }
                }else {
                    return <Redirect to="/login"/>
                }
            }
            
            if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR' || this.props.myRole === 'ADMIN PAYMENT') {
                var changeToListView = <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" style={{ fontSize: "13px" }} 
                                    onClick={() => {this.adminToManage()}}
                                    className="btn btn-info">Manage Products</button>
                                    </div>
                                    ;
            } else {
                changeToListView = '';
            }           
            
            return (
                <div>
                    <div className="input-group mb-3 col-md-2 mx-auto" style={{paddingTop: '60px',}}>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1" style={{fontSize: '15px'}}><i class="fa fa-search"></i></span>
                        </div>
                        <input type="text" ref="produk" className="form-control" placeholder="products" aria-label="products" aria-describedby="basic-addon1" style={{fontSize: '15px'}} onKeyUp={this.onBtnSearchClick}/>
                    </div>
                            <div className="row justify-content-center" style={{ marginTop: "30px" }}>
                                    {changeToListView}
                            </div>
                            <br/><br/>
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                        {this.renderListProducts()}
                                </div>
                                <div style={{paddingRight: "500px", paddingLeft: "500px"}}>
                                <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemPerPage}
                                        totalItemsCount={this.state.searchListProducts.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            
                            </div>
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        myRole: state.auth.role,
        products: state.selectedProducts,
        status: state.auth.status
    }
}

export default connect(mapStateToProps)(ProductsGridView);
  
