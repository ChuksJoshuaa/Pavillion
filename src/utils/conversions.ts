export const randy = () => Math.floor(Math.random() * 1000000);
export const NumberChange = (digit: number) => {
  return digit.toLocaleString();
};

export const currencyFormatter = (icon: string, amount: number) => {
  if (icon === "$") {
    const value = amount * 0.0022;
    const newValue = value.toFixed(2);
    return `${icon}${newValue}`;
  } else if (icon === "£") {
    const value = amount * 0.002;
    const newValue = value.toFixed(2);
    return `${icon}${newValue}`;
  } else {
    const value = amount * 0.29;
    const newValue = value.toFixed(2);
    return `${icon}${newValue}`;
  }
};

export const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
