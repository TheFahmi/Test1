import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

class UsersList extends Component {

    state = {   
                listUsers: [], 
                selectedIdEdit: 0, 
                searchListUsers: [], 
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
        this.showUsers();
    }

    showUsers = () => {
    // axios.get(API_URL_1 + '/users')
        axios.get('http://localhost:2002/users/listusers')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listUsers: res.data, 
                    searchListUsers: res.data, 
                    selectedIdEdit: 0 
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    onBtnAddClick = () => {

            const username = this.refs.addusername.value;
            const password = this.refs.addpassword.value;
            const role = this.refs.addrole.value;
            const email = this.refs.addemail.value;
            // const phone = this.refs.addphone.value;
            const status = this.refs.addverifie.value;

        if(username && role && email && status ) {
            axios.post('http://localhost:2002/users/adduser', {
                username, password, role, email, status
            }).then((res) => {
                console.log(res);
                this.showUsers();
            }).catch((err) => {
                console.log(err);
            })
        } else alert('Please fill all input box.')

    }

    onBtnSaveClick = (id) => {
        const username = this.refs.usernameupdate.value;
        const password = this.refs.passwordupdate.value;
        const role = this.refs.roleupdate.value;
        const email = this.refs.emailupdate.value;
        // const phone = this.refs.phoneupdate.value;
        const status = this.refs.statusupdate.value;

        axios.put('http://localhost:2002/users/edituser/' + id, {
            username, password, role, email, status
        }).then((res) => {
            console.log(res);
            this.showUsers();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure want to delete?')) {
            axios.delete('http://localhost:2002/users/deleteuser/' + id)
                .then((res) => {
                    console.log(res);
                    this.showUsers();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    onKeyUpSearch = () => {

        var role = this.refs.role.value;
        var username = this.refs.username.value;

        var arrSearch = this.state.listUsers.filter((item) => {

            return item.role.toLowerCase().includes(role.toLowerCase()) 
                    && item.username.toLowerCase().includes(username.toLowerCase())
            
        })

        this.setState({ searchListUsers: arrSearch })

    }

    adminAddAction = () => {
        if(this.props.myRole === 'SUPERADMIN' || this.props.myRole === 'EDITOR') {
            return(
                <tfoot>
                    <tr>
                        {/* <td></td> */}
                        <td><input type="text" size="8" placeholder="Username" ref="addusername" style={{ fontSize: "13px" }} 
                            className="form-control" /></td>
                        <td><input type="password" size="8" placeholder="Password" ref="addpassword" style={{ fontSize: "13px" }} 
                            className="form-control" /></td>
                        <td>
                            <select ref="addrole" className="custom-select" style={{ fontSize: "12px" }}>
                                <option>SUPERADMIN</option>
                                <option>MEMBER</option>
                                <option>EDITOR</option>
                                <option>ADMIN PAYMENT</option>
                            </select>
                        </td>
                        <td><input type="email" size="8" placeholder="Email" ref="addemail" style={{ fontSize: "13px" }} className="form-control" /></td>
                        {/* <td><input type="number" size="13" placeholder="Phone" ref="addphone" style={{ fontSize: "13px" }} className="form-control" /></td> */}
                        <td>
                            <select ref="addverifie" className="custom-select" style={{ fontSize: "12px" }}>
                                <option>Unverified</option>
                                <option>Verified</option>
                            </select>
                        </td>
                        <td>
                            <center>
                                <button className="btn btn-success" title="add new user" style={{ fontSize: "12px" }} onClick={() => this.onBtnAddClick()}><i className="fa fa-plus-circle" style={{fontSize: '14px'}}></i> Add User</button>
                            </center>
                        </td>
                    </tr>
                </tfoot>
            )
        }
    }
  
    renderListUsers = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListUsers.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXUsers = renderedProjects.map((item) => {

        if(item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td> */}
                    <td style={{ fontSize: '14px', }}><input type="text" defaultValue={item.username} size="4" style={{ fontSize: "12px" }}
                    ref="usernameupdate" className="form-control" /></td>
                    <td style={{ fontSize: '14px', }}><input type="text" size="4" defaultValue={item.password} ref="passwordupdate" 
                    style={{ fontSize: "12px" }} className="form-control" /></td>
                    <td style={{ fontSize: '14px', }}>
                        <select ref="roleupdate" className="custom-select" style={{ fontSize: "12px" }}>
                            <option>{item.role}</option>
                            <option>SUPERADMIN</option>
                            <option>MEMBER</option>
                            <option>EDITOR</option>
                            <option>ADMIN PAYMENT</option>
                        </select>
                    </td>
                    <td style={{ fontSize: '14px', }}><input type="email" defaultValue={item.email} size="4" style={{ fontSize: "12px" }}
                    ref="emailupdate" className="form-control" /></td>
                    {/* <td style={{ fontSize: '14px', }}><input type="number" size="2" defaultValue={item.phone} style={{ fontSize: "12px" }} 
                        ref="phoneupdate" className="form-control" /></td> */}
                    <td style={{ fontSize: '14px', }}>
                        <select ref="statusupdate" className="custom-select" style={{ fontSize: "12px" }}>
                                <option>{item.status}</option>
                                <option>Unverified</option>
                                <option>Verified</option>
                        </select>
                    </td>
                    <td className="text-center" style={{ fontSize: '14px', }}>
                        <center>
                        <button className="btn btn-success" title="save" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.onBtnSaveClick(item.id)}>
                            <i className="fa fa-save" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-dark" title="cancel" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.setState( { selectedIdEdit:0 } )}>
                            <i className="fa fa-times" style={{fontSize: '14px'}}></i>
                        </button>
                        </center>
                    </td>
                </tr>
            )
        }

        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR') {
            return (
                <tr>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.username}</td>
                    <td style={{ fontSize: '14px', }}>encrypt</td>
                    <td style={{ fontSize: '14px', }}>{item.role}</td>
                    <td style={{ fontSize: '14px', }}>{item.email}</td>
                    {/* <td style={{ fontSize: '14px', }}>{item.phone}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.status}</td>
                    <td>
                        <center>
                        <button className="btn btn-info" title="edit" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                            <i className="fa fa-edit" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={ () => this.onBtnDeleteClick(
                                item.id) }>
                            <i className="fa fa-trash" style={{fontSize: '14px'}}></i>
                        </button>
                        </center>
                    </td>
                </tr>
            )
        } 

        return true;

        })
        
        return listJSXUsers;
    }
        
    render() {
        
        if(this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {
            
            return(
                <div>
                    <form id="searchForm">
                    <Row  className="col-lg-12 pb-5" align="center">
                        <Col lg="2">
                            <select ref="role" className="custom-select" style={{ fontSize: "12px" }} 
                            onChange={() => {this.onKeyUpSearch()}}>
                                <option value="">All Roles</option>
                                <option>SUPERADMIN</option>
                                <option>MEMBER</option>
                                <option>ADMIN PAYMENT</option>
                                <option>EDITOR</option>
                            </select>
                        </Col>
                        <Col lg="6">
                            <input type="text" className="form-control" style={{ fontSize: "12px" }} 
                            placeholder="Search"
                            ref="username" onKeyUp={() => {this.onKeyUpSearch()}} />
                        </Col>
                    </Row>
                    </form>
                    <br/>
                    <div className="table-responsive col-lg-12">
                        <table className="table table-striped table-hover shadow-lg">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th scope="col" className="font-weight-bold text-center" style={{ fontSize: '14px', }}>ID</th> */}
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Username</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Password</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Role</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Email</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Status</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.renderListUsers()}
                            </tbody>
                                    {this.adminAddAction()}
                        </table>
                        <div className="mx-auto">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemPerPage}
                                totalItemsCount={this.state.searchListUsers.length}
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

export default connect(mapStateToProps)(UsersList);