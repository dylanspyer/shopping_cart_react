import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import * as productService from "./services/products";
import * as cartService from "./services/cartItems";

vi.mock("./services/products");
vi.mock("./services/cartItems");

const mockedProductService = vi.mocked(productService, true);
const mockedCartService = vi.mocked(cartService, true);
const mockedProducts = [
  {
    _id: "61d754d72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 2,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
  {
    _id: "51d754d72092473333a809e1",
    title: "Mac Mini",
    price: 850,
    quantity: 7,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    _v: 0,
  },
];
const mockedCart = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
    productId: "22",
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
    productId: "23",
  },
];

describe("getProduct", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("contains a product with a title when there are products", async () => {
    mockedProductService.getProducts.mockResolvedValue(mockedProducts);
    mockedCartService.getCart.mockResolvedValue([]);
    render(<App />);

    const heading = await screen.findByRole("heading", {
      level: 3,
      name: "Kindle",
    });
    expect(heading).toBeInTheDocument();
  });
  it("contains a cart item with a title when there are cart items", async () => {
    mockedProductService.getProducts.mockResolvedValue(mockedProducts);
    mockedCartService.getCart.mockResolvedValue(mockedCart);
    render(<App />);

    const heading = await screen.findByRole("heading", {
      level: 2,
      name: "Your Cart",
    });
    expect(heading).toBeInTheDocument();
  });
  it("contains the add product form when showAddForm is set to true", async () => {
    mockedProductService.getProducts.mockResolvedValue([]);
    mockedCartService.getCart.mockResolvedValue([]);
    render(<App />);
    const addAProductButton = await screen.findByRole("button", {
      name: "Add A Product",
    });

    const user = userEvent.setup();
    await user.click(addAProductButton);

    const label = await screen.findByRole("textbox", { name: "Product Name:" });
    console.log(label);
    expect(label).toBeInTheDocument();
  });
});
