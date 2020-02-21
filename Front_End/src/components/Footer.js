import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="full-width-div">
             <footer class="page-footer font-small unique-color-dark">
                    <div class="container">
                    <div class="row">
                        <div class="col-md-12 py-5" style={{height: "55px"}}>
                        <div class="mb-5 flex-center">
                            {/* <a href="#" target="_blank" rel="noopener noreferrer" class="fb-ic">
                            <i class="fa fa-facebook fa-lg white-text mr-md-5 mr-3 fa-3x"> </i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="tw-ic">
                            <i class="fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-3x"> </i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="ins-ic">
                            <i class="fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-3x"> </i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="pin-ic">
                            <i class="fa fa-github fa-lg white-text mr-md-5 mr-3 fa-3x"></i>
                            </a> */}
                        </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copyright text-center py-3" style={{marginBottom: "-24px", fontSize: '12px'}}>© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/">  Fahmi</a>
                </div>
              </footer>
            </div>
        )
    }
}

export default Footer;

