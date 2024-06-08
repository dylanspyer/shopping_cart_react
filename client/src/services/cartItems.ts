import axios from "axios";
import z from "zod";
import { CartItem, AddToCartReponse } from "../types/index";

const cartItemSchema = z.object({
  price: z.number(),
  productId: z.string(),
  quantity: z.number(),
  title: z.string(),
  _id: z.string(),
});

const addCartResponse = z.object({
  product: z.object({
    price: z.number(),
    quantity: z.number(),
    title: z.string(),
    _id: z.string(),
  }),
  item: z.object({
    price: z.number(),
    quantity: z.number(),
    title: z.string(),
    _id: z.string(),
    productId: z.string(),
  }),
});

const getCartItemsSchema = z.array(cartItemSchema);

export const getCart = async () => {
  const { data } = await axios.get<CartItem[]>("/api/cart");
  return getCartItemsSchema.parse(data);
};

export const addItem = async (_id: string) => {
  const { data } = await axios.post<AddToCartReponse>("/api/add-to-cart", {
    productId: _id,
  });
  console.log(data);
  // return data;
  return addCartResponse.parse(data);
};

export const checkOut = async () => {
  await axios.post("/api/checkout");
};
