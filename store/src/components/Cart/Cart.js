import React from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

const Cart = () => {
  const value = React.useContext(ProductContext);
  const { cart } = value;

  if (cart.length > 0) {
    return (
      <React.Fragment>
        <Title name="your" title="cart" />
        <CartColumns />
        <CartList value={value} />
        <CartTotals value={value} />
      </React.Fragment>
    );
  }

  return (
    <section>
      <EmptyCart />
    </section>
  );
};

export default Cart;
