export interface Product {
  _id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface NewProduct extends Omit<Product, "_id"> {}

export interface ProductListing {
  productList: Product[];
}

export interface EditProduct {
  initialTitle: string;
  initialQuantity: number;
  initialPrice: number;
}

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  productId: string;
}

export interface AddToCartReponse {
  item: CartItem;
  product: Product;
}
