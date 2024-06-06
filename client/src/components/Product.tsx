import { useState } from "react";
import { Product as ProductType } from "../types/index.ts";
import { EditProductForm } from "./EditProductForm.tsx";

interface ProductProps extends ProductType {
  handleDeleteProduct: (productId: string) => void;
}

export const Product = ({
  _id,
  title,
  price,
  quantity,
  handleDeleteProduct,
}: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const toggleEditForm = () => {
    setShowEditForm((prevState) => !prevState);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={toggleEditForm}>
            Edit
          </button>
        </div>
        {showEditForm ? (
          <EditProductForm
            initialTitle={title}
            initialPrice={price}
            initialQuantity={quantity}
          />
        ) : null}
        <button
          className="delete-button"
          onClick={() => handleDeleteProduct(_id)}
        >
          <span>X</span>
        </button>
      </div>
    </li>
  );
};
