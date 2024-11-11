import React from "react";

function SecondSection() {
    return (
        <>
            <div className="second-section">
                <div className="px-4 py-5 mt-5 text-center">
                    <h1 style={{fontSize:"72px",color:"white"}}>About us</h1>
                    <div className="col-lg-8 my-4 mx-auto">
                    <p className="lead mb-4" style={{color:"white",textAlign:"justify"}}>Welcome to Nexzy, We’re more than just an e-commerce site; we’re a community of style enthusiasts, trendsetters, and quality seekers. Our mission is to bring you the finest selection of products that blend style, functionality, and sustainability. We believe shopping should be easy, enjoyable, and aligned with your values. Discover collections that reflect your unique taste and join us in redefining conscious shopping!</p>
                    </div>
                </div>
                <div className="hr-align">
                    <hr className="shine"></hr>
                </div>
            </div>
        </>
    );
}

export default SecondSection;
