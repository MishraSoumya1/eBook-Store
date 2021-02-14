export const convertCurrency = (currency) => {
  let k, temp;

  for (let i = 0; i < currency.length; i++) {
    k = currency.charCodeAt(i);
    if (k > 47 && k < 58) {
      temp = currency.substring(i);
      break;
    }
  }

  temp = temp.replace(/, /, "");

  return parseFloat(temp);
};
