import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { ProductContext } from "../context";

const Details = () => {
  const { dproducts, addToCart, openModal } = React.useContext(ProductContext);
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue- my-5">
          <h1>{dproducts.title}</h1>
        </div>
      </div>
      {/* end title */}
      {/* product info */}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={dproducts.img} className="img-fluid" alt="product" />
        </div>
        {/* product text */}
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize ">
          <h2>model : {dproducts.title}</h2>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by :{" "}
            <span className="text-uppercase">{dproducts.company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price: <span>$</span>
              {dproducts.price}
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about the product:
          </p>{" "}
          <p className="text-muted lead">{dproducts.info}</p>
          {/* buttons */}
          <div>
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              disabled={dproducts.inCart ? true : false}
              onClick={() => {
                addToCart(dproducts.id);
                openModal(dproducts.id);
              }}
            >
              {dproducts.inCart ? "in cart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
