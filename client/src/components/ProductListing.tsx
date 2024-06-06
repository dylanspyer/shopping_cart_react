import { Product } from "./Product";

import {
  ProductListing as ProductListingType,
  Product as ProductType,
} from "../types/index.ts";

interface ProductListingProps extends ProductListingType {
  handleDeleteProduct: (productId: string) => void;
}

// accepts array of products
export const ProductListing = ({
  productList,
  handleDeleteProduct,
}: ProductListingProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {productList.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </ul>
    </div>
  );
};
