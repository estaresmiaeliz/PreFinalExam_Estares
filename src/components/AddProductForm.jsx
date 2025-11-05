import React, { useState } from "react";

function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specs: "",
    rating: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((f) => f === "")) {
      alert("Please fill all fields!");
      return;
    }
    onAdd({
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    });
    setForm({
      image: "",
      name: "",
      category: "",
      description: "",
      specs: "",
      rating: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
        />
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
