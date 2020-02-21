import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onUserLogin} from '../actions';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Spinner from './Spinner';
import axios from 'axios';

const cookies = new Cookies();

class LoginPage extends Component {
    state = { role: '' };

    onBtnSubmit = () => {
      var username = this.refs.username.value;
      var password = this.refs.password.value;
      this.props.onUserLogin({username, password})
      // axios.post("http://localhost:2002/user/user", {username , password})
      axios.post("http://localhost:2002/user/user", {
        username, 
        password
      }).then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      })
      
    }

    componentWillReceiveProps(newProps) {
      if(newProps.username !== '') {
        cookies.set('usernameCookie', newProps.username, { path: '/' });
        cookies.set('roleCookie', newProps.role, { path: '/' });
      }
    }

    render() {

      if(this.props.username === "") {

        var alertLogin = this.props.errorLogin;
        if(alertLogin) {
          var alertLog = <p align='left' style={{ fontSize: '13px' }} 
                        className="alert alert-danger">
                        &nbsp;{this.props.errorLogin}</p>;
        }

        var load;
        if(this.props.loading) {
            load = <center><Spinner /></center>;

        } else {
            load = <center><Button color="primary" size="lg" block style={{ fontSize: "14px" }} 
              onClick={this.onBtnSubmit}><b>Sign in</b></Button></center>;
        }

        return (
          <div style={{height: "700px"}}>
          <div className="full-width-div card bg-white col-12" style={{paddingBottom: '100px', marginTop: '-30px'}}>
              <br/><br/>
              <article className="col-md-3 card-body mx-auto shadow p-3 bg-white rounded border mx-auto" style={{marginTop: '60px'}}>
                <br/>
                <form style={{ paddingRight: "40px", paddingLeft: '40px', paddingBottom: '44px' }}>
                <h5 style={{ textAlign: 'center', fontSize: "34px", paddingBottom: '20px'}}>LOGIN</h5><br/>
                  <div className="form-group">
                    <h3 className="text-left"><i className="fa fa-user"></i> username</h3>
                  <input ref="username" className="form-control form-control-lg" style={{ fontSize: "14px" }} 
                  type="text" />
                  </div>
                  <div className="form-group">
                    <h3 className="text-left"><i className="fa fa-unlock-alt"></i> password</h3>
                  <input ref="password" className="form-control form-control-lg" style={{ fontSize: "14px" }} 
                  type="password" />
                </div>
                <br/>
                {alertLog}
                {load}
                </form>
                <p className="text-center" style={{ fontSize: "14px" }}>Don't have an account? &nbsp;
                        <Link to="/register">Register</Link> </p>
              <br/>
              </article>
            </div>
            </div>
        )

      }

      return <Redirect to="/" />

    }
}

const mapStateToProps = (state) => {
    return { 
      username: state.auth.username, 
      role: state.auth.role,
      email: state.auth.email, 
      errorLogin: state.auth.errorLogin,
      loading: state.auth.loading
     };
}
    
export default connect(mapStateToProps, { onUserLogin })(LoginPage);