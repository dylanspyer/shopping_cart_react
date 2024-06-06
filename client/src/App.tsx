import { useState, useEffect } from "react";
import { AddProductForm } from "./components/AddProductForm";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { mockProducts, mockCart } from "../mockData/data";
import { Product, NewProduct } from "./types/index";
import "../assets/index.css";
import "../assets/whitespace-reset.css";
import axios from "axios";
// import "./App.css";

function App() {
  const [productList, setProductList] = useState<Product[]>([]); // I tried to import the ProductList type as ProductListType and use that instead of an array of products, but it wouldn't work..why?
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProductList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const { data } = await axios.post("/api/products", newProduct);
      setProductList((prevState) => prevState.concat(data));
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProductList((prevState) =>
        prevState.filter((p: Product) => p._id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = async (
    productId: string,
    updatedProduct: Product
  ) => {
    // PUT /api/products/:id
    // haven't tested this yet, not sure if it works properly
    try {
      const { data } = await axios.put(
        `/api/products/${productId}`,
        updatedProduct
      );
      setProductList((prevState) => {
        return prevState.map((p: Product) => {
          if (p._id === productId) {
            return updatedProduct;
          }

          return p;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app">
      <header>
        <h1>The Shop!</h1>
        <Cart productList={mockCart} />
      </header>

      <main>
        <ProductListing
          productList={productList}
          handleDeleteProduct={handleDeleteProduct} // wasn't sur
        />
        <p>
          <button className="add-product-button" onClick={toggleAddForm}>
            Add A Product
          </button>
        </p>
        {showAddForm ? (
          <AddProductForm onAddProduct={handleAddProduct} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
