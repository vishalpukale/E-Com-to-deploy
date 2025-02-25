export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed();
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => Number(acc) + item.price * item.quantity,
      0
    )
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 300 ? 0 : 50)

  state.taxPrice = addDecimals(Number(0.15*state.itemsPrice).toFixed(2))

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice) 
  ).toFixed(2)

  localStorage.setItem('cart', JSON.stringify(state))

  return state;
};
