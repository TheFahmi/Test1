import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { CustomInput,Modal,ModalBody,ModalFooter,ModalHeader,Button,Table } from 'reactstrap';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ProductsList extends Component {

    state = {
        listProducts: [],
        listCategory: [],
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
        itemPerPage: 5,
        isModaladdOpen:false,
        isModaleditopen:false,
        indexedit:0,
        indexdelete:-1,
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.showProducts();
        this.rendercategory();
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
            axios.get('http://localhost:2002/category/getcategory')
            .then((res) => {
                console.log(res);
                this.setState({
                    listCategory: res.data,
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    // showCategory = () => {
        
    // }

    onBtnAddClick = () => {

        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers:
                    { 'Content-Type': 'multipart/form-data' }
            }

            var data = {
                nama: this.refs.addname.value,
                harga: this.refs.addprice.value,
                idcategory: this.refs.addcategory.value,
                deskripsi: this.refs.adddescription.value,
                stok: this.refs.addstok.value
            }

            if (document.getElementById('AddBrandImage')) {
                formData.append('image', document.getElementById('AddBrandImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:2002/productlist/addproduct", formData, headers)
                .then((res) => {
                    alert("Add Brand Success")
                    this.showProducts();
                    this.setState({listProducts:res.data,isModaladdOpen:false})
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    onEditFileImageChange = () => {
        if (document.getElementById("EditBrandImage").files[0] !== undefined) {
            this.setState({ EditBrandImage: document.getElementById("EditBrandImage").files[0].name })
        }
        else {
            this.setState({ EditBrandImage: 'Pilih Gambar' })
        }
    }

    onBtnSaveClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers:
                { 'Content-Type': 'multipart/form-data' }
        }

        var data = {
            nama: this.refs.updatenama.value,
            harga: this.refs.updateharga.value,
            category: this.refs.updatecategory.value,
            deskripsi: this.refs.updatedeskripsi.value,
            stok: this.refs.updatestok.value
        }

        if (document.getElementById('EditBrandImage')) {
            formData.append('image', document.getElementById('EditBrandImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put("http://localhost:2002/productlist/editproduct/" + id, formData, headers)
            .then((res) => {
                alert("Edit Brand Success")
                this.showProducts();
            })
            .catch((err) => {
                console.log(err)
            })
    }
    toogleadd=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }

    toggleedit=()=>{
        this.setState({isModaleditopen:!this.state.isModaleditopen})
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
        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({ AddBrandImage: document.getElementById("AddBrandImage").files[0].name })
        }
        else {
            this.setState({ AddBrandImage: 'Pilih Gambar' })
        }
    }

    rendercategory = () => {
        return this.state.listCategory.map((item,index)=>{
            return <option key={index} ref="addcategory" style={{ fontSize: "13px" }} value={item.id}>{item.nama}</option>
        })
    }

    // adminAddAction = () => {
    //     if (this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'EDITOR') {
    //         return (
    //             <tfoot>
    //                 <tr>
    //                     {/* <td>&nbsp;</td> */}
    //                     <td>
    //                         <input type="text" size="8" placeholder="product name"
    //                             ref="addname" style={{ fontSize: "13px" }}
    //                             className="form-control" />
    //                     </td>
    //                     <td>
    //                         <input type="number" size="8" placeholder="price"
    //                             ref="addprice" style={{ fontSize: "13px" }}
    //                             className="form-control" />
    //                     </td>
    //                     <td>
    //                         <input type="number" size="8" placeholder="stok"
    //                             ref="addstok" style={{ fontSize: "13px" }}
    //                             className="form-control" />
    //                     </td>
    //                     <td>
    //                         <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.EditBrandImage} onChange={this.onAddFileImageChange} />
    //                     </td>
    //                     <td>
    //                     <select defaultValue="1" ref="quantity" innerRef="addcategory" style={{ fontSize: "13px" }} type="number">
                                        
                            
    //                         {this.rendercategory()}
    //                      </select>
    //                     </td>
    //                     <td style={{ textAlign: 'center' }}>
    //                         <input type="text" size="4" placeholder="description"
    //                             ref="adddescription" style={{ fontSize: "13px" }}
    //                             className="form-control" />
    //                     </td>
    //                     <td colspan="2"><center><button className="btn btn-success" style={{ fontSize: "12px" }}
    //                         onClick={() => this.onBtnAddClick()}><i className="fa fa-plus-circle" style={{ fontSize: '14px' }}></i> Add Product</button></center></td>
    //                 </tr>

    //             </tfoot>
    //         )
    //     }
    // }

    onBtnSearchClick = () => {
        var nama = this.refs.searchbyname.value;

        var arrSearch = this.state.listProducts.filter((item) => {
            return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProducts: arrSearch })
    }

    renderProduct = () =>{
        const {listProducts} =this.state 
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        var iniListProduct = renderedProjects.map((val,index)=>{
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.nama}</td>
                    <td>{val.harga}</td>
                    <td>{val.namacategory}</td>
                    <td>{val.stok}</td>                    
                    <td><img src={`http://localhost:2002${val.image}`} alt={val.image} style={{ width: '100px' }}/></td>
                    
                    <td>{val.deskripsi}</td>
                    <td>
                        <button className='btn btn-primary' onClick={()=>this.onEditClick(index)} >Edit</button>
                        <button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
        return iniListProduct
    }

    // renderListCategory = () => {
    //     var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    //     var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    //     var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
    //     var listJSXCategory = renderedProjects.map((item) => {

    //         if (item.id === this.state.selectedIdEdit) {
    //             return (
    //                 <tr>
    //                     {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td> */}
                        
    //                     <td style={{ fontSize: '14px', }}><input type="text" defaultValue={item.nama} size="4" style={{ fontSize: "13px" }} ref="updatenama"className="form-control"></input></td>
                        
    //                     <td style={{ fontSize: '14px', }}><input type="number" defaultValue={item.harga} size="4" style={{ fontSize: "13px" }} ref="updateharga" className="form-control"></input></td>

    //                     <td style={{ fontSize: '14px', }}><input type="number" defaultValue={item.stok} size="4" style={{ fontSize: "13px" }} ref="updatestok" className="form-control"></input></td>
                        
    //                     <td style={{ fontSize: '14px', }}>
    //                         <input type="file" id="EditBrandImage" name="EditBrandImage" label={this.state.EditBrandImage} onChange={this.onEditFileImageChange} />
    //                     </td>
    //                     <td style={{ fontSize: '14px', }}><input type="text" defaultValue={item.deskripsi} size="4" style={{ fontSize: "13px" }} ref="updatedeskripsi" className="form-control"></input></td>
    //                     <td className="text-center" style={{ fontSize: '14px', }}>
    //                         <button className="btn btn-success" title="save" style={{ borderRadius: '30px', height: '30px', width: '30px' }}
    //                             onClick={() => this.onBtnSaveClick(item.id)}>
    //                             <i className="fa fa-save" style={{ fontSize: '14px' }}></i>
    //                         </button>
    //                         &nbsp;
    //                     <button className="btn btn-dark" title="cancel" style={{ borderRadius: '30px', height: '30px', width: '30px' }}
    //                             onClick={() => this.setState({ selectedIdEdit: 0 })}>
    //                             <i className="fa fa-times" style={{ fontSize: '14px' }}></i>
    //                         </button>
    //                     </td>
    //                 </tr>
    //             )
    //         }

    //         if (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR') {
    //             return (
    //                 <tr>
    //                     {/* <td style={{ fontSize: '14px', }}>{item.id}</td> */}
    //                     <td style={{ fontSize: '14px', }}>{item.nama}</td>
    //                     <td style={{ fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
    //                     <td style={{ fontSize: '14px', }}>{item.stok}</td>
    //                     <td><img src={`http://localhost:2002${item.image}`} alt={item.image} style={{ width: '100px' }} /></td>
    //                     <td style={{ fontSize: '14px', }}>{item.namacategory}</td>
    //                     <td style={{ fontSize: '14px', }}>{item.deskripsi}</td>
    //                     {/* <td style={{ fontSize: '14px', }}>
    //                     </td> */}
    //                     <td className="text-center" style={{ fontSize: '14px', }}>
    //                         <button className="btn btn-info" title="edit" style={{ borderRadius: '30px', height: '30px', width: '30px' }}
    //                             onClick={() => this.setState({ selectedIdEdit: item.id })}>
    //                             <i className="fa fa-edit" style={{ fontSize: '14px' }}></i>
    //                         </button>
    //                         &nbsp;
    //                     <button className="btn btn-danger" title="delete" style={{ borderRadius: '30px', height: '30px', width: '30px' }}
    //                             onClick={() => this.onBtnDeleteClick(item.id)}>
    //                             <i className="fa fa-trash" style={{ fontSize: '14px' }}></i>
    //                         </button>
    //                     </td>
    //                 </tr>
    //             )
    //         }

    //         return true;

    //     })

    //     return listJSXCategory;
    // }

    onEditClick=(index)=>{
        this.setState({indexedit:index,isModaleditopen:true})
    }

    render() {
        const {indexedit,listProducts}=this.state 
        if (this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {

            return (
                // <div style={{ fontSize: "13px" }}>
                //     <div className="col-lg-3 pb-5">
                //         <form>
                //             <input type="text" className="form-control" style={{ fontSize: "12px" }}
                //                 placeholder="Search by name"
                //                 ref="searchbyname" onKeyUp={this.onBtnSearchClick} />
                //         </form>
                //     </div>
                //     <div className="table-responsive col-lg-12">
                //         <table className="table table-striped table-hover table-border shadow">
                //             <thead className="thead-dark">
                //                 <tr>
                //                     {/* <th scope="col" className="font-weight-bold text-center" style={{ fontSize: '14px', }}>ID</th> */}
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Product Name</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Price</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>stok</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Image</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Category</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Description</th>
                //                     <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }} colSpan="">Options</th>
                //                 </tr>
                //             </thead>
                //             <tbody>
                //                 {this.renderListCategory()}
                //             </tbody>
                //             {this.adminAddAction()}
                //         </table>
                //         <div className="mx-auto">
                //             <Pagination
                //                 activePage={this.state.activePage}
                //                 itemsCountPerPage={this.state.itemPerPage}
                //                 totalItemsCount={this.state.searchListProducts.length}
                //                 pageRangeDisplayed={5}
                //                 onChange={this.handlePageChange.bind(this)}
                //             />
                //         </div>
                //     </div>
                // </div>
                <div className='pt-5'>
                    <div className="col-lg-3 pb-5">
                         <form>
                     <input type="text" className="form-control" style={{ fontSize: "12px" }}
                                placeholder="Search by name"
                                ref="searchbyname" onKeyUp={this.onBtnSearchClick} />
                        </form>
                    </div>
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleadd}>
                        <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='addname' placeholder='Product name' className='form-control mt-2 '/>
                            <input type="text" ref='addprice' placeholder='Url Image' className='form-control mt-2'/>
                            <input type="number" ref='addstok' placeholder='jumlah stok' className='form-control mt-2'/>
                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.EditBrandImage} onChange={this.onAddFileImageChange} />
                            <select ref='addcategory' className='form-control mt-2'>
                                <option value="" hidden>Pilih category</option>
                                {this.rendercategory()}
                            </select>
                            <textarea cols="20" rows="5" ref='adddescription' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtnAddClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                    this.state.listProducts.length?
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toggleedit}>
                        <ModalHeader toggle={this.toggleedit}>edit data {listProducts[indexedit].name}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='updatenama' defaultValue={listProducts[indexedit].name} placeholder='Product name' className='form-control mt-2 '/>
                            <input type="text" ref='updateprice' defaultValue={listProducts[indexedit].image} placeholder='Url Image' className='form-control mt-2'/>
                            <input type="number" ref='updatestok' defaultValue={listProducts[indexedit].stok} placeholder='jumlah stok' className='form-control mt-2'/>
                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.EditBrandImage} onChange={this.onAddFileImageChange} />
                            <select ref='updatecategory' defaultValue={listProducts[indexedit].kategoriId} className='form-control mt-2'>
                                <option value="" hidden>Pilih category</option>
                                {this.rendercategory()}
                            </select>
                            <input type="number" defaultValue={listProducts[indexedit].harga} ref='updatedesc' placeholder='Harga ' className='form-control mt-2'/>
                            <textarea cols="20" rows="5" defaultValue={listProducts[indexedit].deskripsi} ref='updatedeskripsi' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtnSaveClick}>Save</Button>
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    :
                    null
                    }
                    <button className='btn btn-primary' onClick={this.toogleadd}>Add data</button>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Harga</th>
                                <th>Category</th>                               
                                <th>Stok</th>
                                <th>image</th>
                                <th>Deskripsi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderProduct()}
                        </tbody>
                    </Table>
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
             );
                
            
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