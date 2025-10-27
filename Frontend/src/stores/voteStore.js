import { defineStore } from "pinia";
import axios from "axios";
import { useNewsStore } from "@/stores/newsStore";
export const useVoteStore = defineStore("voteStore", {
    state: () => ({
        voteList: [],
        totalVotes: 0,
        isLoading: false,
    }),
    actions: {
        async fetchVotes(newsId, page = 1, limit = 5) {
            this.isLoading = true;
            try {
                const res = await axios.get(`http://localhost:8080/api/votes/news/${newsId}`, {
                    params: { _page: page, _limit: limit },
                });
                this.voteList = res.data;
                this.totalVotes =
                    Number(res.headers["x-total-count"]) || res.data.length;
                console.log("✅ Votes fetched:", this.voteList);
            }
            catch (err) {
                console.error("❌ Failed to fetch votes:", err);
                this.voteList = [];
            }
            finally {
                this.isLoading = false;
            }
        },
        async addVote(newsId, payload) {
            try {
                const res = await axios.post(`http://localhost:8080/api/votes/news/${newsId}`, payload);
                console.log("✅ Vote added:", res.data);
                const newsStore = useNewsStore();
                await newsStore.refreshNews(newsId);
                await this.fetchVotes(newsId);
                return res.data;
            }
            catch (err) {
                console.error("❌ Failed to add vote:", err);
                throw err;
            }
        },
        async deleteVote(voteId) {
            try {
                await axios.delete(`http://localhost:8080/api/votes/${voteId}`);
                this.voteList = this.voteList.filter((v) => v.id !== voteId);
                console.log("🗑 Vote deleted:", voteId);
            }
            catch (err) {
                console.error("❌ Failed to delete vote:", err);
            }
        },
    },
});
