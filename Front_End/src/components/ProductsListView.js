import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

class ProductsListView extends Component {

    state = {   
                listJoinProduct: [], 
                selectedIdEdit: 0, 
                searchListProducts: [],
                listProduct: [],
                listCategories: [],
                listVarian: [],
                filterForm: '', 
                value: '',
                uploading: false,
                images: [],
                activePage: 1,
                itemPerPage: 5
            }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    componentDidMount() {
        this.showJoinProduct();
        this.showProduct();
        this.showCategories();
    }

    showJoinProduct = () => {
    axios.get('http://localhost:2002/join/getjoinproduct')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listJoinProduct: res.data, 
                    searchListProducts: res.data, 
                    selectedIdEdit: 0 
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    showProduct = () => {
        axios.get('http://localhost:2002/product/listproduct')
            .then((res) => {
                this.setState({
                    listProduct: res.data
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    renderIDProduct = () => {
        var listproductid = this.state.listProduct.map((item) => {
            return (
                <option>{item.nama}</option>
            )
        })
        return listproductid;
    }

    showCategories = () => {
        axios.get('http://localhost:2002/product/listcategories')
        .then((res) => {
            this.setState({
                listCategories: res.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    renderIDCategories = () => {
        var listcategoriesid = this.state.listCategories.map((item) => {
            return (
                <option>{item.jenis}</option>
            )
        })
        return listcategoriesid;
    }

    onBtnAddClick = () => {
        const product = this.refs.product.value;
        const category = this.refs.categories.value;
        if( product && category !== "") {
            axios.post('http://localhost:2002/join/addjoinproduct', {
                product,
                category
            }).then((res) => {
                console.log(res);
                this.showJoinProduct();
            }).catch((err) => {
                console.log(err);
            })
        } else alert('Please fill all option box.')
    }

    onBtnSaveClick = (id) => {
        const product = this.refs.updateproduct.value;
        const category = this.refs.updatecategories.value;
        axios.put('http://localhost:2002/join/editjoinproduct/' + id, {
            product,
            category
        }).then((res) => {
            console.log(res);
            this.showJoinProduct();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure want to delete?')) {
            axios.delete('http://localhost:2002/join/deletejoinproduct/' + id)
                .then((res) => {
                    console.log(res);
                    this.showJoinProduct();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    onKeyUpSearch = () => {

        var city = this.refs.qCity.value;
        var arrSearch;

        arrSearch = this.state.listJoinProduct.filter((e) => {

            return e.city.toLowerCase().includes(city.toLowerCase()) 
            
        })

        this.setState({ searchListProducts: arrSearch })

    }

    filterLocation = () => {
        var filterList;

        filterList = this.state.listJoinProduct.filter((item) => {
            return (
                item.city.toLowerCase().includes(this.state.filterForm.toLowerCase())
            )
        })

        if(filterList.length === 0) {
            filterList = this.state.listJoinProduct.filter((item) => {
                return (
                    item.city.toLowerCase().includes(this.state.filterForm.toLowerCase())
                )
            })
        }

        return filterList;
    }

    onSearch = () => {
        var nama = this.refs.namaproduk.value;

        var arrSearch = this.state.listJoinProduct.filter((item) => {
            return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProducts: arrSearch })
    }

    adminAddAction = () => {
        if(this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'EDITOR') {
            return(
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <select ref="product" className="custom-select" style={{ fontSize: "12px" }}>
                                <option></option>
                                {this.renderIDProduct()}
                            </select> 
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <select ref="categories" className="custom-select" style={{ fontSize: "12px" }}>
                                <option defaultValue=""></option>
                                {this.renderIDCategories()}
                            </select> 
                        </td>
                        <td><center><button className="btn btn-success" style={{ fontSize: "12px" }} onClick={() => this.onBtnAddClick()}>Tambah Produk</button></center></td>
                    </tr>
                </tfoot>
            )
        }
    }
  
    renderlistJoinProduct = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXLocation = renderedProjects.map((item) => {

        if(item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>
                        <select defaultValue={item.nama} ref="updateproduct" className="custom-select" style={{ fontSize: "12px" }}>
                            <option></option>
                            {this.renderIDProduct()}
                        </select> </td>
                    <td>{item.harga}</td>
                    <td><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></td>
                    <td>{item.deskripsi}</td>
                    <td>
                        <select  defaultValue={item.category} ref="updatecategories" className="custom-select" style={{ fontSize: "12px" }}>
                            <option placeholder="pilih ID yang dimaksud"></option>
                            {this.renderIDCategories()}
                        </select>
                    </td>
                    <td>
                        <center>
                        <button className="btn btn-success"
                            onClick={() => this.onBtnSaveClick(item.id)}>
                            Simpan
                        </button>
                        &nbsp;
                        <button className="btn btn-secondary"
                            onClick={() => this.setState( { selectedIdEdit:0 } )}>
                            Batal
                        </button>
                        </center>
                    </td>
                </tr>
            )
        }

        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR') {
            return (
                    <tr>
                        <td style={{ fontSize: "13px" }}>{item.id}</td>
                        {/* <td style={{ fontSize: "13px" }}>{item.idproduct}</td> */}
                        <td style={{ fontSize: "13px" }}>{item.nama}</td>
                        <td style={{ fontSize: "13px" }}>{item.harga}</td>
                        <td style={{ fontSize: "13px" }}><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></td>
                        <td style={{ fontSize: "13px" }}>{item.deskripsi}</td>
                        <td style={{ fontSize: "13px" }}>{item.category}</td>
                        <td>
                            <center>
                                <button className="btn btn-info" 
                                onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                                    Edit
                                </button>
                                    &nbsp;
                                <button className="btn btn-danger"
                                onClick={ () => this.onBtnDeleteClick(item.id) }>
                                    Hapus
                                </button>
                            </center>
                        </td>
                    </tr>
            )
        } 

        return true;

        })
        
        return listJSXLocation;
    }
        
    render() {
        
        if(this.props.username !== "" && this.props.myRole === "SUPERADMIN") {
            
            return(
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                    <form style={{ paddingBottom: '17px', }} className="justify-content-center">
                    <input type="text" className="form-control" style={{ fontSize: "12px", paddingBottom: '10px', }}
                        placeholder="Cari nama produk"
                        ref="namaproduk" onKeyUp={this.onSearch} />
                    </form>
                    </div>
                    <div className="table-responsive col-lg-12">
                        <table className="col-lg-12 table table-striped table-hover border-default shadow-lg" style={{paddingBottom: '5px'}}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>ID</center></th>
                                    {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>ID Produk</center></th> */}
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Nama</center></th>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Harga</center></th>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Image</center></th>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Deskripsi</center></th>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Kategori</center></th>
                                    <th colSpan="1" scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>Pilihan</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.renderlistJoinProduct()}
                            </tbody>
                                    {this.adminAddAction()}
                        </table>
                        <div className="col col-md-3">
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

export default connect(mapStateToProps)(ProductsListView);