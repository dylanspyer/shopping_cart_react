import { CartItem } from "./CartItem";
import { ProductListing } from "../types/index.ts";

interface CartProps extends ProductListing {
  onCheckout: () => void;
}

export const Cart = ({ productList, onCheckout }: CartProps) => {
  const total = productList.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.price;
  }, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              _id={cartItem._id}
              title={cartItem.title}
              quantity={cartItem.quantity}
              price={cartItem.price}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">
              Total: ${total}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};
