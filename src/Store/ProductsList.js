import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  products: [
    {
      id: "",
      name: "",
      inStock: "",
      gallery: [],
      price: { currency: { label: "", symbol: "" }, amount: "" },
      brand: "",
    },
  ],
  currencySelected: { label: "USD", symbol: "$" },
  param: "",
};
export const ProductsList = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateProductList(state, action) {
      state.name = action.payload.name;
      const products = action.payload.products.map((item) => {
        const id = item.id;
        const name = item.name;
        const inStock = item.inStock;
        const gallery = item.gallery[0];
        const price = item.prices.find(
          (el) => el.currency.label === state.currencySelected.label
        );
        const brand = item.brand;
        return { id, name, inStock, gallery, price, brand };
      });
      state.products = products;
    },
    setparam(state, action) {
      state.param = action.payload;
    },
    setcurrency(state, action) {
      state.currencySelected = action.payload;
    },
  },
});

export const { updateProductList, setparam, setcurrency } =
  ProductsList.actions;
export default ProductsList.reducer;

export function fetchProductsList(param) {
  return async function fetchProductsThunk(dispatch, getState) {
    dispatch(setparam(param));
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
 {
  category(input:{title:"${param}"}){
    name
    products{ 
          id
        name
        inStock
        gallery
        prices  {
currency { 
label
symbol
}
amount
}
        brand
    }
    
  }
}
`,
        }),
      });
      const { data } = await res.json();

      dispatch(updateProductList(data.category));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchProductListWithSelectedCurrency(value) {
  return async function fetchProductListWithSelectedCurrencyThunk(
    dispatch,
    getState
  ) {
    const param = getState().productList.param;
    dispatch(setcurrency(value));
    dispatch(fetchProductsList(param));
  };
}
