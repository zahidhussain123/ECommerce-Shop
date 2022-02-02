import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>An Error occurred... </p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.image} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                  {/* <h2>{product.brand}</h2> */}
                </div>
                <button onClick={() => handleSubmit(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
