import { useState, SyntheticEvent } from "react";
import { EditProduct, Product } from "../types/index.ts";

interface EditProductProps extends EditProduct {
  _id: string;
  onEditProduct: (product: Product) => void;
  toggleEditForm: () => void;
}

export const EditProductForm = ({
  initialTitle,
  initialPrice,
  initialQuantity,
  onEditProduct,
  _id,
  toggleEditForm,
}: EditProductProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleEditProduct = async (event: SyntheticEvent) => {
    event.preventDefault();
    const product = { _id, title, price, quantity };
    await onEditProduct(product);
    toggleEditForm();
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleEditProduct}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={title}
            aria-label="Product Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={price}
            aria-label="Product Price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={quantity}
            aria-label="Product Quantity"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={toggleEditForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
