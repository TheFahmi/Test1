import React, { Component } from 'react';

class WaitingVerification extends Component {
    render() {
        return (
            <div style={{ height: '329px'}}>
            <div className="d-flex justify-content-center" style={{marginTop: '130px',}}>
                <div className="alert alert-warning col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                  <center><b>Please Check Your Email For Account Verification Process</b><br/></center>
                </div>
            </div>
            </div>
        )
    }
}

export default WaitingVerification;
