export const getCartValue = (cart) => {
  cart.reduce((accumulator, value) => {
    return accumulator + value[0].quantity * value[0].product.price;
  }, 0);
};
//
// const getProductsWithHigherThanMaxQty = (itemsWithLowerThanMaxPrice) => {
//   let finalArrayBeforeIndexing = [];
//   itemsWithLowerThanMaxPrice.map((value) => {
//     if (Object.keys(value).length === 0) return null;
//     let index = 0;
//     while (value[0].quantity > 50) {
//       finalArrayBeforeIndexing.splice(index, 0, value);
//       value[0].quantity -= 50;
//       index++;
//     }
//     if (value[0].quantity > 0 && index > 0) {
//       finalArrayBeforeIndexing.splice(index, 0, value);
//       index++;
//     }
//     if (value[0].quantity > 0 && index === 0) {
//       finalArrayBeforeIndexing.splice(index, 0, value);
//     }
//   });
//   return finalArrayBeforeIndexing;
// };
const getSplitCartIndexes = (cart) => {
  const indexesToSplit = [];
  let valueOfItems = 0;
  cart.reduce((accumulator, currentProduct, currentIndex) => {
    if (Object.keys(currentProduct).length === 0) return valueOfItems;

    const price = currentProduct[0].quantity * currentProduct[0].product.price;
    valueOfItems = accumulator + price;

    if (valueOfItems > 500) {
      indexesToSplit.push(currentIndex - 1);
    }
    return valueOfItems > 500 ? price : valueOfItems;
  }, 0);
  return indexesToSplit;
};

export const useCalculateInvoice = (cart) => {
  const invoices = [];
  const itemsWithLowerThanMaxPrice = [];
  if (getCartValue(cart) <= 500) {
    invoices.push(cart);
    return { invoices };
  }

  for (const c of cart) {
    if (c[0].product.price > 500) {
      invoices.push(c);
      itemsWithLowerThanMaxPrice.push({});
    } else {
      itemsWithLowerThanMaxPrice.push(c);
    }
  }

  const indexesToSplit = getSplitCartIndexes(itemsWithLowerThanMaxPrice);

  let previous = 0;
  const filteredItemWithLowPrice = itemsWithLowerThanMaxPrice.filter(
    (item) => Object.keys(item).length !== 0
  );
  for (const [loopIndex, indexToSplit] of indexesToSplit.entries()) {
    if (loopIndex === 0) {
      invoices.push(filteredItemWithLowPrice.slice(0, indexToSplit + 1));
    } else {
      if (indexesToSplit.length - 1 === loopIndex) {
        invoices.push(
          filteredItemWithLowPrice.slice(
            indexToSplit,
            filteredItemWithLowPrice.length
          )
        );
      } else {
        invoices.push(
          filteredItemWithLowPrice.slice(previous + 1, indexToSplit + 1)
        );
      }
    }
    previous = indexToSplit;
  }
  return { invoices };
};
