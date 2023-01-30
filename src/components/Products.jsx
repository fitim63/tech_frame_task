import { products } from "../constants/mockData";
import ProductItem from "./ProductItem";
import { useState } from "react";

const Products = ({ setCart, cart }) => {
  const [productsWithQuantity, setProductsWithQuantity] = useState([]);
  const handleAddToCart = (product) => {
    if (cart.filter((c) => c[0].product.id === product.id).length === 0) {
      const productToBePushed = productsWithQuantity.filter(
        (p) => p.product.id === product.id
      );
      if (productToBePushed.length > 0) {
        setCart([...cart, { ...productToBePushed }]);
      }
    }
  };
  const handleInputChange = (value, product) => {
    const indexOfExisting = productsWithQuantity.findIndex(
      (p) => p.product.id === product.id
    );
    if (indexOfExisting > -1) {
      productsWithQuantity[indexOfExisting].quantity = value;
    } else {
      setProductsWithQuantity([
        ...productsWithQuantity,
        { quantity: value, product: product },
      ]);
    }
  };
  return (
    <div>
      {products.map((product) => (
        <ProductItem
          product={product}
          handleAddToCart={() => handleAddToCart(product)}
          handleInputChange={(value) => handleInputChange(value, product)}
        />
      ))}
    </div>
  );
};

export default Products;
