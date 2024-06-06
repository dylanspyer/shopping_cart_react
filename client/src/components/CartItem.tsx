import { Product as ProductType } from "../types/index";

interface CartItemProps extends ProductType {}

export const CartItem = ({ title, quantity, price }: CartItemProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  );
};
