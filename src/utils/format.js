export function money(value) {
  return Number(String(value).replace(',','.')).toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
}

export function digits(value, digits) {
  return String(value).padStart(digits, "0");
}
