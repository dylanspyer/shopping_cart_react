import { useState, useEffect } from "react";
import { AddProductForm } from "./components/AddProductForm";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { Product, NewProduct, CartItem } from "./types/index";
import {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
} from "./services/products";
import { getCart, addItem, checkOut } from "./services/cartItems";
import "./assets/index.css";
import "./assets/whitespace-reset.css";

function App() {
  const [productList, setProductList] = useState<Product[]>([]); // I tried to import the ProductList type as ProductListType and use that instead of an array of products, but it wouldn't work..why?
  const [showAddForm, setShowAddForm] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleAddForm = () => {
    setShowAddForm((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProductList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const handleAddProduct = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const data = await addProduct(newProduct);
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
      await deleteProduct(productId);
      setProductList((prevState) =>
        prevState.filter((p: Product) => p._id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = async (product: Product) => {
    const productId = product._id;
    const { _id, ...updatedProductPayload } = product;
    try {
      const data = await editProduct(productId, updatedProductPayload);
      setProductList((prevState) => {
        return prevState.map((p: Product) => {
          if (p._id === productId) {
            return { ...data, productId };
          }

          return p;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (_id: string) => {
    const p = productList.find((p: Product) => p._id === _id);
    if (p && p.quantity === 0) return;

    try {
      const data = await addItem(_id);
      let updatedCart = cart.map((c: CartItem) =>
        c._id === data.item._id ? data.item : c
      );
      const updatedItem = updatedCart.find(
        (c: CartItem) => c._id === data.item._id
      );
      if (!updatedItem) updatedCart = [...updatedCart, data.item];

      const updatedProductList = productList.map((p: Product) =>
        p._id === data.product._id ? data.product : p
      );

      setCart(updatedCart);
      setProductList(updatedProductList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      checkOut();
      setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app">
      <header>
        <h1>The Shop</h1>
        <Cart productList={cart} onCheckout={handleCheckout} />
      </header>

      <main>
        <ProductListing
          productList={productList}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          onAddToCart={handleAddToCart}
        />
        <p>
          <button className="add-product-button" onClick={toggleAddForm}>
            Add A Product
          </button>
        </p>
        {showAddForm ? (
          <AddProductForm
            onAddProduct={handleAddProduct}
            toggleAddForm={toggleAddForm}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
