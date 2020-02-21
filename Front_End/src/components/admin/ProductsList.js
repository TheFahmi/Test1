import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { CustomInput } from 'reactstrap';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ProductsList extends Component {

    state = {   
                listProducts: [], 
                selectedIdEdit: 0, 
                EditBrandImage: 'Choose Image',
                AddBrandImage: 'Choose Image',
                searchListProducts: [], 
                filterForm: '', 
                value: '',
                searchCategory: '',
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
        this.showProducts();
    }

    showProducts = () => {
    axios.get('http://localhost:2002/productlist/getproducts')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listProducts: res.data,
                    searchListProducts: res.data,
                    selectedIdEdit: 0 
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    onBtnAddClick = () => {
        
        if(document.getElementById("AddBrandImage").files[0] !== undefined ) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                nama: this.refs.addname.value,
                harga: this.refs.addprice.value,
                deskripsi: this.refs.adddescription.value,
                // stock: 54,
            }

            if(document.getElementById('AddBrandImage')){
                formData.append('image', document.getElementById('AddBrandImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:2002/productlist/addproduct", formData, headers)
            .then((res) => {
                alert("Add Brand Success")
                this.showProducts();
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    onEditFileImageChange = () => {
        if(document.getElementById("EditBrandImage").files[0] !== undefined) {
            this.setState({EditBrandImage: document.getElementById("EditBrandImage").files[0].name})
        }
        else {
            this.setState({EditBrandImage: 'Pilih Gambar'})
        }
    }

    onBtnSaveClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            nama: this.refs.updatenama.value,
            harga: this.refs.updateharga.value,
            deskripsi: this.refs.updatedeskripsi.value,
        }

        if(document.getElementById('EditBrandImage')){
            formData.append('image', document.getElementById('EditBrandImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put("http://localhost:2002/productlist/editproduct/" + id, formData, headers)
        .then((res) => {
            alert("Edit Brand Success")
            this.showProducts();
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete: ?')) {
            axios.delete('http://localhost:2002/productlist/deleteproduct/' + id)
                .then((res) => {
                    console.log(res);
                    this.showProducts();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    onAddFileImageChange = () => {
        if(document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({AddBrandImage: document.getElementById("AddBrandImage").files[0].name})
        }
        else {
            this.setState({AddBrandImage: 'Pilih Gambar'})
        }
    }

    adminAddAction = () => {
        if(this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'EDITOR') {
            return(
                <tfoot>
                    <tr>
                        {/* <td>&nbsp;</td> */}
                        <td>
                            <input type="text" size="8" placeholder="product name" 
                            ref="addname" style={{ fontSize: "13px" }} 
                            className="form-control" />
                        </td>
                        <td>
                            <input type="number" size="8" placeholder="price" 
                            ref="addprice" style={{ fontSize: "13px" }} 
                            className="form-control" />
                        </td>
                        <td>
                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.EditBrandImage} onChange={this.onAddFileImageChange} />
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input type="text" size="4" placeholder="description" 
                            ref="adddescription" style={{ fontSize: "13px" }} 
                            className="form-control" />
                        </td>
                        <td colspan="2"><center><button className="btn btn-success" style={{ fontSize: "12px" }}
                            onClick={() => this.onBtnAddClick()}><i className="fa fa-plus-circle" style={{fontSize: '14px'}}></i> Add Product</button></center></td>
                    </tr>
                    
                </tfoot>
            )
        }
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchbyname.value;

        var arrSearch = this.state.listProducts.filter((item) => {
            return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProducts: arrSearch })
    }
  
    renderListCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXCategory = renderedProjects.map((item) => {

        if(item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td> */}
                    <td style={{ fontSize: '14px', }}><input type="text" defaultValue={item.nama} size="4" style={{ fontSize: "13px" }} ref="updatenama"className="form-control"></input></td>
                    <td style={{ fontSize: '14px', }}><input type="number" defaultValue={item.harga} size="4" style={{ fontSize: "13px" }} ref="updateharga"className="form-control"></input></td>
                    <td style={{ fontSize: '14px', }}>
                        <CustomInput type="file" id="EditBrandImage" name="EditBrandImage" label={this.state.EditBrandImage} onChange={this.onEditFileImageChange} />
                    </td>
                    <td style={{ fontSize: '14px', }}><input type="text" defaultValue={item.deskripsi} size="4" style={{ fontSize: "13px" }} ref="updatedeskripsi"className="form-control"></input></td>
                    <td className="text-center" style={{ fontSize: '14px', }}>
                        <button className="btn btn-success" title="save" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.onBtnSaveClick(item.id)}>
                            <i className="fa fa-save" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-dark" title="cancel" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.setState( { selectedIdEdit:0 } )}>
                            <i className="fa fa-times" style={{fontSize: '14px'}}></i>
                        </button>
                    </td>
                </tr>
            )
        }

        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR') {
            return (
                <tr>
                    {/* <td style={{ fontSize: '14px', }}>{item.id}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.nama}</td>
                    <td style={{ fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                    <td><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></td>
                    <td style={{ fontSize: '14px', }}>{item.deskripsi}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>
                        <button className="btn btn-info" title="edit" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                            <i className="fa fa-edit" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={ () => this.onBtnDeleteClick(item.id) }>
                            <i className="fa fa-trash" style={{fontSize: '14px'}}></i>
                        </button>
                    </td>
                </tr>
            )
        } 

        return true;

        })
        
        return listJSXCategory;
    }
        
    render() {
        
        if(this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {
            
            return(
                <div style={{ fontSize: "13px" }}>
                    <div className="col-lg-3 pb-5">
                    <form>
                    <input type="text" className="form-control" style={{ fontSize: "12px" }} 
                        placeholder="Search by name"
                        ref="searchbyname" onKeyUp={this.onBtnSearchClick} />
                    </form>
                    </div>
                    <div className="table-responsive col-lg-12">
                        <table className="table table-striped table-hover table-border shadow">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th scope="col" className="font-weight-bold text-center" style={{ fontSize: '14px', }}>ID</th> */}
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Product Name</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Price</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Image</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Description</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }} colSpan="">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListCategory()}
                            </tbody>
                                {this.adminAddAction()}
                        </table>
                        <div className="mx-auto">
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
    return { username: state.auth.username, myRole: state.auth.role }
}

export default connect(mapStateToProps)(ProductsList);