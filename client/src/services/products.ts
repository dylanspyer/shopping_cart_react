import axios from "axios";
import z from "zod";
import { NewProduct, Product } from "../types/index";

const productSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  title: z.string(),
  _id: z.string(),
});

const getProductsSchema = z.array(productSchema);

export const getProducts = async () => {
  const { data } = await axios.get<Product[]>("/api/products");
  return getProductsSchema.parse(data);
};

export const addProduct = async (newProduct: NewProduct) => {
  const { data } = await axios.post<Product>("/api/products", newProduct);
  return productSchema.parse(data);
};

export const deleteProduct = async (productId: string) => {
  await axios.delete(`/api/products/${productId}`);
};

export const editProduct = async (
  productId: string,
  updatedProductPayload: NewProduct
) => {
  // const productId = product._id;
  // const { _id, ...updatedProductPayload } = product;

  const { data } = await axios.put<Product>(
    `/api/products/${productId}`,
    updatedProductPayload
  );

  return productSchema.parse(data);
};
