// src/services/CommentService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export async function fetchCommentsByNews(newsId: number) {
  const res = await axios.get(`${API_URL}/news/${newsId}/comments`);
  return res.data;
}

export async function addComment(newsId: number, payload: { content: string; author: string }) {
  const res = await axios.post(`${API_URL}/news/${newsId}/comments`, payload);
  return res.data;
}
