import React from "react";
import { Container, Row, Col } from "react-bootstrap"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


const Header = () => {
  return (
    <Container>
      <div className="text-center">
        <Row>
          <Col>
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={30000} //3 secs
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Header;