import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function TabGroup(props)
{
    return (
        <>
            <Navbar bg="transparent" data-bs-theme="dark">
                <Container>
                <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
                    <Nav>
                        <Nav.Link onClick={props.funct0}>All</Nav.Link>
                        <Nav.Link onClick={props.funct1}>Electronics</Nav.Link>
                        <Nav.Link onClick={props.funct2}>Home Appliances</Nav.Link>
                        <Nav.Link onClick={props.funct3}>Other Accessories</Nav.Link>
                        {props.role==='admin' ? (<Nav.Link onClick={props.funct4}>Soft Deleted</Nav.Link>)
                        :
                        (<></>)}
                    </Nav>
                </div>
                </Container>
            </Navbar>
        </>);
}

export default TabGroup;