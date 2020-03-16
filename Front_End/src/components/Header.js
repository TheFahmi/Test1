import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { connect } from 'react-redux'
import { FaUserCircle } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { onUserLogout, BukanHome, IniHome } from '../actions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Header extends Component {
    state = {
        isOpen: false,
        listcart: []
    };

    
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogoutSelect = () => {
        if (window.confirm('Are you sure want to Logout?')) {
            if (this.props.onUserLogout()) {
            }
            cookies.remove('usernameCookie', 'emailCookie', 'roleCookie');
            window.location = '/';
        }
    }



    render() {
        console.log(this.props.Header)
        if (this.props.username === "") {
            return (
                <MDBNavbar color="black" transparent={this.props.Header} scrolling className='bordernav' dark fixed='top' expand="md" style={{ fontSize: 27 }} >
                    <MDBNavbarBrand href='/'>
                        <strong className={'white-text'}>pStore</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav tag='div' right className='mr-5' >
                            {/* <MDBNavItem >
                        {
                            <MDBNavLink to='/dashboard'>
                                manage Admin
                            </MDBNavLink>

                        }
                            
                    </MDBNavItem> */}
                            {/* <MDBNavItem>
                        <MDBNavLink to='/cart'>
                            <FiShoppingCart style={{fontSize:27}}/> Cart 
                        </MDBNavLink>
                    </MDBNavItem> */}
                            <MDBNavItem>
                                {

                                    <MDBNavLink to='/login'>
                                        Login
                            </MDBNavLink>

                                }
                            </MDBNavItem>

                            {/* <MDBNavItem>
                        {

                            <MDBDropdown >
                                <MDBDropdownToggle nav className='warnanav' >
                                    <FaUserCircle/> hallo, {this.props.username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown1' >
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!"></MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>

                        }
                    </MDBNavItem> */}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            )
        } else if (this.props.username !== '' && this.props.role === 'MEMBER') {
            return (

                <MDBNavbar color="black" transparent={false} scrolling className='bordernav' dark fixed='top' expand="md">
                    <MDBNavbarBrand href='/'>
                        <strong className={'white-text'}>pStore</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler/>
                    <MDBCollapse navbar>
                        <MDBNavbarNav tag='div' right className='mr-3' >
                            {/* <MDBNavItem>
                                
                            </MDBNavItem> */}
                            <MDBNavItem style={{ fontSize: 27 }} >
                                <MDBNavLink to='/cart'>
                                    <FiShoppingCart /> Cart
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem style={{ fontSize: 27 }} >  
                                <MDBDropdown >
                                    <MDBDropdownToggle nav className='warnanav' >
                                        <FaUserCircle /> hallo, {this.props.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className='dropdown1' style={{ fontSize: 20 }} >
                                        <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                        <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                        <MDBDropdownItem onClick={this.onLogoutSelect} >Logout</MDBDropdownItem>
                                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            )
        } else {
            return (
                <MDBNavbar color="black" transparent={false} scrolling className='bordernav' dark fixed='top' expand="md">
                    <MDBNavbarBrand href='/'>
                        <strong className={'white-text'}>pStore</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav tag='div' right className='mr-5' >
                            <MDBNavItem >
                                    <MDBNavLink to='/'>
                                        manage Admin
                                     </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>

                                    <MDBDropdown >
                                        <MDBDropdownToggle nav className='warnanav' >
                                            <FaUserCircle /> hallo, {this.props.username}
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu className='dropdown1' >
                                            <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                            <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.onLogoutSelect} >Logout</MDBDropdownItem>
                                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            )

        }

    }
}


const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        role: state.auth.role,
        Header: state.Header.ishome
    }
}

export default connect(mapStateToProps, { onUserLogout, IniHome, BukanHome })(Header);











// import React, { Component } from 'react';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     // NavLink
// } from 'reactstrap';
// // import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { onUserLogout } from '../actions';
// import Cookies from 'universal-cookie';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faSearch, faArchive, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

// const cookies = new Cookies();

// class HeaderReact extends Component {

//     state = {
//         listCart: []
//     }

//     constructor(props) {
//         super(props);

//         this.toggle = this.toggle.bind(this);
//         this.state = {
//             isOpen: false
//         };
//     }

//     toggle() {
//         this.setState({
//             isOpen: !this.state.isOpen
//         });
//     }

