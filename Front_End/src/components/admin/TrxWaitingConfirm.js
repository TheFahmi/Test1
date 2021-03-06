import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { APIURL } from '../../supports/APiUrl';

class CategoryList extends Component {

    state = {   
                listCategory: [], 
                selectedIdEdit: 0, 
                searchListCategory: [], 
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
        this.showCategory();
        // this.onBtnSeach();
    }

    showCategory = () => {
    axios.get(`${APIURL}/category/categories`)
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listCategory: res.data, 
                    searchListCategory: res.data, 
                    selectedIdEdit: 0 
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    onBtnAddClick = () => {
        const jenis = this.refs.addcategories.value;
        console.log(jenis)
        if(jenis) {
            axios.post(`${APIURL}/category/addcategories`, {
                jenis
            }).then((res) => {
                console.log(res);
                this.showCategory();
            }).catch((err) => {
                console.log(err);
            })
        } else alert('Please fill input box.')

        // this.refs.addcategories.reset();
        // this.refs.addcategories.focus();

    }

    onBtnSaveClick = (id) => {
        const jenis = this.refs.updatecategory.value;
        console.log(jenis)
        // axios.put(API_URL_1 + '/category/' + id, {
        axios.put(`${APIURL}/category/editcategory/${id}`, {
            jenis
        }).then((res) => {
            console.log(res);
            //=======> Activity Log
            // this.props.onActivityLog({username: this.props.username, role: this.props.myRole, desc: 'Edit category: '+jenis});
            this.showCategory();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (id, jenis) => {
        if(window.confirm('Are you sure want to delete: ' + jenis + ' ?')) {
            // axios.delete(API_URL_1 + '/category/' + id)
            axios.delete(`${APIURL}/category/catdelete/` + id)
                .then((res) => {
                    console.log(res);
                    //=======> Activity Log
                // this.props.onActivityLog({username: this.props.username, role: this.props.myRole, desc: 'Delete category: '+name});
                    this.showCategory();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    adminAddAction = () => {
        if(this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'ADMIN PAYMENT') {
            return(
                <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <td>
                            <form ref="formAdd">
                                <input type="text" size="8" placeholder="Add new category" 
                                ref="addcategories" style={{ fontSize: "13px" }} 
                                className="form-control" />
                            </form>
                        </td>
                        <td><center><button className="btn btn-success" style={{ fontSize: "12px" }}
                        onClick={() => this.onBtnAddClick()}>
                        <i className="fa fa-plus"></i> Add</button></center></td>
                    </tr>
                    
                </tfoot>
            )
        }
    }
  
    renderListCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListCategory.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXCategory = renderedProjects.map((item) => {

        if(item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    <td><center>{item.id}</center></td>
                    <td><input type="text" defaultValue={item.jenis} size="4" style={{ fontSize: "13px" }}
                    ref="updatecategory" className="form-control" /></td>
                    <td>
                        <center>
                        <button className="btn btn-success"
                            onClick={() => this.onBtnSaveClick(item.id)}>
                            <i className="fa fa-save fa-sm"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-secondary"
                            onClick={() => this.setState( { selectedIdEdit:0 } )}>
                            <i className="fa fa-times fa-sm"></i>
                        </button>
                        </center>
                    </td>
                </tr>
            )
        }
        //====================END >> EDIT ITEM PRODUK=========================//

        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT') {
            return (
                <tr>
                    <td><center>{item.id}</center></td>
                    <td>{item.jenis}</td>
                    <td>
                        <center>
                        <button className="btn btn-info" 
                            onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                            <i className="fa fa-edit fa-sm"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger"
                            onClick={ () => this.onBtnDeleteClick(
                                item.id, 
                                item.jenis) }>
                            <i className="fa fa-trash fa-sm"></i>
                        </button>
                        </center>
                    </td>
                </tr>
            )
        } 

        return true;

        })
        
        return listJSXCategory;
    }
        
    render() {
        
        if(this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT')) {
            
            return(
                <div style={{ fontSize: "13px" }} className="card shadow p-3 mb-5 bg-white rounded">
                    <br/>
                    <div className="col-lg-6">
                    <form id="searchForm">
                    <input type="text" className="form-control" style={{ fontSize: "12px" }} 
                            placeholder="Search by name"
                            // ref="searchbyname" onKeyUp={() => { this.onKeyUpSearch() }} />
                            ref="searchbyname" onKeyUp={() => { this.onBtnSeach() }} />
                    </form>
                    </div>
                    <br/>
                    <div className="table-responsive col-lg-6">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th><center>ID</center></th>
                                    <th><center>Nama</center></th>
                                    <th colSpan="2"><center>Pilihan</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListCategory()}
                            </tbody>
                                    {this.adminAddAction()}
                        </table>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.searchListCategory.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
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

export default connect(mapStateToProps)(CategoryList);