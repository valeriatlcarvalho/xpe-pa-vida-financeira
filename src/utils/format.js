export function money(value) {
  return Number(value).toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
}

export function digits(value, digits) {
  return String(value).padStart(digits, "0");
}
