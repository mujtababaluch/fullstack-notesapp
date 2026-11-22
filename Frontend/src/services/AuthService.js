import api from "../api/axios";

export const signup = async (username, email, password) => {
   const response = await api.post("/auth/signup", { username, email, password });
   return response.data;
};

export const login = async (email, password) => {
   const response = await api.post("/auth/login", { email, password });
   return response.data;
};
