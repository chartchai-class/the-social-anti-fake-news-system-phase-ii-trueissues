
import { defineStore } from "pinia";
import { fetchCommentsByNews, addComment } from "@/services/CommentService";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [] as any[],
  }),

  actions: {
    async fetchByNews(newsId: number) {
      this.comments = await fetchCommentsByNews(newsId);
    },

    async create(newsId: number, content: string, author: string) {
      const newComment = await addComment(newsId, { content, author });
      this.comments.push(newComment);
    },
  },
});
