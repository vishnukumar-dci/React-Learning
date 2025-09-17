import { addProductWithImage } from "../api/apiHelper";
import { useState } from "react";

export const Product = ({ isSuccess }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [error, setFormError] = useState({});
  const validation = () => {
    const errors = {};

    if (!product.name.trim()) {
      errors.name = "Name cannot be empty";
    }

    if (product.price < 10) {
      errors.price = "Price must be greater than 10";
    }

    if (!product.description.trim()) {
      errors.description = "Descriptions is required";
    }

    if (!file) {
      errors.file = "Must selected a file";
    }

    return errors;
  };

  const handleChange = (field, subfield, value) => {
    setProduct((prevData) => ({
      ...prevData,
      [field]: subfield
        ? {
            ...prevData[field],
            [subfield]: value,
          }
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validation();
    setFormError(error);
    if (Object.keys(error).length < 1) {
      try {
        const result = await addProductWithImage(product, file);
        alert("File uploaded Successfully");
        setProduct({
          name: "",
          price: "",
          description: "",
        });
        setFile(null);
        isSuccess(true);
        console.log(result);
      } catch (error) {
        console.log(error);
        alert("Failed to upload the details");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product name"
        value={product.name}
        onChange={(e) => handleChange("name", null, e.target.value)}
      />
      {error.name && <div>{error.name}</div>}

      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => handleChange("price", null, e.target.value)}
      />
      {error.price && <div>{error.price}</div>}

      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) => handleChange("description", null, e.target.value)}
      />
      {error.description && <div>{error.description}</div>}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {error.file && <div>{error.file}</div>}
      <button type="submit">Upload</button>
    </form>
  );
};
