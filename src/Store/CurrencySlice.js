import { createSlice } from "@reduxjs/toolkit";
import CurrencyQuery from "../Query/query.json";

const query = CurrencyQuery.Currency;

const initialState = {
  Currencies: [],
  SelectedCurrency: "USD",
};
export const CurrenciesSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrencyList(state, action) {
      state.Currencies = action.payload;
    },
  },
});

export const { updateCurrencyList } = CurrenciesSlice.actions;
export default CurrenciesSlice.reducer;

export function fetchCurrencies() {
  return async function fetchCurrenciesThunk(dispatch, getState) {
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query
        }),
      });
      const { data } = await res.json();

      dispatch(updateCurrencyList(data.currencies));
    } catch (err) {
      console.log(err);
    }
  };
}
