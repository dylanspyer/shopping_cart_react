# Shopping Cart App

## Questions

- Re setting the state of the product list: I tried to import the ProductList type as ProductListType and use that instead of an array of products, but it wouldn't work..why?

- I wasn't sure about naming conventions when passing handlers with prop drilling. Whenever I was prop drilling, I named the handler `handle` until I got to where I was using it. For example, when I pass `handleDeleteProduct` from `App` to `ProductListing` to `Product`, then finally I can call `handleDeleteProduct` when the click event fires. Wasn't sure if this was a correct convention.

- Is how I'm handling the edit form correct? Passing in initial values and having the component keep its own state with those as the starting value.

- Before I set the type of `productList` in `App.tsx`, I was getting a weird Typescript error in the `handleEditProduct` function. It seemed like the call to `map` was causing an issue, but I couldn't figure out why. Setting the type of `productList` fixed the issue, but I wasn't super clear why that handler broke, but not the other ones.

## Setup

1. Install [Node.js](https://nodejs.org/en/download/package-manager/) if you haven't already
2. Clone this repository
3. `cd` into the downloaded directory
4. `cd` into server and run `npm install` from the command line to install all dependencies

## DataBase Setup

1. Create mongoDB account - https://account.mongodb.com/account/register
2. Create a free AWS cluster
3. Go to `collections` (Browse Collections) and create a new database (shopping_cart) for example with two collections `products` and `cartitems`. Note: If you are going to work in pairs create two databases (for example team1_shopping and team2_shopping) and each database should have two collections `products` and `cartitems`.
4. Under Security tab, click Database Access, and on the right `add new database user`. After you enter username and password, click `add user` at the bottom right corner.
5. Under Security tab, click Network Access, and whitelist your IP address.
6. Once your cluster is created, under Clusters tab, click connect and then MongoDB for VSCode and copy the connection string which will look something like this `mongodb+srv://test123:<password>@cluster0-zamyu.mongodb.net/`. Instead of `test123` there will be your username, and you will need to replace `<password>` with your password and `test` with the database name. You will have to put the name of your database after the connection string with some flags `mongodb+srv://test123:<password>@cluster0-zamyu.mongodb.net/<databaseName>?retryWrites=true&w=majority`. Change `<databaseName>` with the name of your database.
7. Finally, inside your project folder, `cd` into server, create new file `.env` and enter `DB=<paste the string from above here>`. It will look similar to this `DB=mongodb+srv://test123:mypass@cluster0-zamyu.mongodb.net/shopping_cart?retryWrites=true&w=majority`.

## Viewing Static Version of the App

While developing the app, you can take a look at the static pages that you'll eventually convert into a dynamic application. To do so, visit `http://localhost:5001/ui` in the browser. You are also encouraged to read and reuse the markup, classes and ids used in these static files in your components. They're located in the `/server/public/ui` folder.

## Developing the app

The starting point of the application is the `/client/src/index.js` file. That's where the root component of the application - `App` - is rendered to the DOM. You can add new components to the `/client/src/components` folder and new test files to the `/client/src/tests` folder.

For the initial application data, you can start with the following list of products:

```js
[
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
  {
    id: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    id: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
];
```

## DOCS

You can find documentation in the `docs` folder in `api.md` file.

# shopping_cart_react

# shopping_cart_react
