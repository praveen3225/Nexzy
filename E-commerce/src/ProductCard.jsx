import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductCard(props) {
  
  const navigate = useNavigate();
  const data = {
    id:props.index,
    imgsrc: props.imgSrc,
    title: props.title,
    description: props.description,
    price: props.price,
    type:props.type,
    features:props.features,
    pros:props.pros,
    cons:props.cons,
    isdeleted:props.isdeleted,
  }

  function take() { 
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 10);

    navigate("/product-description", {
      state: {
        id:props.index,
        imgSrc: props.imgSrc,
        title: props.title,
        description: props.description,
        price: props.price,
        type:props.type,
        features:props.features,
        pros:props.pros,
        cons:props.cons,
        isdeleted:props.isdeleted
      }
    });
  }

  function takeUpdate(){
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 10);

    navigate("/addProduct", {
      state: {
        id:props.index,
        imgsrc: props.imgSrc,
        title: props.title,
        description: props.description,
        price: props.price,
        type:props.type,
        features:props.features,
        pros:props.pros,
        cons:props.cons,
        isdeleted:props.isdeleted,
      }
    });
  }

  function takeDelete()
  {
    if (!props.isdeleted) {
          data.isdeleted = true;
          axios.put(`http://localhost:8080/update/${data.id}`, data)
              .then((response) => {
                  alert("Product soft deleted successfully.");
                  props.refreshProducts();
              })
              .catch(error => {
                  console.log("Error in soft deleting product:", error);
              });
      }
  }

  function takeRestore()
  {
        if(data.isdeleted){
          data.isdeleted = false;
          axios.put(`http://localhost:8080/update/${data.id}`, data)
              .then((response) => {
                  alert("Successfully Restored ");
                  props.refreshProducts();
              })
              .catch((error) => {
                  console.log(error);
              });
      }
      navigate("/products")
  }

  function takePermanentDelete()
  {
      if(props.isdeleted)
      {
        const id = data.id;
        axios.delete(`http://localhost:8080/delete/${id}`)
        .then((response)=>{
          alert("Delete Successful ");
          props.refreshProducts();
        })
        .catch((error)=>{alert(error)})
      }
      navigate("/products")
  }

  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => setShowFullDescription(!showFullDescription);


  return (
    <Card className="card-shadow" style={{ width: '14rem', margin: '5px', display: 'flex', flexDirection: 'column', height: '446px' }}>
      <div style={{ height: "50%", overflow: "hidden" }}>
        <a onClick={take} style={{ cursor: "pointer" }}>
          <Card.Img 
            className="product-card-image" 
            variant="top" 
            src={props.imgSrc} 
            style={{ height: "100%" }} 
          />
        </a>
      </div>
      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Card.Title onClick={take} style={{cursor:"pointer"}}>{props.title}</Card.Title>
          <Card.Text onClick={take}
            style={{ 
              maxHeight: showFullDescription ? "none" : "3em", // Adjust to fit a few lines
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: showFullDescription ? "unset" : 2,
              WebkitBoxOrient: "vertical",
              paddingBottom:"0px",
              marginBottom:"0px",
              cursor:"pointer"
            }}
          >
            {props.description}
          </Card.Text>
          {!showFullDescription && props.description.length > 50 && (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleDescription}>
             <a> Read more </a>
            </span>
          )}
          {showFullDescription && (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleDescription}>
              Show less
            </span>
          )}
          
        </div>
      </Card.Body>
      <div style={{padding:"0px 15px",paddingBottom:"10px"}}>
          <Card.Text style={{ fontWeight: "bold" }}>Price: ₹ {props.price} </Card.Text>
          </div>
          {
            props.role==='admin' ? (
              props.isdeleted ? (
                <div style={{ display: "flex", marginTop: "auto", paddingBottom: "20px", justifyContent: "space-around" }}>
                  <Button variant='success' onClick={takeRestore}><i className="bi bi-pencil"> Restore</i></Button>
                  <Button variant='danger' onClick={takePermanentDelete}><i className="bi bi-trash3"> Delete</i></Button>
                </div>
              ):(
                <div style={{ display: "flex", marginTop: "auto", paddingBottom: "20px", justifyContent: "space-around" }}>
                  <Button variant='success' onClick={takeUpdate}><i className="bi bi-pencil"></i></Button>
                  <Button variant="primary" onClick={take}><i className="bi bi-cart3"></i> Add to cart</Button>
                  <Button variant='danger' onClick={takeDelete}><i className="bi bi-trash3"></i></Button>
                </div>
              )
            )
            :
            (
                <div style={{ display: "flex", marginTop: "auto", paddingBottom: "20px", justifyContent: "space-around" }}>
                  <Button variant="primary" onClick={take}><i className="bi bi-cart3"></i> Add to cart</Button>
                </div>
            )
          }
                      
    </Card>
  );
}

export default ProductCard;
