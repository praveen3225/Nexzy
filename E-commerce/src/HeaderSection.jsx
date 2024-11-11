import React from "react";
import NavigationHeader from "./NavigationHeader";
import Container from "react-bootstrap/esm/Container";
import {Button} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

function HeaderSection()
{
    return (
    <> 
      <Container fluid>
        <Row>
            <Col lg="6">
                <h1 className="welcome-title">
                Welcome to<br />
                <span className="nexzy">Nexzy</span>
                </h1>
                <p className="welcome-description">
                Discover quality and style with Nexzy – your one-stop shop for modern essentials!
                </p>
            </Col>
            <Col style={{padding:"0px"}} lg="6">
                <div className="hr-align" style={{height:"100%",alignItems:"center"}}>
                <a href="/products"><Button variant="success"><i class="bi bi-cart3"></i> Shop Now</Button></a>
                </div>
            </Col>
        </Row>
      </Container>
    </>
    );
}

export default HeaderSection;