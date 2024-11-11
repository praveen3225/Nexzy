import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";

function CountButton(props)
{
    const [count,setCount] = useState(1);
    function decrement()
    {
        if(count===0)
        {
            setCount(0);
        }
        else
            setCount(count-1);
    }
    function increment()
    {
        setCount(count+1);
    }
    function numerify(price)
    {
        return parseFloat(price.replace("₹", "").replace(",", ""));
    }

    const price = count * numerify(props.price);

    return (
        <>
            <label style={{padding:"0px 15px 0px 5px"}}>Qty :</label>
            <span style={{padding:"0px 18px 0px 0px"}}>
            <Button variant="danger" onClick={decrement}> - </Button>
            <input type="text" value={count} style={{width:"40px",textAlign:"center"}}/>
            <Button variant="success" onClick={increment}> + </Button>
            </span>
            <div style={{padding:"18px 0px 0px 5px"}}>
                Total price : ₹ {price.toLocaleString("en-IN",{minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
        </>
    );
}

export default CountButton;