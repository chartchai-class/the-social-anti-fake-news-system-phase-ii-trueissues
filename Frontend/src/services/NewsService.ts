import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

export const getNewsList = async (status = "all", page = 1, limit = 9, q = "") => {
  const response = await axios.get(API_URL, {
    params: { status, _page: page, _limit: limit, q }
  });
  const total = parseInt(response.headers["x-total-count"]);
  return { data: response.data, total };
};

export const getNewsById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
