import styles from "./ProductItem.module.scss";
import { Button } from "antd";
import { getCartValue } from "../hooks/useCalculateInvoice";

const Cart = ({ cart, setInvoiceCreated }) => {
  const handleExecuteOrder = () => {
    setInvoiceCreated(true);
  };
  const totalPrice = getCartValue(cart);
  const productsInCart = cart.map((c) => {
    return (
      <div className={styles.productInCart}>
        <div>Product: {c[0].product.name}</div>
        <div>Price: {(c[0].product.price * c[0].quantity).toFixed(2)}</div>
        <div>Quantity: {c[0].quantity}</div>
      </div>
    );
  });
  return (
    <div className={styles.cartContainer}>
      <h2>CART</h2>
      {productsInCart}
      Total Price: {totalPrice}
      <Button
        type="primary"
        onClick={handleExecuteOrder}
        className={styles.buyButton}
        disabled={cart.length === 0}
      >
        Execute Order
      </Button>
    </div>
  );
};

export default Cart;
