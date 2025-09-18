import { useState } from "react";
import { baseURL } from "../../utils/axios";
import "./ProductList.css";

export const ProductList = ({ list }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filterRecords = list.filter((product) =>
    product.product_name
      .toLowerCase()
      .includes(searchProduct.trim().toLowerCase())
  );

  const filterByPrice = filterRecords.filter((product) => {
    if (priceRange === "All") return true;
    else if (priceRange === "below 500") return product.amount < 500;
    else if (priceRange === "500-1000")
      return product.amount > 500 && product.amount < 1000;
    else if (priceRange === "above 1000") return product.amount > 1000;
    else return true;
  });

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <div>
          <select
            name=""
            id=""
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">All </option>
            <option value="below 500">below 500</option>
            <option value="500-1000">500 - 1000</option>
            <option value="above 1000">above 1000</option>
          </select>
        </div>
      </div>
      {filterByPrice.length > 0 ? (
        filterByPrice
          .slice()
          .sort((a, b) => b.amount - a.amount)
          .map((product) => (
            <>
              <div key={product.id} className="product-card">
                <img
                  src={`${baseURL}${product.image_path}`}
                  alt={product.product_name}
                  className="product-image"
                />
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-price">₹{product.amount}</p>
              </div>
            </>
          ))
      ) : (
        <p>No result</p>
      )}
    </div>
  );
};
