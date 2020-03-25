import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { connect } from 'react-redux'
import { FaUserCircle } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { onUserLogout, BukanHome, IniHome,customerSearching,customerChoose  } from '../actions';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArchive, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Badge } from '@material-ui/core'
import axios from 'axios';
import { APIURL } from '../supports/APiUrl';

const cookies = new Cookies();


class Header extends Component {
    state = {
        isOpen: false,
        listcart: [],
        belumscroll: true,
        Products: [],
        Categories: [],
        searchProducts: [],
        test: '',
        join: [],
        keywordcat: '',
        keywordnama: ''
    };

    componentDidMount() {
        document.addEventListener('scroll', () => {
            var isTop = window.scrollY < 510;
            if (isTop === true) {
                this.setState({ belumscroll: isTop })
            }
            else {
                this.setState({ belumscroll: false })
            }
        })
        this.showProducts();
    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }



    
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
    
    onLogoutSelect = () => {
        if (window.confirm('Are you sure want to Logout?')) {
            if (this.props.onUserLogout()) {
            }
            localStorage.removeItem("token");
            cookies.remove('usernameCookie', 'emailCookie', 'roleCookie');
            window.location = '/';
        }
    }

    rendercategory = () => {
        // console.log(this.state.test)
        return this.state.Categories.map((item, index) => {
            return <option key={index} ref="category" style={{ fontSize: "20px" }} value={item.nama}>{item.nama}</option>
            // return this.props.searchKeyword(this.keywordCat.value)
            
            
            
        })
    }

    // onSearchSubmit = (e) => {
    //     e.preventDefault()
    //     this.props.searchKeyword(this.keyword.value)
    //     // if (this.keyword.value) {
    //     //     this.props.history.push("/productsgridview")
    //     // }
    // }

    handleSelectChange = (event) => {
        // this.props.searchKeyword(this.state.keywordCat)
        // if (this.state.keywordcat) {
        //     this.props.history.push("/search-results")
        // }
        
        if(event.target.value === "Pilih category"){
            return this.state.searchProducts
        }
        else if(event.target.value === "Semua Product"){
            return this.showProducts()
        }
        
        this.setState({
          keywordcat: event.target.value
        })
        
    }






    render() {
        // console.log(this.props.Header)
        if (this.props.username === "") {
            return (
                <MDBNavbar color="black" transparent={this.state.belumscroll} scrolling className='bordernav' dark fixed='top' expand="md" style={{ fontSize: 27 }} >
                    <MDBNavbarBrand href='/'>
                        <strong className={'white-text'}>Fahmi Store</strong>
                    </MDBNavbarBrand>
                    <div style={{marginLeft:"200px", width:"160px"}}>
                        <select ref='searchChoose' className='form-control' onChange={(e)=> this.props.customerChoose(e.target.value)}>
                            <option disabled style={{ fontSize: '20px' }} >Pilih category</option>
                            <option value ='' style={{ fontSize: '20px' }} >Semua category</option>
                            {this.rendercategory()}

                        </select>

                    </div>
                    <input  ref='searchInput' onChange={(e)=> this.props.customerSearching(e.target.value)}  type="text" className="form-control" placeholder="products" aria-label="products" aria-describedby="basic-addon1" style={{ fontSize: '20px', width: '500px' }} />
                    <div>

                    <a href={`/products?search=${this.props.search}&category=${this.props.choose}`}>
                    <i class="fa fa-search" style={{fontSize:"20px", marginLeft:"10px", fontColor:"white"}}></i>
                    </a>
                    </div>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    {/* <form className="input-group input-search" onSubmit={this.onSearchSubmit} style={{width:"700px", marginLeft:"300px"}}>
                                    <input ref={(input) => { this.keyword = input }} type="text" className="form-control" placeholder="Search product" id="search-input" />
                                    <div className="input-group-append" style={{marginBottom: ""}}>
                                        <button className="btn btn-success" type="button" id="search-button" onClick={this.onSearchSubmit}><FontAwesomeIcon icon={faSearch} /></button>
                                    </div>
                                </form> */}

                    
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav tag='div' right className='mr-5' >

                            {/* <MDBNavItem >
                        {
                            <MDBNavLink to='/dashboard'>
                                manage Admin
                            </MDBNavLink>

                        }
                        
                        
                            
                    </MDBNavItem> */}
                            <MDBNavItem>

                            </MDBNavItem>

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
                    <a href='/'>
                        <strong className={'white-text'}>pStore</strong>
                    </a>
                    <div style={{marginLeft:"200px", width:"160px"}}>
                        <select ref='searchChoose' className='form-control' onChange={(e)=> this.props.customerChoose(e.target.value)}>
                            <option disabled style={{ fontSize: '20px' }} >Pilih category</option>
                            <option value ='' style={{ fontSize: '20px' }} >Semua category</option>
                            {this.rendercategory()}

                        </select>

                    </div>
                    <input  ref='searchInput' onChange={(e)=> this.props.customerSearching(e.target.value)}  type="text" className="form-control" placeholder="products" aria-label="products" aria-describedby="basic-addon1" style={{ fontSize: '20px', width: '500px' }} />
                    <div>

                    <a href={`/products?search=${this.props.search}&category=${this.props.choose}`}>
                    <i class="fa fa-search" style={{fontSize:"20px", marginLeft:"10px", fontColor:"white"}}></i>
                    </a>
                    </div>
                    {/* <div class="input-group-text" id="basic-addon1" onClick={this.onSearchSubmit} style={{ fontSize: '16px' }}><i class="fa fa-search"></i>
                    </div> */}
                    <MDBNavbarToggler />
                    <MDBCollapse navbar>
                        <MDBNavbarNav tag='div' right className='mr-3' >
                            {/* <MDBNavItem>
                                
                            </MDBNavItem> */}
                            <MDBNavItem style={{ fontSize: 27 }} >
                                <MDBNavLink to='/cart'>
                                    {/* <FiShoppingCart /> Cart */}
                                    <Badge badgeContent={this.props.Cart} color="secondary" style={{ marginRight: "20px" }}>
                                        <FiShoppingCart className="" style={{ color: "white", fontSize: 20, marginRight: "10px" }} />
                                    </Badge>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem style={{ fontSize: 27 }} >
                                <MDBDropdown >
                                    <MDBDropdownToggle nav className='warnanav' >
                                        <FaUserCircle /> hallo, {this.props.username}
                                    </MDBDropdownToggle  >
                                    <MDBDropdownMenu className='dropdown1'   >
                                        <MDBDropdownItem href="wishlist" style={{ fontSize: 15}}>Wishlist</MDBDropdownItem>
                                        <MDBDropdownItem href="history" style={{ fontSize: 15 }}>History</MDBDropdownItem>
                                        <MDBDropdownItem onClick={this.onLogoutSelect} style={{ fontSize: 15}}>Logout</MDBDropdownItem>
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
        Header: state.Header.ishome,
        Cart: state.Cart.cart,
        search: state.Cart.searchInput,
        choose: state.Cart.searchChoose
    }
}

export default connect(mapStateToProps, { onUserLogout, IniHome, BukanHome, customerSearching , customerChoose })(Header);