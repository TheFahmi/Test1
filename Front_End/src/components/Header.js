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
import { Badge } from '@material-ui/core'

const cookies = new Cookies();


class Header extends Component {
    state = {
        isOpen: false,
        listcart: [],
        belumscroll: true
    };

    componentDidMount(){
        document.addEventListener('scroll', () => {
          var isTop = window.scrollY < 510;
          if (isTop === true) {
              this.setState({ belumscroll: isTop })
          }
          else{
            this.setState({ belumscroll: false })
          }
        })
       }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogoutSelect = () => {
        if (window.confirm('Are you sure want to Logout?')) {
            if (this.props.onUserLogout()) {
            }
            localStorage.removeItem("token");
            cookies.remove('usernameCookie', 'emailCookie', 'roleCookie');
            window.location = '/';
        }
    }



    render() {
        console.log(this.props.Header)
        if (this.props.username === "") {
            return (
                <MDBNavbar color="black" transparent={this.state.belumscroll} scrolling className='bordernav' dark fixed='top' expand="md" style={{ fontSize: 27 }} >
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

                <MDBNavbar color="black" transparent={this.state.belumscroll} scrolling className='bordernav' dark fixed='top' expand="md">
                    <MDBNavbarBrand href='/'>
                        <strong className={'white-text'}>pStore</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler />
                    <MDBCollapse navbar>
                        <MDBNavbarNav tag='div' right className='mr-3' >
                            {/* <MDBNavItem>
                                
                            </MDBNavItem> */}
                            <MDBNavItem style={{ fontSize: 27 }} >
                                <MDBNavLink to='/cart'>
                                    {/* <FiShoppingCart /> Cart */}
                                    <Badge badgeContent={this.props.Cart} color="secondary" style={{marginRight:"20px"}}>
                                        <FiShoppingCart className="" style={{ color: "white", fontSize: 20, marginRight: "10px"}} />
                                    </Badge>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem style={{ fontSize: 27 }} >
                                <MDBDropdown >
                                    <MDBDropdownToggle nav className='warnanav' >
                                        <FaUserCircle /> hallo, {this.props.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className='dropdown1'  >
                                        <MDBDropdownItem href="wishlist"  style={{ fontSize: 15 }}>Wishlist</MDBDropdownItem>
                                        <MDBDropdownItem href="history" style={{ fontSize: 15 }}>History</MDBDropdownItem>
                                        
                                        <MDBDropdownItem href="confirmorder" >Confirm Order</MDBDropdownItem>
                                        <MDBDropdownItem onClick={this.onLogoutSelect} >Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            )
        } else {
            return (
                <MDBNavbar color="black" transparent={this.state.belumscroll} scrolling className='bordernav' dark fixed='top' expand="md">
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
        Header: state.Header.ishome,
        Cart:state.Cart.cart
    }
}

export default connect(mapStateToProps, { onUserLogout, IniHome, BukanHome })(Header);