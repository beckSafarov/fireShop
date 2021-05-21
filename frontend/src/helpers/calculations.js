export const placeOrderCalculations = (cartItems = []) => {
  if (cartItems.length === 0)
    return {
      productsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

  // add decimals function
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calculating the total price of products
  let productsPrice = 0;
  cartItems.forEach((item) => {
    productsPrice += item.qty * item.price;
  });

  // calculating the shipping price
  const shippingPrice = addDecimals(
    productsPrice > 0 ? (productsPrice > 1000 ? 15 : 10) : 10
  );

  const taxPrice = addDecimals((productsPrice * 0.05).toFixed(2));

  const totalPrice = addDecimals(
    Number(productsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  return {
    productsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
