import api from "../api/axios";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data.data;
};

export const addCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);
  return response.data.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data.data;
};
