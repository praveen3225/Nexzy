import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddCard(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const formDetails = location.state;
    console.log(formDetails);

    const [selectedFile, setSelectedFile] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescription] = useState("");
    const [features, setFeatures] = useState([]);
    const [pros, setPros] = useState([]);
    const [cons, setCons] = useState([]);

    useEffect(() => {
        if (formDetails) {
            setName(formDetails.title || "");
            setCategory(formDetails.type || "");
            setDescription(formDetails.description || "");
            setPrice(formDetails.price || "");
            setFeatures(formDetails.features || []);
            setPros(formDetails.pros || []);
            setCons(formDetails.cons || []);
            setSelectedFile(formDetails.imgsrc || "");
        }
    }, [formDetails]);

    const handleTextAreaChange = (e, setter) => {
        const value = e.target.value;
        setter(value.split("\n"));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setSelectedFile(file ? file.name : "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            imgsrc: selectedFile,
            title: name,
            description: descriptions,
            price: price,
            type: category,
            features: features,
            pros: pros,
            cons: cons,
        };
        console.log(data);
        
        if (formDetails && formDetails.id) {
            
        
            axios.put(`http://localhost:8080/update/${formDetails.id}`, data)
                .then((response) => {
                    alert("Successfully updated", response);
                    props.refreshProducts();
                })
                .catch((error) => {
                    console.log(error);
                });
                navigate("/products");} 
        else {
            axios.post("http://localhost:8080/add", data)
                .then((response) => {
                    alert("Successfully Added", response);
                    props.refreshProducts();
                })
                .catch((error) => {
                    console.log(error);
                });
                navigate("/products");
        }
    };

    return (
        <>
            <div className="addContainer-bg">
                <div className="form-placement">
                    <div className="form-container">
                        <form className="add-product-form" onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Container>
                                <Row>
                                    <div style={{ display: "flex", justifyContent: "center", color: "white", paddingTop: "20px" }}>
                                        <h1>{formDetails ? "EDIT CARD" : "CREATE CARD"}</h1>
                                    </div>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Product Name</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <input className="form-input" type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} value={name} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Product Category</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <select style={{ width: "150px" }} onChange={(e) => setCategory(e.target.value)} value={category} defaultValue={"Other"}>
                                                <option value="Electronic">Electronic</option>
                                                <option value="Home Appliance">Home Appliance</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Product Description</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <input placeholder="Enter product description" style={{ width: "100%" }} onChange={(e) => setDescription(e.target.value)} value={descriptions} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Features</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <textarea placeholder="Enter product features" style={{ width: "100%" }} onChange={(e) => handleTextAreaChange(e, setFeatures)} value={features.join("\n")}></textarea>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Pros</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <textarea placeholder="Enter product pros" style={{ width: "100%" }} onChange={(e) => handleTextAreaChange(e, setPros)} value={pros.join("\n")}></textarea>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Cons</label>
                                        <div style={{ padding: "0px 20px" }}>
                                            <textarea placeholder="Enter product cons" style={{ width: "100%" }} onChange={(e) => handleTextAreaChange(e, setCons)} value={cons.join("\n")}></textarea>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Price</label>
                                        <div style={{ padding: "0px 20px", paddingBottom: "20px" }}>
                                            <input className="form-input" placeholder="Set product price" style={{ width: "40%" }} onChange={(e) => setPrice(e.target.value)} value={price} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <label style={{ color: "white", padding: "20px" }}>Product Image</label>
                                        <div style={{ padding: "0px 20px", paddingBottom: "10px" }}>
                                            <input type="file" accept="image/*" onChange={handleFileChange} />
                                        </div>
                                        <div style={{ marginTop: "10px", color: "white", padding: "0px 20px" }}>
                                            {selectedFile ? <p>Selected file: {selectedFile}</p> : <p>No file selected</p>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label style={{ color: "white", padding: "0px 20px" }}>Image-preview</label>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <div style={{ width: "70%", padding: "20px 0px" }}>
                                                {selectedFile && (
                                                    <img src={selectedFile} style={{ width: "100%", objectFit: "cover" }} alt="selected file preview" />
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", paddingBottom: "10px" }}>
                                            <input type="submit" />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCard;
