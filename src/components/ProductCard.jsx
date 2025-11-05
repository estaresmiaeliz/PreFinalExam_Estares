import React, { useState } from "react";

function ProductCard({ product }) {
  const [qty, setQty] = useState(product.quantity);

  const addQty = () => setQty(qty + 1);
  const removeQty = () => setQty(qty > 0 ? qty - 1 : 0);

  const subtotal = product.price * qty;

  return (
    <div className={`product-card ${qty < 5 ? "low-stock" : ""}`}>
      <img src={product.image} alt={product.name} width="80" />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ₱{product.price}</p>
      <p>Quantity: {qty}</p>
      <p>Subtotal: ₱{subtotal.toLocaleString()}</p>
      <div className="buttons">
        <button onClick={addQty}>+</button>
        <button onClick={removeQty}>−</button>
      </div>
      {qty < 5 && <p className="warning">⚠️ Low Stock!</p>}
    </div>
  );
}

export default ProductCard;

