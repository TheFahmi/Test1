import React from "react";
import { Button } from 'reactstrap';
import { MDBRow, MDBCol, MDBCard} from "mdbreact";

const Jumbotron = () => {
  return (
    <section className="text-center my-5" style={{paddingTop: '550px'}}>
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our bestsellers
      </h2>
      <p className="grey-text text-center w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/5.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            </MDBCard>
            <Button color="dark" size="lg-3 md-6" style={{fontSize: "18px"}} block>See Detail</Button>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <Button color="dark" size="lg-3 md-6" style={{fontSize: "18px"}} block>See Detail</Button>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/9.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
          </MDBCard>
            <Button color="dark" size="lg-3 md-6" style={{fontSize: "18px"}} block>See Detail</Button>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
          </MDBCard>
            <Button color="dark" size="lg-3 md-6" style={{fontSize: "18px"}} block>See Detail</Button>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default Jumbotron;