//     onLogoutSelect = () => {
//         if (window.confirm('Are you sure want to Logout?')) {
//             if (this.props.onUserLogout()) {
//             }
//             cookies.remove('usernameCookie', 'emailCookie', 'roleCookie');
//             window.location = '/';
//         }
//     }

//     render() {
//         if (this.props.username === "") {

//             return (
//                 <div style={{ margin: '0 0 90px 0' }}>
//                     <Navbar color="dark" dark expand="md" fixed="top" className="shadow">
//                         <NavbarBrand href="/" style={{ fontSize: "16px", lineHeight: 'auto' }}>
//                             <h2 style={{ lineHeight: '40px' }}>iGadget Store</h2>
//                         </NavbarBrand>
//                         <NavbarToggler onClick={this.toggle} />
//                         <Collapse isOpen={this.state.isOpen} navbar>

//                             <ul className="navbar-nav ml-auto">


//                                 <li className="material-icons">
//                                     <a className="nav-link" href="login">
//                                         Login
//                                      </a>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a href="/register" className="btn btn-rose btn-raised btn-round" data-toggle="dropdown">
//                                         Register
// 	                                </a>
//                                 </li>

//                             </ul>
//                         </Collapse>
//                     </Navbar>
//                 </div>
//             )

//         } else if (this.props.username !== '' && this.props.role === 'MEMBER') {
//             return (

//                 <div style={{ margin: '0 0 90px 0' }}>
//                     <Navbar color="dark" dark expand="md" fixed="top" className="shadow">
//                         <NavbarBrand href="/" style={{ fontSize: "16px" }}>
//                             <h2 style={{ lineHeight: '40px' }}>Hai, {this.props.username}</h2>
//                         </NavbarBrand>
//                         <NavbarToggler onClick={this.toggle} />
//                         <Collapse isOpen={this.state.isOpen} navbar>
//                             <Nav className="ml-auto" navbar style={{ fontSize: "27px", fontWeight: "bold" }}>
//                                 <NavItem style={{ fontSize: '16px', lineHeight: '27px' }}>
//                                     <button type="button" className="btn btn-danger btn-raised btn-round" onClick={this.onLogoutSelect}>Log out</button>
//                                 </NavItem>
//                             </Nav>
//                         </Collapse>
//                     </Navbar>
//                     <div style={{ height: '40px', marginRight: '-15px', marginLeft: '-15px', marginTop: '60px', backgroundColor: 'silver', fontSize: '16px', lineHeight: '2em' }} className="text-center fixed-top font-weight-normal">
//                         <div style={{ marginTop: '3px' }}>
//                             <span><a href="/" style={{ marginRight: '40px' }}><i className="fa fa-th"></i>  Product &nbsp;</a></span>
//                             <span><a href="/cart" style={{ marginRight: '40px' }}><i className="fa fa-shopping-cart"></i>  Cart &nbsp;</a></span>
//                             <span><a href="/wishlist" style={{ marginRight: '40px' }}><i className="fa fa-heart"></i> Wishlist &nbsp;</a></span>
//                             <span><a href="/history" style={{ marginRight: '0px' }}><i className="fa fa-history"></i>  History Trx &nbsp;</a></span>
//                             <span><a href="/confirmorder" style={{ marginLeft: '40px' }}><i className="fa fa-shopping-basket"></i>  Confirm Payment &nbsp;</a></span>
//                         </div>
//                     </div>
//                 </div>
//             )
//         } else {
//             return (
//                 <div style={{ margin: '0 0 90px 0' }}>
//                     <Navbar color="light" light expand="md" fixed="top" className="shadow">
//                         <NavbarBrand href="/" style={{ fontSize: "16px" }}>
//                             <h2 style={{ lineHeight: '40px' }}>You Are, {this.props.username}</h2>
//                         </NavbarBrand>
//                         <NavbarToggler onClick={this.toggle} />
//                         <Collapse isOpen={this.state.isOpen} navbar>
//                             <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
//                                 <NavItem style={{ fontSize: '14px', lineHeight: '14px' }}>
//                                     <button type="button" className="btn btn-outline-primary" onClick={this.onLogoutSelect} >Log out</button>
//                                 </NavItem>
//                             </Nav>
//                         </Collapse>
//                     </Navbar>
//                 </div>
//             )
//         }

//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         username: state.auth.username,
//         role: state.auth.role
//     }
// }

// export default connect(mapStateToProps, { onUserLogout })(HeaderReact);