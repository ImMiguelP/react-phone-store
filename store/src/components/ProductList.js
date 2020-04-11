import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "../context";

const ProductLists = () => {
  const { products } = React.useContext(ProductContext);
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="Our" title="Products" />
          <div className="row">
            {products.map(product => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductLists;
