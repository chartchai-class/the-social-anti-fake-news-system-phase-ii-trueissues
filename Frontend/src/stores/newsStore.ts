
import { defineStore } from "pinia";
import axios from "axios";
import type { News } from "@/types/news";

export const useNewsStore = defineStore("news", {
  state: () => ({
    newsList: [] as News[],
    totalNews: 0,
  }),

  actions: {
   
    async fetchNews(status = "all", page = 1, limit = 6, q = "") {
      try {
        const params = { status, q, _page: page, _limit: limit };
        const res = await axios.get("/api/news", { params });

        this.newsList = res.data;

        const totalHeader =
          res.headers["x-total-count"] ||
          res.headers["X-Total-Count"] ||
          res.headers["X-total-count"];
        this.totalNews = Number(totalHeader || this.newsList.length);

        console.log("✅ News fetched:", this.newsList);
        console.log("🧩 totalNews:", this.totalNews);
        console.log("📄 page:", page, "limit:", limit, "status:", status, "q:", q);
      } catch (err) {
        console.error("❌ Error fetching news:", err);
        this.newsList = [];
        this.totalNews = 0;
      }
    },

    
    async fetchNewsById(id: number) {
      try {
        const res = await axios.get(`/api/news/${id}`);
        console.log("📰 Fetched single news:", res.data);
        return res.data;
      } catch (err) {
        console.error("❌ Error fetching news by id:", err);
        return null;
      }
    },

   
    async refreshNews(newsId: number) {
      try {
        const updated = await this.fetchNewsById(newsId);
        if (!updated) return;

       
        const idx = this.newsList.findIndex((n) => n.id === newsId);
        if (idx !== -1) {
          this.newsList[idx] = updated;
        }

        console.log("♻️ Refreshed news:", updated);
      } catch (err) {
        console.error("❌ Failed to refresh news:", err);
      }
    },
  },
});
