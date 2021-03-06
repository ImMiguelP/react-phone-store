import React, { useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

export const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = React.useState([]);
  const [dproducts, setDproducts] = React.useState(detailProduct);
  const [cart, setCart] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(dproducts);
  const [cartSubtotal, setCartSubtotal] = React.useState(0);
  const [cartTax, setCartTax] = React.useState(0);
  const [cartTotal, setCartTotal] = React.useState(0);

  useEffect(() => {
    copyProducts();
  }, []);

  const copyProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  };

  const getItem = (id) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setDproducts(product);
  };
  const addToCart = (id) => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts(tempProducts);
    setCart([...cart, product]);
  };

  const addTotals = React.useCallback(() => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubtotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  }, [cart]);

  React.useEffect(() => {
    addTotals();
  }, [addTotals]);

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    setCart([...tempCart]);
    addTotals();
  };
  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setCart([...tempCart]);
      addTotals();
    }
  };
  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart([...tempCart]);
    setProducts([...tempProducts]);
    addTotals();
  };
  const clearCart = () => {
    setCart([]);
    copyProducts();
    addTotals();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        dproducts,
        cart,
        modalOpen,
        modalProduct,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        cartSubtotal,
        cartTax,
        cartTotal,
        increment,
        decrement,
        removeItem,
        clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
