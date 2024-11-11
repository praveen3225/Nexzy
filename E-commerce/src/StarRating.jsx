// StarRating.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Ensure react-icons is installed

function StarRating({ maxStars = 5 }) {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <FaStar
            key={index}
            size={24}
            color={starIndex <= rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => setRating(starIndex)}
            onMouseEnter={() => setRating(starIndex)}
            onMouseLeave={() => setRating(0)}
            style={{ cursor: "pointer", transition: "color 0.2s" }}
          />
        );
      })}
      <span style={{ marginLeft: "8px", fontSize: "16px" }}></span>
    </div>
  );
}

export default StarRating;
