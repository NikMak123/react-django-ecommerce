import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: {},
    paymentMethod: {},
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const { setCartItems, removeCartItem, setShippingAddress, setPaymentMethod } = cartSlice.actions;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const numericQty = parseInt(qty, 10);
    const { cartItems } = getState().cart;

    const product = await cartAPI.fetchProduct(id);

    // Ensure that the key is the same (_id)
    const existingItemIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        qty: numericQty, // replace with new qty
      };
      dispatch(setCartItems(updatedCartItems));
    } else {
      dispatch(setCartItems([...cartItems, { ...product, qty: numericQty }]));
    }
  } catch (error) {
    console.log("Error adding item to cart", error);
  }
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch(removeCartItem(id));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(setShippingAddress(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(setPaymentMethod(data));
};

export const { reducer } = cartSlice;
