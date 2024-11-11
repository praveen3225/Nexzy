import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

function NavigationHeader(props)
{

    function handleSignOut()
    {
        Cookies.remove('userData');
        setTimeout(()=>{
            window.location.href="http://localhost:3000/";
        },2000);
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/">Nexzy</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                </Container>
                {
                    props.username ? (
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <span style={{width:"100%",color:"white",marginRight:"20px",whiteSpace:"nowrap"}}>logged in as : {props.username}</span> 
                        </div>
                        <div style={{marginRight:"20px",display:"inline-flex"}}>
                        <div className="dropdown" style={{position:"relative"}}>
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-person-circle fs-3" style={{color: "white"}}></i>
                        </button>
                        <div className="dropdown-menu" style={{position:"absolute",marginLeft:"-100px"}}>
                            {/* <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div> */}
                            <a className="dropdown-item" onClick={handleSignOut}>Sign out</a>
                        </div>
                    </div>

                        </div>
                    </div>):
                    (<></>)
                }
               
            </Navbar>
        </>);
}

export default NavigationHeader;