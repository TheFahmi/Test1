import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { APIURL } from '../../supports/APiUrl';
import { CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Button, Table } from 'reactstrap';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ListCategory extends Component {

    state = {
        listCategory: [],
        selectedIdEdit: 0,
        searchListCategory: [],
        filterForm: '',
        value: '',

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
        this.showCategory();

        
    }

    showCategory = () => {
        axios.get(`${APIURL}/cat/getallcategory`)
            .then((res) => {
                console.log(res);
                this.setState({
                    listCategory: res.data,
                    searchListCategory: res.data,
                    selectedIdEdit: 0,
                    indexedit: 0
                });
            }).catch((err) => {
                console.log(err);
            })
    }


   

    onBtnAddClick = () => {

            // var headers = {
            //     headers:
            //         { 'Content-Type': 'multipart/form-data',
            //         Authorization: cookie.get('token') 
            //     }
            // }

            var data = {
                nama: this.refs.addname.value,

                
            }

           

            axios.post(`${APIURL}/cat/postcategory`, data )
                .then((res) => {
                    alert("Add Category Success")
                    this.showCategory();
                    this.setState({ listProducts: res.data, isModaladdOpen: false })
                })
                .catch((err) => {
                    console.log(err)
                })
        
       
    }

    




    onBtnSaveClick = (id) => {
        // var headers = {
        //     headers:
        //         { 'Content-Type': 'multipart/form-data' }
        // }




        axios.put(`${APIURL}/cat/editcategory/`,{
            id,
            nama: this.refs.updatenama.value,
        }).then((res) => {
                alert("Edit Category Success")
                console.log(res)
                this.showCategory();
                this.setState({ isModaleditopen: false })
            })
            .catch((err) => {
                console.log(err)
            })
            // window.location = '/admin/managecategory'
    }
    toogleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }

    toggleedit = () => {
        this.setState({ isModaleditopen: !this.state.isModaleditopen })
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete: ?')) {
            axios.delete(`${APIURL}/cat/deletecategory`+id)
                .then((res) => {
                    console.log(res);
                    this.showCategory();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    
    onBtnSearchClick = () => {
        var nama = this.refs.searchbyname.value;

        var arrSearch = this.state.ListCategory.filter((item) => {
            return item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListCategory: arrSearch })
    }

    renderCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListCategory.slice(indexOfFirstTodo, indexOfLastTodo);
        var iniListCategory = renderedProjects.map((val, index) => {

            // if(val.id === indexedit){

            return (
                <tr>
                    {/* <td>{index + 1}</td> */}
                    <td>{val.nama}</td>
                    <td>
                        <button className='btn btn-primary' onClick={() => this.setState({isModaleditopen: true, selectedIdEdit: val.id})}  >Edit</button>
                        <button className='btn btn-danger' onClick={() => this.onBtnDeleteClick(val.id)}>Delete</button>
                    </td>
                </tr>
            )
            // }

        })

        return iniListCategory
    }

    renderListCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListCategory.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXCategory = renderedProjects.map((item) => {

            if (item.id === this.state.selectedIdEdit) {
                return (
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toggleedit}>
                        <ModalHeader toggle={this.toggleedit}>edit data {item.id}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='updatenama' defaultValue={item.nama} placeholder='Nama Category' className='form-control mt-2 ' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onBtnSaveClick(item.id)}>Save</Button>
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>



                )
            }
            return true;

        })

        return listJSXCategory;
    }

    onEditClick = (index) => {
        this.setState({ indexedit: index.id, isModaleditopen: true })
    }

    render() {
        if (this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {

            return (
            
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
                            <input type="text" ref='addname' placeholder='Nama Category' className='form-control mt-2 '/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtnAddClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                    this.state.listCategory.length?
                    this.renderListCategory()
                    :
                    null
                    }

                    <button className='btn btn-primary' onClick={this.toogleadd}>Add data</button>
                    <Table striped>
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
                                <th>Name Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCategory()}
                        </tbody>
                    </Table>
                    <div className="mx-auto">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.searchListCategory.length}
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

export default connect(mapStateToProps)(ListCategory);