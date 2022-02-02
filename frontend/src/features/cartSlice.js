import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], 
    // localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
    cartTotQuantity: 0,
    cartSubTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newProduct = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (newProduct >= 0) {
        // state.cartItems[newProduct].cartQuantity += 1;
        state.cartItems[newProduct] ={
          ...state.cartItems[newProduct],
          cartQuantity:state.cartItems[newProduct].cartQuantity + 1
        }
        toast.info(`${action.payload.name} Quantity is increased`, {
          position: "bottom-right",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} product is added to Cart`, {
          position: "bottom-right",
        });
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error(`${action.payload.name} product is removed from Cart`, {
        position: "bottom-right",
      });
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action) => {
      const decItems = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[decItems].cartQuantity > 1) {
         state.cartItems[decItems].cartQuantity -= 1;

        toast.info(`${action.payload.name} is decreased from cart`, {
          position: "bottom-center",
        });
      } else if (state.cartItems[decItems].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.error(`${action.payload.name} is decreased from the cart`, {
          position: "bottom-left",
        });
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    clearCart: (state)=>{
      state.cartItems = []
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotQuantity = quantity;
      state.cartSubTotal = total;
    },
  },
});

export const { addToCart, removeCartItem , decreaseCart ,getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
