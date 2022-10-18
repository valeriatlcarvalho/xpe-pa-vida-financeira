import { api } from "./api";

export async function createCard(values) {
  const { data } = await api.post("/cards", values);
  return data;
}

export async function updateCard(id, values) {
  const { data } = await api.put(`/cards/${id}`, values);
  return data;
}

export async function deleteCard(id) {
  const { data } = await api.delete(`/cards/${id}`);
  return data;
}

export async function listCards(params) {
  const { data } = await api.get("/cards", { params });
  return data;
}
