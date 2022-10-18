import { api } from "./api";

export async function createSubscription(values) {
  const { data } = await api.post("/subscriptions", values);
  return data;
}

export async function updateSubscription(id, values) {
  const { data } = await api.put(`/subscriptions/${id}`, values);
  return data;
}

export async function deleteSubscription(id) {
  const { data } = await api.delete(`/subscriptions/${id}`);
  return data;
}

export async function listSubscriptions(params) {
  const { data } = await api.get("/subscriptions", { params });
  return data;
}
