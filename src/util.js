export const formatDate = (date) => {
  const fDate = new Date(date);
  return fDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

 