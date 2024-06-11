import { useState, SyntheticEvent } from "react";
import { NewProduct } from "../types/index";

interface AddProductFormProps {
  onAddProduct: (newProduct: NewProduct, callback: () => void) => void;
  toggleAddForm: () => void;
}

export const AddProductForm = ({
  onAddProduct,
  toggleAddForm,
}: AddProductFormProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmitAddProductForm = async (event: SyntheticEvent) => {
    const resetAddProductFormValue = () => {
      setTitle("");
      setPrice(0);
      setQuantity(0);
    };
    event.preventDefault();
    const newProduct = { title, price, quantity };
    await onAddProduct(newProduct, resetAddProductFormValue);
    toggleAddForm();
  };

  return (
    <div className="add-form">
      <form aria-label="Add Product Form" onSubmit={handleSubmitAddProductForm}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={toggleAddForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
