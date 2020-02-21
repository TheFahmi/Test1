import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { onUserVerified } from '../actions';

class Verified extends Component {
    state = { verified: false, loading: true }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var username = params.username;
        var password = params.password;
        axios.post(`http://localhost:2002/auth/verified`, {
            username,
            password
        }).then((res) => {
            this.props.onUserVerified(res.data);
            console.log(res.data)
            this.setState({ loading: false, verified: true })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderContent = () => {
        if(this.state.verified && !this.state.loading) {
            return (
                // <h1>Congrats you are verified! now its the time to find your ninja way!</h1>
                <div className="d-flex justify-content-center" style={{marginTop: '130px'}}>
                    <div className="alert alert-info col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                        <center><b>Congrats you are verified! now its the time to find your gadget!</b><br/></center>
                    </div>
                </div>
            );
        }
        else if(!this.state.verified && !this.state.loading) {
            return (
                // <h1>Sorry Error happened, try to reload this page!</h1>
                <div className="d-flex justify-content-center" style={{marginTop: '130px'}}>
                    <div className="alert alert-danger col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                        <center><b>Sorry Error happened, try to reload this page!</b><br/></center>
                    </div>
                </div>
            );
        }
        return (
            <div className="d-flex justify-content-center" style={{marginTop: '130px'}}>
                <div className="alert alert-info col-md-4 mt-5" style={{ fontSize: "20px" }}>
                    <center><b>Please wait...</b><br/></center>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default connect(null, { onUserVerified })(Verified);
