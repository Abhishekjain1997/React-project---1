import React, { useEffect, useState } from "react";

const ProductList = ({ key }) => {
  const [products, setProducts] = useState([]);
  const [selectedTable, setSelectedTable] = useState("table1");

  useEffect(() => {
    // Retrieve products from local storage on component mount
    const storedProducts = JSON.parse(localStorage.getItem("productData")) || [];
    setProducts(storedProducts);
  }, [key]);

  const handleDeleteOrder = (index) => {
    // Copy the current products array
    const updatedProducts = [...products];
    
    // Remove the product at the specified index
    updatedProducts.splice(index, 1);

    // Update the state with the modified array
    setProducts(updatedProducts);

    // Update the local storage
    localStorage.setItem("productData", JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product => product.table === selectedTable);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  return (
    <div>
      <label>
        Choose Table:
        <select
          name="table"
          value={selectedTable}
          onChange={handleTableChange}
        >
          <option value="table1">Table 1</option>
          <option value="table2">Table 2</option>
          <option value="table3">Table 3</option>
        </select>
      </label>

      <h2>{`${selectedTable}:`}</h2>
      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <strong>Order ID:</strong> {product.id}, <strong> Price:</strong>{" "}
            {product.sellingPrice}, <strong>Dish:</strong>{" "}
            {product.productName}
            <button onClick={() => handleDeleteOrder(index)}>Delete Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;