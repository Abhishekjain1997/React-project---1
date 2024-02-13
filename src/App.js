import React, { useState } from "react";
import Form from "./components/Form";
import ProductList from "./components/ProductList";

function App() {
  const [updateProductList, setUpdateProductList] = useState(false);

  const handleProductAdded = () => {
    // Toggle the state to trigger a re-render of ProductList
    setUpdateProductList(!updateProductList);
  };

  return (
    <div className="App">
      <Form onProductAdded={handleProductAdded} />
      <ProductList key={updateProductList} />
    </div>
  );
}

export default App;