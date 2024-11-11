import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import StarRating from "./StarRating";
import CountButton from "./CountButton";

function ProductPage()
{
    const location = useLocation();
    const cardDetails = location.state;
    
    return (
        <>
        <div className="product-container">
        <Container>
            <Row>
                <Col sm="12">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor:"rgba(0,0,0,0.4"}}>
                    <div style={{ height: "60vh", backgroundColor: "white", width: "100%",padding:"20px 0px"}}>
                        <div className="p-md-0" style={{ display: "flex", justifyContent: "center", height: "100%",padding:"25px 0px"}}>
                            <img src={cardDetails.imgSrc} style={{ height: "100%", objectFit: "cover",paddingBottom:'5px'}} alt="Product" />
                        </div>
                    </div>
                    <div style={{color:"white",padding:"20px 0px"}}>
                        <h1>{cardDetails.title}</h1>
                    </div>
                    <div style={{color:"white",padding:"20px 50px",textAlign:"center"}}>
                        <h3>{cardDetails.description}</h3>
                    </div>
                    <div style={{width:"100%",padding:"30px 20px"}}>
                    <Container>
                        <Row>
                            <Col sm="6">
                                <div style={{height:"100%",width:"100%",color:"white"}}>
                                    <b>Features:</b>
                                    <ul>
                                        {cardDetails.features.map((feature)=>(
                                            <li>{feature}</li>
                                        ))}
                                    </ul>
                                    <b>Pros:</b>
                                    <ul>
                                        {cardDetails.pros.map((pro)=>(
                                            <li>{pro}</li>
                                        ))}
                                    </ul>
                                    <b>Cons:</b>
                                    <ul>
                                        {cardDetails.cons.map((con)=>(
                                            <li>{con}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                            <Col>
                                 <div style={{height:"100%",width:"100%",color:"white",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div style={{padding:"0px 0px 30px 0px"}}>
                                        <CountButton price={cardDetails.price}></CountButton>
                                    </div>
                                    <div style={{padding:"0px 0px 30px 0px"}}>
                                        <Button>Checkout</Button>
                                    </div>
                                    <div>
                                        <StarRating maxStars={5}></StarRating>
                                    </div>
                                 </div>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    );
}

export default ProductPage;