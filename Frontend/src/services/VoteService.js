// src/services/VoteService.ts
import axios from "axios";
const API_URL = "http://localhost:8080/api";
export async function fetchVotesByNews(newsId) {
    const res = await axios.get(`${API_URL}/news/${newsId}/votes`);
    return res.data;
}
export async function addVote(newsId, type) {
    const res = await axios.post(`${API_URL}/news/${newsId}/votes`, { type });
    return res.data;
}
