import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "react-bootstrap";
import TabGroup from "./TabGroup";
import { useState} from "react";

function ProductApp(props) {
    
    const[filter,setFilter] = useState([]);
    console.log(props.role)
    console.log(props);
   
    useEffect(()=>{
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===false})
        setFilter(activeProducts);
    },[props.products])
    
    function funct0()
    {
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===false})
        setFilter(activeProducts);
        
    }
    function funct1()
    {
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===false})
        const sample = activeProducts.filter((product)=>{
            return product.type === "Electronic" && !product.isdeleted ;
        })
        setFilter(sample);
        
    }
    function funct2()
    {
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===false})
        const sample = activeProducts.filter((product)=>{
            return product.type === "Home Appliance" && !product.isdeleted ;
        })
        setFilter(sample);
        
    }
    function funct3()
    {
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===false})
        const sample = activeProducts.filter((product)=>{
            return product.type === "Other" && !product.isdeleted ;
        })
        setFilter(sample);
       
    }
    function softDeleted()
    {
        const activeProducts = props.products.filter((product)=>{return product.isdeleted===true})
        setFilter(activeProducts)
        
    }

    return (
        <div className="product-page-container">
            <TabGroup role={props.role} funct0={funct0} funct1={funct1} funct2={funct2} funct3={funct3} funct4={softDeleted}></TabGroup>
            <div className="card-container">
            <div className="card-content d-flex flex-wrap justify-content-center" style={{flexWrap:"wrap"}}>
                {filter.length > 0? (
                    filter.map(product => (
                            <ProductCard 
                                key = {product.id}
                                index = {product.id}
                                title={product.title} 
                                description={product.description}
                                price = {product.price} 
                                imgSrc={product.imgsrc} 
                                type = {product.type}
                                features = {product.features}
                                pros = {product.pros}
                                cons = {product.cons}
                                isdeleted = {product.isdeleted}
                                role = {props.role}
                                refreshProducts = {props.refreshProducts}
                            />
                    ))):(<p>No products available</p>)}
                </div>
                {props.role==='admin'?(
                    <div style={{display:"flex", justifyContent:"center",padding:"20px", marginTop:"10px",backgroundColor:"rgba(0,0,0,0.6"}}>
                    <Button variant="success" href="/addProduct" style={{marginRight:"30px"}}>Add Product</Button>
                </div>
                ):(<></>)}
            </div>
        </div>
    );
}

export default ProductApp;
