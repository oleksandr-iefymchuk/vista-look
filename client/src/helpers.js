export const calculateDiscountedPrice = (price, discount) => {
  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice;
};

export const isNewProduct = date => {
  const currentDate = new Date();
  const dateAdded = new Date(date);
  const differenceInMilliseconds = currentDate - dateAdded;
  const halfYearInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
  return differenceInMilliseconds <= halfYearInMilliseconds;
};

export const formatDate = dateString => {
  const dateOnly = dateString.slice(0, 10);
  const [year, month, day] = dateOnly.split('-');
  return `${day}.${month}.${year}`;
};

export const calculatePrice = (products, basket) => {
  const sum = basket.reduce((total, { productId, quantity }) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);

  const totalDiscount = basket.reduce((total, { productId, quantity }) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const totalPrice = product.price * quantity;
      const discountedPrice = calculateDiscountedPrice(
        totalPrice,
        product.discount
      );
      return total + (totalPrice - discountedPrice);
    }
    return total;
  }, 0);

  const totalPrice = sum - totalDiscount;

  return {
    sum: parseFloat(sum.toFixed(2)),
    totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2))
  };
};
