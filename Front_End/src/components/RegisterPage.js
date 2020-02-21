import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserRegister } from '../actions';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import Spinner from './Spinner';

const cookies = new Cookies();

class RegisterPage extends Component {

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        // var phone = this.refs.phone.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;
        if(password !== confirmPassword) {
            document.getElementById("error").innerHTML = "Password do not match.";
        } else {
            this.props.onUserRegister({username, email, password});
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('usernameCookie', newProps.username, { path: '/' });
        }
    }

    render () {
        if(this.props.username === "") {
            
            var load;
            if(this.props.loading) {
                load = <center><Spinner /></center>;
            } else {
                load =  <center>
                            <Button color="primary" size="lg" block style={{ fontSize: "13px" }} 
                                onClick={this.onBtnRegisterClick}><b>Register</b></Button>
                            <br/><br/>
                            <div id="error" style={{ fontSize: "13px" }}></div>
                        </center>;
            }

            var alertRegister = this.props.errorRegister;

            if(alertRegister) {
                var alertReg = <p align='left' style={{ fontSize: '13px' }} 
                                    className="alert alert-danger">
                                    &nbsp;{this.props.errorRegister}</p>;
              }

            return (
                <div style={{height: "700px"}}>
                    <div className="full-width-div card bg-white col-md-12" style={{paddingBottom: '50px', marginTop: '-50px'}}>
                    <article className="col-md-3 card-body mx-auto shadow p-3 bg-white rounded border mx-auto" style={{marginTop: '60px'}}>
                        <h5 className="card-title mt-3 text-center" 
                        style={{ fontSize: "34px" }}>REGISTER</h5>
                        <br/>
                        <form style={{ paddingRight: "40px", paddingLeft: '40px', paddingBottom: '20px' }}>
                            <div className="form-group">
                                <h3 className="text-left" ><i className="fa fa-user"></i> username</h3>
                                <input type="text" ref="username" className="form-control form-control-lg" style={{ fontSize: "14px", marginBottom: "15px" }}/>
                            </div>
                            <div className="form-group">
                                <h3 className="text-left"><i className="fa fa-envelope"></i> email</h3>
                                <input type="email" ref="email" className="form-control form-control-lg" 
                                style={{ fontSize: "14px", marginBottom: "15px"  }} />
                            </div>
                            {/* <div className="form-group">
                                <h3 className="text-left"><i className="fa fa-unlock-alt"></i> password</h3>
                                <input type="text" ref="phone" className="form-control form-control-lg" 
                                style={{ fontSize: "14px", marginBottom: "15px"  }} />
                            </div> */}
                            <div className="form-group">
                                <h3 className="text-left"><i className="fa fa-unlock-alt"></i> password</h3>
                                <input ref="password" className="form-control form-control-lg" 
                                type="password" style={{ fontSize: "14px", marginBottom: "15px"  }} />
                            </div>
                            <div className="form-group">
                                <h3 className="text-left"><i className="fa fa-unlock-alt"></i> confirm password</h3>
                                <input ref="confirmPassword" className="form-control form-control-lg" 
                                type="password" style={{ fontSize: "14px", marginBottom: "15px"  }} />
                            </div>
                            <br/>                         
                            <div className="form-group">
                                {alertReg}
                                {load}
                            </div>
                            <p className="text-center" style={{ fontSize: "14px" }}>Have an account? &nbsp;
                            <Link to="/login">Login</Link></p>      
                        </form>
                    </article>
                    </div>
                </div>
            )

        } 
        
        return <Redirect to="/waitingverification" />

    }
    
}

const mapStateToProps = (state) => {
    return { username: state.auth.username,
             loading: state.auth.loading, 
             errorRegister: state.auth.errorRegister 
            };
}
    
export default connect(mapStateToProps, { onUserRegister })(RegisterPage);