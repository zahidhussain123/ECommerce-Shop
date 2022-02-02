import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeCartItem } from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(getTotals())
  },[cart ,dispatch])

  const handleCartRemove = (cartItem) => {
    dispatch(removeCartItem(cartItem));
  };

  const handleAddCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecItem = (Item) => {
    dispatch(decreaseCart(Item));
  };

  const deleteCart = () => {
    dispatch(clearCart())
  }
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity"> Quantity</h3>
            <h3 className="total"> Total</h3>
          </div>
          <div className="cart-items">
            { cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleCartRemove(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecItem(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button className="clear-cart" onClick={deleteCart}> Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>SubTotal</span>
                <span className="amount">${cart.cartSubTotal}</span>
              </div>
              <p>Taxes and Shipping calculated at Checkout</p>
              <button>Check Out</button>
              <div className="Continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                    style={{ marginTop: "10px" }}
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                  </svg>
                  <span style={{ marginLeft: "15px" }}>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
