import styles from "./ProductItem.module.scss";
import { Button, InputNumber } from "antd";

const ProductItem = ({ product, handleAddToCart, handleInputChange }) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.productContainerLeftSide}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.price}> Price ${product.price}</div>
      </div>
      <div className={styles.rightSide}>
        <Button type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <InputNumber
          className={styles.input}
          addonAfter="Qty"
          size={"small"}
          min={0}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
export default ProductItem;
