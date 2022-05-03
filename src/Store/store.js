import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import CurrenciesSlice from "./CurrencySlice";
import ProductDetailsSlice from "./ProductDetailsSlice";
import ProductsList from "./ProductsList";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    productDetails: ProductDetailsSlice,
    currenciesList: CurrenciesSlice,
    productList: ProductsList,
  },
});

export default store;
