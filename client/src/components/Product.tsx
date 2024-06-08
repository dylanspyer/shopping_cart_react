import { useState, SyntheticEvent } from "react";
import { Product as ProductType } from "../types/index.ts";
import { EditProductForm } from "./EditProductForm.tsx";

interface ProductProps extends ProductType {
  onDeleteProduct: (productId: string) => void;
  onEditProduct: (product: ProductType) => void;
  onAddToCart: (_id: string) => void;
}

export const Product = ({
  _id,
  title,
  price,
  quantity,
  onDeleteProduct,
  onEditProduct,
  onAddToCart,
}: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const toggleEditForm = () => {
    setShowEditForm((prevState) => !prevState);
  };

  const handleAddToCart = (event: SyntheticEvent) => {
    event.preventDefault();
    onAddToCart(_id);
  };

  const disableButton = () => {
    return quantity === 0;
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button
            disabled={disableButton()}
            className="add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className="edit" onClick={toggleEditForm}>
            Edit
          </button>
        </div>
        {showEditForm ? (
          <EditProductForm
            initialTitle={title}
            initialPrice={price}
            initialQuantity={quantity}
            _id={_id}
            onEditProduct={onEditProduct}
            toggleEditForm={toggleEditForm}
          />
        ) : null}
        <button className="delete-button" onClick={() => onDeleteProduct(_id)}>
          <span>X</span>
        </button>
      </div>
    </li>
  );
};
