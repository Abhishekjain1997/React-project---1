import React, { useState } from "react";

function Form({ onProductAdded }) {
  const [formData, setFormData] = useState({
    id: "",
    sellingPrice: "",
    productName: "",
    table: "table1", // Default table value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = JSON.parse(localStorage.getItem("productData")) || [];
    let productArr = [];
    
    if (temp) {
      productArr = [...temp];
    }

    // Include the selected table in the formData
    const orderData = {
      ...formData,
      table: formData.table || "table1", // Default to "table1" if not specified
    };

    productArr.push(orderData);

    // Store data in local storage
    localStorage.setItem("productData", JSON.stringify(productArr));

    // Optional: Reset form fields after submission
    setFormData({
      id: "",
      sellingPrice: "",
      productName: "",
      table: "table1", // Reset table value
    });

    if (onProductAdded) {
      onProductAdded();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Unique Order ID:
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Choose Price:
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Choose Dish:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Choose Table:
          <select
            name="table"
            value={formData.table}
            onChange={handleInputChange}
          >
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
          </select>
        </label>

        <button type="submit">Add to bill</button>
      </form>
    </div>
  );
}

export default Form;