import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/apiHelper";
import "./ProductList.css";
import { baseURL } from "../../utils/axios";
import { Product } from "../Product";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [count]);

  const fetchProduct = async () => {
    const response = await getProduct();
    setProducts(response.list);
  };

  return (
    <div className="container">
      <Product isSuccess={fetchProduct} />
      {products.length === 0 ? (
        <p>No results</p>
      ) : (
        products
          .slice()
          .reverse()
          .map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`${baseURL}${product.image_path}`}
                alt={product.product_name}
                className="product-image"
              />
              <h3 className="product-name">{product.product_name}</h3>
              <p className="product-price">₹{product.amount}</p>
            </div>
          ))
      )}
    </div>
  );
};
