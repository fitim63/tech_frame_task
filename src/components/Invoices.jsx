import {
  getCartValue,
  useCalculateInvoice,
} from "../hooks/useCalculateInvoice";
import styles from "./ProductItem.module.scss";

const Invoices = ({ cart }) => {
  const { invoices } = useCalculateInvoice(cart);
  const priceCalculatedWithVat = (price, quantity, vat, discount) => {
    const totalPrice = price * quantity - discount;
    return totalPrice + totalPrice * (vat / 100);
  };
  const getSubtotal = (invoice) => {
    let subtotal = 0;
    if (Array.isArray(invoice)) {
      for (const inv of invoice) {
        subtotal += priceCalculatedWithVat(
          inv[0].product.price,
          inv[0].quantity,
          inv[0].product.vat,
          inv[0].product.discount
        );
      }
    } else {
      subtotal += priceCalculatedWithVat(
        invoice[0].product.price,
        invoice[0].quantity,
        invoice[0].product.vat,
        invoice[0].product.discount
      );
    }
    return subtotal;
  };

  const getTotalVat = (invoice) => {
    return 0;
  };
  return (
    <div className={styles.invoice}>
      {invoices.map((invoice) => (
        <table>
          <tr>
            <td colSpan="6">Invoice</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>QTY</td>
            <td>Price</td>
            <td>Discount</td>
            <td>VAT</td>
            <td>Total</td>
          </tr>
          {Array.isArray(invoice) ? (
            invoice.map((inv) => (
              <>
                <tr>
                  <td>{inv[0].product.name}</td>
                  <td>{inv[0].quantity}</td>
                  <td>{inv[0].product.price}</td>
                  <td>{inv[0].product.discount}</td>
                  <td>{inv[0].product.vat}$</td>
                  <td>
                    {priceCalculatedWithVat(
                      inv[0].product.price,
                      inv[0].quantity,
                      inv[0].product.vat,
                      inv[0].product.discount
                    )}
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td>{invoice[0].product.name}</td>
              <td>{invoice[0].quantity}</td>
              <td>{invoice[0].product.price}</td>
              <td>{invoice[0].product.discount}</td>
              <td>{invoice[0].product.vat}</td>
              <td>
                {priceCalculatedWithVat(
                  invoice[0].product.price,
                  invoice[0].quantity,
                  invoice[0].product.vat,
                  invoice[0].product.discount
                )}
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5">Subtotal</td>
            <td>{getSubtotal(invoice).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Vat</td>
            <td>{getTotalVat(invoice)}</td>
          </tr>
          <tr>
            <td colSpan="5">Total</td>
            <td>100</td>
          </tr>
        </table>
      ))}
    </div>
  );
};
export default Invoices;
