import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  const total = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
      <h3>Total Value: ₱{total.toLocaleString()}</h3>
    </div>
  );
}

export default ProductList;
