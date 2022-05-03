import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  productDetail: {
    id: "",
    name: "",
    inStock: "",
    category: "",
    defaultImg: "",
    gallery: [],
    description: "",
    attributes: [{ items: [] }],
    prices: { currency: { label: "", symbol: "" }, amount: "" },
  },

  currency: "USD",
  param: "",
  //currencySymbol: "$",
};
export const ProductDetailsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDataa(state, action) {
      state.productDetail.id = action.payload.product.id;
      state.productDetail.name = action.payload.product.name;
      state.productDetail.inStock = action.payload.product.inStock;
      state.productDetail.category = action.payload.product.category;
      state.productDetail.defaultImg = action.payload.product.gallery[0];
      state.productDetail.gallery = [...action.payload.product.gallery];
      state.productDetail.description = action.payload.product.description;
      state.productDetail.attributes = action.payload.product.attributes;
      state.productDetail.prices = action.payload.product.prices.find(
        (item) => item.currency.label === state.currency
      );
    },
    updateDefaultImg(state, action) {
      state.productDetail.defaultImg = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload.label;
      state.currencySymbol = action.payload.symbol;
    },
    setParam(state, action) {
      state.param = action.payload;
    },
  },
});

export const { addDataa, updateDefaultImg, setCurrency, setParam } =
  ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;

export function fetchProductDetail(param) {
  return async function fetchProductDetailThunk(dispatch, getState) {
    dispatch(setParam(param));
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
 {
  product(id:"${param.id}"){
    		id
        name
        inStock
        gallery
        description
    	  category
    attributes{
      id
      name
      type
      items{ displayValue
      value
      id}
    }
    prices  {
currency { 
label
symbol
}
      amount
    }
  }
}
`,
        }),
      });
      const { data } = await res.json();

      dispatch(addDataa(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchProductDetailwithSelectedCurrency(value) {
  return async function fetchProductDetailwithSelectedCurrencyThunk(
    dispatch,
    getState
  ) {
    const param = getState().productDetails.param;
    dispatch(setCurrency(value));
    dispatch(fetchProductDetail(param));
  };
}
