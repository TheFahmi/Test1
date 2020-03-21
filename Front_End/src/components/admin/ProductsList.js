import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie'
import Pagination from 'react-js-pagination';
import { APIURL } from '../../supports/APiUrl';
import { CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Button, Table } from 'reactstrap';
const cookie = new Cookies()

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ProductsList extends Component {

    state = {
        listProducts: [],
        listCategory: [],
        selectedIdEdit: 0,
        EditBrandImage: 'Choose Image',
        EditBrandImageFile:'',
        AddBrandImage: 'Choose Image',
        AddBrandImageFile:'',
        searchListProducts: [],
        filterForm: '',
        value: '',
        searchCategory: '',
        uploading: false,
        images: [],
        activePage: 1,
        itemPerPage: 5,
        isModaladdOpen: false,
        isModaleditopen: false,
        indexedit: 0,
        indexdelete: -1,
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
        axios.get(`${APIURL}/productlist/getproducts`)
            .then((res) => {
                console.log(res);
                this.setState({
                    listProducts: res.data,
                    searchListProducts: res.data,
                    selectedIdEdit: 0,
                    indexedit: 0
                });
            }).catch((err) => {
                console.log(err);
            })
        axios.get(`${APIURL}/category/getcategory`)
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

    oneditImageFileChange=(event)=>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            this.setState({EditBrandImage:file.name,EditBrandImageFile:event.target.files[0]})
        }else{
            this.setState({EditBrandImage:'Select Image...',EditBrandImageFile:undefined})
        }
      }

      onAddFileImageChange=(event)=>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            this.setState({AddBrandImage:file.name,AddBrandImageFile:event.target.files[0]})
        }else{
            this.setState({AddBrandImage:'Select Image...',AddBrandImage:undefined})
        }
      }

      onAddFileImageChange = () => {
        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({ AddBrandImage: document.getElementById("AddBrandImage").files[0].name })
             // console.log(document.getElementById('addImagePost').files[0])
        }
        else {
            this.setState({ AddBrandImage: 'Pilih Gambar' })
        }
    }

    onBtnAddClick = () => {

        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers:
                    { 'Content-Type': 'multipart/form-data',
                    Authorization: cookie.get('token') 
                }
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

            axios.post(`${APIURL}/productlist/addproduct`, formData, headers)
                .then((res) => {
                    alert("Add Brand Success")
                    this.showProducts();
                    this.setState({ listProducts: res.data, isModaladdOpen: false })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            alert('Image harus diisi!')
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
            idcategory: this.refs.updatecategory.value,
            deskripsi: this.refs.updatedeskripsi.value,
            stok: this.refs.updatestok.value,
            rating:"5"
        }

        if (document.getElementById('EditBrandImage')) {
            formData.append('image', document.getElementById('EditBrandImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put(`${APIURL}/productlist/editproduct/` + id, formData, headers)
            .then((res) => {
                alert("Edit Brand Success")
                this.showProducts();
                console.log(res)
                this.setState({ isModaleditopen: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    toogleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }

    toggleedit = () => {
        this.setState({ isModaleditopen: !this.state.isModaleditopen })
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete: ?')) {
            axios.delete(`${APIURL}/productlist/deleteproduct/`+id)
                .then((res) => {
                    console.log(res);
                    this.showProducts();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    

    

    rendercategory = () => {
        return this.state.listCategory.map((item, index) => {
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

    renderProduct = () => {
        const { listProducts, indexedit } = this.state
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        var iniListProduct = renderedProjects.map((val, index) => {

            // if(val.id === indexedit){

            return (
                <tr>
                    {/* <td>{index + 1}</td> */}
                    <td>{val.nama}</td>
                    <td>{val.harga}</td>
                    <td>{val.namacategory}</td>
                    <td>{val.stok}</td>
                    <td><img src={`${APIURL}${val.image}`} alt={val.image} style={{ width: '100px' }} /></td>

                    <td>{val.deskripsi}</td>
                    <td>
                        <button className='btn btn-primary' onClick={() => this.setState({isModaleditopen: true, selectedIdEdit: val.id})}  >Edit</button>
                        <button className='btn btn-danger' onClick={() => this.onBtnDeleteClick(val.id)}>Delete</button>
                    </td>
                </tr>
            )
            // }

        })

        return iniListProduct
    }

    renderListCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXCategory = renderedProjects.map((item) => {

            if (item.id === this.state.selectedIdEdit) {
                return (
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toggleedit}>
                        <ModalHeader toggle={this.toggleedit}>edit data {item.id}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='updatenama' defaultValue={item.nama} placeholder='Product name' className='form-control mt-2 ' />
                            <input type="number" ref='updateharga' defaultValue={item.harga} placeholder='Harga' className='form-control mt-2' />
                            <input type="number" ref='updatestok' defaultValue={item.stok} placeholder='jumlah stok' className='form-control mt-2' />
                            <CustomInput type="file" id="EditBrandImage" name="EditBrandImage" label={this.state.EditBrandImage} onChange={this.oneditImageFileChange} />
                            <select ref='updatecategory' defaultValue={item.id} className='form-control mt-2'>
                                
                                {this.rendercategory()}
                            </select>
                            <input type="number" defaultValue={item.harga} ref='updatedesc' placeholder='Harga ' className='form-control mt-2' />
                            <textarea cols="20" rows="5" defaultValue={item.deskripsi} ref='updatedeskripsi' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onBtnSaveClick(item.id)}>Save</Button>
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    // this.state.listProducts.length 

                )
            }

            // if (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR') {
            //     return (

            //         <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleadd}>
            //             <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
            //             <ModalBody>
            //                 <input type="text" ref='addname' placeholder='Product name' className='form-control mt-2 '/>
            //                 <input type="text" ref='addprice' placeholder='Harga' className='form-control mt-2'/>
            //                 <input type="number" ref='addstok' placeholder='jumlah stok' className='form-control mt-2'/>
            //                 <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.AddBrandImage} onChange={this.onAddFileImageChange} />
            //                 <select ref='addcategory' className='form-control mt-2'>
            //                     <option value="" hidden>Pilih category</option>
            //                     {this.rendercategory()}
            //                 </select>
            //                 <textarea cols="20" rows="5" ref='adddescription' className='form-control mt-2' placeholder='deskripsi' ></textarea>
            //             </ModalBody>
            //             <ModalFooter>
            //                 <Button color="primary" onClick={this.onBtnAddClick}>Save</Button>
            //                 <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
            //             </ModalFooter>
            //         </Modal>
                    
            //     )
            // }

            return true;

        })

        return listJSXCategory;
    }

    onEditClick = (index) => {
        this.setState({ indexedit: index.id, isModaleditopen: true })
    }

    render() {
        const { indexedit, listProducts } = this.state
        var id = this.state.listCategory.id
        if (this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {

            return (
                // <div style={{ fontSize: "13px" }}>
                //     <div className="col-lg-3 pb-5e">
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
                            <input type="number" ref='addprice' placeholder='Harga' className='form-control mt-2'/>
                            <input type="number" ref='addstok' placeholder='jumlah stok' className='form-control mt-2'/>
                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.AddBrandImage} onChange={this.onAddFileImageChange} />
                            <select ref='addcategory' className='form-control mt-2'>
                                <option value="" disabled>Pilih category</option>
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
                    this.renderListCategory()
                    :
                    null
                    }

                    <button className='btn btn-primary' onClick={this.toogleadd}>Add data</button>
                    <Table striped>
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
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