import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductsItems from './ProductsItems';
import Pagination from 'react-js-pagination';
import { APIURL } from '../supports/APiUrl';

class ProductsGridView extends Component {

    state = {
        Products: [],
        Categories: [],
        searchProducts: [],
        totalQty: 0,
        activePage: 1,
        itemPerPage: 9,
        minValue: '',
        maxValue: '',
        test: '',
        join: []
    }

    handlePageChange(pageNumb) {
        this.setState({ activePage: pageNumb });
    }

    componentDidMount() {
        this.showProducts();
        console.log(this.state.test)
    }




    // product di get lagi untuk mendorting item dan juga membuat pagination, sedangkan di file productitem hanya mengget data secara keseluruhan sebelum di import ke file ini
    showProducts = () => {
        axios.get(`${APIURL}/product/getproducts`)
            .then((res) => {
                console.log(res);
                this.setState({
                    Products: res.data,
                    searchProducts: res.data,
                });
            }).catch((err) => {
                console.log(err);
            })

            axios.get(`${APIURL}/category/getcategory`)
            .then((res) => {
                console.log(res);
                this.setState({
                    Categories: res.data,
                });
            }).catch((err) => {
                console.log(err);
            })

            axios.get(`${APIURL}/category/getjoincategory`)
            .then((res) => {
                console.log(res);
                this.setState({
                    join: res.data,
                });
            }).catch((err) => {
                console.log(err);
            })
    }
    // function untuk search produk berdasarkan nama
    onBtnSearchClick = () => {
        var nama = this.refs.produk.value;
        var namacategory = (this.state.test)
        // var merk = this.refs.merk.value;
        var hargaMin = this.refs.hargaMinSearch.value;
        var hargaMax = this.refs.hargaMaxSearch.value;

        var arrSearch = this.state.Products.filter((item) => {
            return item.nama.toLowerCase().includes(nama.toLowerCase())
                && item.nama.toLowerCase().includes(namacategory.toLowerCase())
                ||
                item.harga >= hargaMin && item.harga <= hargaMax
                // && item.merk.toLowerCase().includes(merk.toLowerCase());
            // return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchProducts: arrSearch })
    }


    // Sort
    onSelectChange = (e) => {
        let hasilSort
        if (e.target.value === "name") {
            hasilSort = this.state.searchProducts.sort((a, b) => {
                if (a.nama > b.nama) {
                    return 1
                } else if (a.name < b.nama) {
                    return -1
                } else {
                    return 0
                }
            })
        } else if (e.target.value === "lowest") {
            hasilSort = this.state.searchProducts.sort((a, b) => {
                return a.harga - b.harga
            })
        } else if (e.target.value === "highest") {
            hasilSort = this.state.searchProducts.sort((a, b) => {
                return b.harga - a.harga
            })
        } else if (e.target.value === "relevance") {
            hasilSort = this.state.searchProducts.sort((a, b) => {
                return a.id - b.id
            })
        }
        this.setState({searchProducts: hasilSort})
    }



    handleSelectChange = (event) => {
        if(event.target.value === "Pilih category"){
            return this.state.searchProducts
        }
        else if(event.target.value === "Semua Product"){
            return this.showProducts()
        }
        
        this.setState({
          test: event.target.value
        })
      }

    onCatSearchClick = () => {
        // var nama = ;


        
        var namacategory = (this.state.test)
        
        // console.log(this.state.test)
        // var hargaMin = this.refs.hargaMinSearch.value;
        // var hargaMax = this.refs.hargaMaxSearch.value;
        // if(event.target.value === "Pilih category"){
        //     return this.showProducts()
        // }
        

        var arrSearch = this.state.join.filter((item) => {
            return item.nama.toLowerCase().includes(namacategory.toLowerCase());
            // return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchProducts: arrSearch })
    }


    rendercategory = () => {
        console.log(this.state.test)
        return this.state.Categories.map((item, index) => {
            return <option key={index} ref="category" style={{ fontSize: "20px" }} value={item.nama}>{item.nama}</option>
            
            
            
        })
    }
    // render produk dengan isi yang diimport dari file productitem
    renderManageProducts = () => {
        var lastIndex = this.state.activePage * this.state.itemPerPage;
        var firstIndex = lastIndex - this.state.itemPerPage;
        var renderedProjects = this.state.searchProducts.slice(firstIndex, lastIndex);
        var listJSXProducts = renderedProjects.map((item) => {
            return (
                <ProductsItems products={item} />
            )
        })
        return listJSXProducts;

    }

    // redirect ke page admin jiko role yang login adalah "ADMIN"
    adminToManage = () => {
        return window.location = "/admin/manageproducts";
    }

    render() {
        if (this.props.products.id !== 0) {
            if (this.props.username !== "") {
                if (this.props.status === "Verified") {
                    return <Redirect to={`/productsdetails?id=${this.props.products.id}`} />
                } else {
                    return <Redirect to="/waitingverification" />
                }
            } else {
                return <Redirect to="/login" />
            }
        }

        if (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR' || this.props.myRole === 'ADMIN PAYMENT') {
            var changeToListView = <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" style={{ fontSize: "13px" }}
                    onClick={() => { this.adminToManage() }}
                    className="btn btn-info">Manage Products</button>
            </div>
                ;
        }

        return (
            <div>
                <div className="input-group mb-2 col-md-3 mx-auto" style={{ paddingTop: '100px', width: '100%', display: 'flex' }}>
                    <div class="input-group-prepend">
                        <div className="col-lg-3 col-md-4 col-sm-12">

                        </div>
                        
                    </div>
                    <div>
                    <select onClick={this.onBtnSearchClick} className='form-control' onChange={this.handleSelectChange}>
                        <option disabled style={{ fontSize: '20px' }} >Pilih category</option>
                        <option style={{ fontSize: '20px' }} >Semua Product</option>
                        {this.rendercategory()}
                        
                    </select>
                    
                    </div>
                    <input type="text" ref="produk" className="form-control" placeholder="products" aria-label="products" aria-describedby="basic-addon1" style={{ fontSize: '20px',width: '200px'}} onKeyUp={this.onBtnSearchClick} />
                    <div class="input-group-text" id="basic-addon1" style={{ fontSize: '16px' }}><i class="fa fa-search"></i></div>
                </div>
                
                <div className="text-right mb-3" style={{fontSize: '20px',marginRight:'155px', marginTop:"30px" }}>
                                Sort by
                                <select className="ml-3" onChange = {this.onSelectChange}>
                                    <option value="relevance">Relevance</option>
                                    <option value="name">Name</option>
                                    <option value="lowest">Lowest Price</option>
                                    <option value="highest">Highest Price</option>
                                </select>
                            </div>


                <div className="row justify-content-center" style={{ marginTop: "30px" }}>

                    {changeToListView}
                </div>
                <br /><br />
                <div className="row justify-content-center">
                <div className="card filter-position p-4" style={{ width: "300px", height: "150px", marginTop:"30px"}}>
                    <div className="border-bottom card-title mb-3" >
                        <h5>Filter Product</h5>
                    </div>
                    <form onBlur={this.onFilterBlur}>
                        <h6>Price</h6>
                        <input type="text" ref="hargaMinSearch" className="form-control" placeholder="hargaMinSearch" aria-label="hargaMinSearch" aria-describedby="basic-addon1" style={{ fontSize: '15px' }} onKeyUp={this.onBtnSearchClick} />
                        <input type="text" ref="hargaMaxSearch" className="form-control" placeholder="hargaMaxSearch" aria-label="hargaMaxSearch" aria-describedby="basic-addon1" style={{ fontSize: '15px',marginTop:"15px" }} onKeyUp={this.onBtnSearchClick} />
                    </form>
                </div>
                    <div className="col-lg-8">
                        {this.renderManageProducts()}
                    </div>
                    <div style={{ paddingRight: "500px", paddingLeft: "500px" }}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.searchProducts.length}
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

