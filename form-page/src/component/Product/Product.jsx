import { addProductWithImage, getProduct } from "../../api/apiHelper";
import { useState, useEffect } from "react";
import "./ProductList.css";
import { ProductList } from "./ProductList";

export const Product = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      fetchProduct()
    },2000)

    return () => clearTimeout(timer) 
  }, []);

  const fetchProduct = async () => {
    setError(null);
    try {
      const response = await getProduct();
      setProducts(response.list);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name cannot be empty";
    }

    if (form.price < 10) {
      errors.price = "Price must be greater than 10";
    }

    if (!form.description.trim()) {
      errors.description = "Descriptions is required";
    }

    if (!file) {
      errors.file = "Must selected a file";
    }

    return errors;
  };

  const handleChange = (field, subfield, value) => {
    setForm((prevData) => ({
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
        const result = await addProductWithImage(form, file);
        alert("File uploaded Successfully");
        setForm({
          name: "",
          price: "",
          description: "",
        });
        setFile(null);
      } catch (error) {
        console.log(error);
        alert("Failed to upload the details");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => handleChange("name", null, e.target.value)}
        />
        {formError.name && <div>{formError.name}</div>}

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", null, e.target.value)}
        />
        {formError.price && <div>{formError.price}</div>}

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", null, e.target.value)}
        />
        {formError.description && <div>{formError.description}</div>}

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        {formError.file && <div>{formError.file}</div>}
        <button type="submit">Upload</button>
      </form>

      {
        loading ? (
          <div>loading products ...</div>
        ) : error ? (
          <div>Error loading products:{error} </div>
        ) : (
          <ProductList list={products}/>
        )
      }
    </div>
  );
};
