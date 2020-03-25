import React, { Component } from 'react';
import ProductsGridView from './ProductsGridView';
import { connect } from 'react-redux';
import Carousels from './Carousel';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HomeCard from './HomeCard';
import Dashboard from './admin/Dashboard';
import ConfirmTrx from './admin/ConfirmTrx';
import ManageProducts from './admin/ManageProducts';
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { BukanHome, IniHome } from '../actions'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';
import { APIURL } from '../supports/APiUrl';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";

class HomePage extends Component {

  state = {
    Products: [],
    photos: [
      'https://cdn.neow.in/news/images/uploaded/2018/09/1536774109_screenshot_(25).jpg',
      'https://i.ytimg.com/vi/naIaW4pk_-o/maxresdefault.jpg',
      'https://assets.pcmag.com/media/images/527386-apple-ipad-pro.jpg?width=810&height=456'
    ]
  }

  componentDidMount() {
    this.showProducts();
    this.props.IniHome()
  }

  showProducts = () => {
    axios.get(`${APIURL}/product/getproducthome`)
      .then((res) => {
        console.log(res);
        this.setState({
          Products: res.data,
        });
      }).catch((err) => {
        console.log(err);
      })
  }

  renderiPhone = () => {
    var listJSXProducts = this.state.Products.map((item) => {
      return (
        <LazyLoad height={'100%'} offset={500}>

          <HomeCard products={item} />
        </LazyLoad>

      )
    })
    return listJSXProducts;

  }

  renderphoto = () => {
    return this.state.photos.map((val, index) => {
      return (
        <MDBCarouselItem key={index} itemId={index + 1}>
          <MDBView>
            <div style={{ width: '100%', height: 650, display: 'flex' }}>
              <img
                // className=""
                src={val}
                alt="First slide"
                // height='100%'
                width='100%'
              />
            </div>
            <MDBMask overlay="black-slight" />
          </MDBView>
        </MDBCarouselItem>
      )
    })
  }

  render() {

    if (this.props.products.id !== 0) {
      if (this.props.username !== "") {
        if (this.props.status === "Verified") {
          return <Redirect to={`/productsdetails?id=${this.props.products.id}`} />
        } else {
          return <Redirect to="/waitingverification" />
        }
      } else {
        return <Redirect to="/login" />
      }
    }



    if (this.props.myRole === 'SUPERADMIN') {
      return (
        <Redirect to='/admin/Dashboard' />
      )
    } else if (this.props.myRole === 'ADMIN PAYMENT') {
      return (
        <Redirect to='/admin/confirmtransaction' />
      )
    } else if (this.props.myRole === 'EDITOR') {
      return (
        <Redirect to='/admin/manageproducts' />
      )
    } else if (this.props.myRole === 'MEMBER' && this.props.username == '') {
      return (
        <Redirect to="/products" /> 
      )
    } else {

      var settings =
      {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

      };
      var settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

      };
      return (


        <div style={{marginRight:"-15px", marginLeft:"-15px"}}>
          
          <MDBCarousel
            activeItem={1}
            length={this.state.photos.length}
            interval={1800}
            showIndicators={false}
            showControls={false}
          >
            <MDBCarouselInner>
              {this.renderphoto()}
            </MDBCarouselInner>
          </MDBCarousel>
          <div className='px-5 pt-3'>
            <div style={{marginLeft: "15px", marginTop:"20px"}}><h1>Our new Product <FaArrowAltCircleRight /></h1> </div>

            <div className=' justify-content-center'>
              {
                window.innerWidth > 400 ?
                  <Slider {...settings}>{this.renderiPhone()}</Slider> :
                  <Slider {...settings2}>{this.renderiPhone()}</Slider>
              }


            </div>
          </div>
         
          <div className="row mt-5">
          
            <div className="col col-md-6 firstBackground2" style={{ height: '400px' }}>
            </div>
            <div className="col col-md-6 bg-light border">
              <h1 className="text-center text-uppercase bold" style={{ paddingTop: '100px' }}>iPhone'</h1>
              <h5 className="text-center" style={{ fontSize: '18px', fontFamily: 'calibri', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px' }}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h5>
              <center style={{ paddingTop: '10px' }}><button type="button" className="btn btn-primary btn-lg" style={{ width: '150px', paddingTop: '10px' }}>Buy Now</button></center>
            </div>
            
          </div>
          <div className="row mt-6">
            <div className="col col-md-6 bg-light border">
              <h1 className="text-center text-uppercase bold" style={{ paddingTop: '100px' }}>iWatch </h1>
              <h5 className="text-center" style={{ fontSize: '18px', fontFamily: 'calibri', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px' }}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h5>
              <center style={{ paddingTop: '10px' }}><button type="button" className="btn btn-primary btn-lg" style={{ width: '150px', paddingTop: '10px' }}>Buy Now</button></center>
            </div>
            <div className="col col-md-6 firstBackground" style={{ height: '400px', }}>
            </div>            
          </div>  
        </div>

      )
    }

  }
}


const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    myRole: state.auth.role,
    products: state.selectedProducts,
    status: state.auth.status,
    islogin: state.auth.islogin
  }

}

export default connect(mapStateToProps, { bukan: BukanHome, IniHome })(HomePage);