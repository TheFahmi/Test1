import React, { Component } from 'react';
// import {
//     FaFacebookF,
//     FaTwitter,
//     FaInstagram,
//     FaEnvelope,
//     FaLinkedin
// } from 'react-icons/fa';

class Footer extends Component {
    render() {
        return (
            
            <footer class="footer footer-black footer-big">
            <div className="container ">

                <div className="content">
                    <div className="row">
                    
                        <div className="col-md-5 ">
                            <a href="#pablo"><h5>Fahmi Store</h5></a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec imperdiet justo, eget sollicitudin libero. Fusce sit amet felis vel ligula tincidunt ullamcorper sit amet in sapien. Nunc vitae mi massa. Fusce ornare bibendum sapien. Sed scelerisque tortor dui, sit amet dignissim ex tincidunt non. Morbi fermentum congue auctor.</p>
                        </div>
                        <div className="col-md-2">
                            <h5>About</h5>
                            <ul className="links-vertical">
                                <li>
                                    <a href="#pablo">
                                        Blog
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        About Us
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Presentation
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Contact Us
	            								</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5>Market</h5>
                            <ul className="links-vertical">
                                <li>
                                    <a href="#pablo">
                                        Sales FAQ
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        How to Register
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Sell Goods
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Receive Payment
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Transactions Issues
	            								</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-2">
                            <h5>Legal</h5>
                            <ul className="links-vertical">
                                <li>
                                    <a href="#pablo">
                                        Transactions FAQ
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Terms & Conditions
	            								</a>
                                </li>
                                <li>
                                    <a href="#pablo">
                                        Licenses
	            								</a>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="col-md-3">
                            <h5>Subscribe to Newsletter</h5>
                            <p>
                                Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.
	            						</p>
                            <form className="form form-newsletter" method="" action="">

                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Your Email...">
	            							</div>

                                    <button type="button" className="btn btn-primary btn-just-icon" name="button">
                                        <i className="material-icons">mail</i>
                                    </button>

	            						</form>
	            					</div>

                        </div> */}
                    </div>

                    <hr />

                    {/* <ul className="social-buttons">
                        <li>
                            <a href="#pablo" className="btn btn-just-icon btn-simple btn-twitter">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="btn btn-just-icon btn-simple btn-facebook">
                                <i className="fa fa-facebook-square"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="btn btn-just-icon btn-simple btn-dribbble">
                                <i className="fa fa-dribbble"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="btn btn-just-icon btn-simple btn-google">
                                <i className="fa fa-google-plus"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="btn btn-just-icon btn-simple btn-youtube">
                                <i className="fa fa-youtube-play"></i>
                            </a>
                        </li>
                    </ul> */}

                    <div className="copyright pull-center">
                        Copyright &copy; {(new Date().getFullYear())} Fahmi All Rights Reserved.
	            	</div>
                </div>
                </div>
                </footer>
                );
            }
        }
        
export default Footer;