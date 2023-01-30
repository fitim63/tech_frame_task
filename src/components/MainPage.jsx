import React, { useState } from "react";
import Products from "./Products";
import Cart from "./Cart";
import styles from "./ProductItem.module.scss";
import Invoices from "./Invoices";

const MainPage = () => {
  const [cart, setCart] = useState([]);
  const [invoiceCreated, setInvoiceCreated] = useState(false);
  return (
    <div className={styles.mainContainer}>
      <Products setCart={setCart} cart={cart} />
      <Cart cart={cart} setInvoiceCreated={setInvoiceCreated} />
      {invoiceCreated && <Invoices cart={cart} />}
    </div>
  );
};

export default MainPage;
