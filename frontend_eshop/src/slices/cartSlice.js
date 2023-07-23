import { createSlice } from "@reduxjs/toolkit";
//in other slice before we use create API because that was the slice where we have endPoints that are dealing with asynchronous requests, but we are not doing that with cart, so we do not need to use create API, we can simply use create slice function
import { updateCart } from "../utils/cartUtils";

//our items are going to store in local storage, so that when we leave the site, we come back, our items are still in the cart, so we want to check that localstorage item first.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //state is the current state of the cart and action will include any data inside of a payload, so in this case, we are going to be sending an item to add to the cart which we can access with action.payload
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
  },
  //in this reducer object we will have any funtions that have to do with the cart, so when we add to cart, remove etc..
  //anything we create in reducers such as add to cart, remove from cart, save shipping address, need to export those as actions, but we also want to export the reducers altogether and bring into our store file
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
