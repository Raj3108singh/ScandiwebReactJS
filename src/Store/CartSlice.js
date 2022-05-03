import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalquantity: 0,
  totalAmount: 0,
  selectedCurrency: "$",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addproduct: (state, action) => {
      //set the selected currency so that prices can be filtered based on this value
      state.selectedCurrency = action.payload.price.currency.symbol;
      // Check if cart is empty. If Empty we are pushing the payload from the action.
      if (!state.products.length > 0) {
        state.products.push(action.payload);
        state.totalAmount += action.payload.itemAmount;
        state.totalquantity += 1;
      } else {
        //In this block we are sure that the cart is not empty.
        //Now we have two situation wheather the cart has existing similar payload id or not
        //If not , we just return with the old state adding payload to it and update the total quantity and total amount --done
        //if the id is matching check if the attributes are matching or not.
        //If attribute not matching ,add item as a seperate order
        //if attribute matching increase the quantity and totall amount for that existing item
        const existingProduct = state.products.filter(
          (item) => item.id === action.payload.id
        );

        if (existingProduct.length === 0) {
          //since no existing product we just return  the old state
          // adding payload and update the total quantity and total amount
          state.products = [...state.products, action.payload];
          state.totalAmount += action.payload.itemAmount;
          //action.payload.price.amount * action.payload.quantity;
          state.totalquantity += 1;
        } else if (existingProduct.length !== 0) {
          //if the id is matching check if the attributes are matching or not.
          //If attribute not matching ,add it as a seperate order
          //if attribute matching increase the quantity and total amount for that product id
          const existingObjwithSameAttri = [];
          let isExistingObjwithSameAttri = false;
          const product = existingProduct.forEach((el) => {
            const arr = el.attributes.filter(
              (el1) =>
                !action.payload.attributes.find(
                  (item) => item.id === el1.id && item.value === el1.value
                )
            );
            if (arr.length === 0) {
              isExistingObjwithSameAttri = true;
              //if arr length is zero it means all the attribute isss matching
              //el.price.amount += action.payload.price.amount / el.quantity;
              el.price.amount += action.payload.itemAmount;
              el.quantity += 1;
            }
            existingObjwithSameAttri.push(el);
          });
          if (isExistingObjwithSameAttri) {
            const otherexistingProduct = state.products.filter(
              (item) => item.id !== action.payload.id
            );
            state.products = [
              ...existingObjwithSameAttri,
              ...otherexistingProduct,
            ];
            state.totalAmount += action.payload.itemAmount;
            //action.payload.price.amount * action.payload.quantity;
            state.totalquantity += 1;
            //action.payload.quantity;
          } else {
            state.products = [...state.products, action.payload];
            state.totalAmount += action.payload.itemAmount;
            //action.payload.price.amount * action.payload.quantity;
            state.totalquantity += 1;
            //action.payload.quantity;
          }
        }
      }
    },
    removeproduct: (state, action) => {
      //Find the index of the existing object
      const existingProoduct = state.products.findIndex((item) => {
        let returnItem = false;
        //If items id is same but attributes are not matching , we don't take it
        if (item.id === action.payload.id) {
          if (item.attributes.length !== action.payload.attributes.length) {
            returnItem = false;
          } else if (
            item.attributes.length === 0 &&
            action.payload.attributes.length === 0
          ) {
            returnItem = true;
          } else {
            //here I am finding the item with same attributes ,
            //since there can be multiple items with same id but diferent attributes
            const attributesEqual = item.attributes.filter((el1) =>
              action.payload.attributes.find(
                (el2) => el1.id === el2.id && el1.value === el2.value
              )
            );
            if (attributesEqual.length) {
              returnItem = true;
            }
          }
        }
        return returnItem;
      });
      //Calculating price of single item
      const priceToReduce =
        state.products[existingProoduct].price.amount /
        state.products[existingProoduct].quantity;
      state.products[existingProoduct].quantity -= 1;
      state.products[existingProoduct].price.amount -= priceToReduce;

      state.totalquantity -= 1;
      state.totalAmount -= priceToReduce;
      state.products = state.products.filter((item) => item.quantity !== 0);
    },
  },
});

export const { addproduct, removeproduct } = cartSlice.actions;
export default cartSlice.reducer;
