import { defineStore } from "pinia";
import { fetchCommentsByNews, addComment } from "@/services/CommentService";
export const useCommentStore = defineStore("comment", {
    state: () => ({
        comments: [],
    }),
    actions: {
        async fetchByNews(newsId) {
            this.comments = await fetchCommentsByNews(newsId);
        },
        async create(newsId, content, author) {
            const newComment = await addComment(newsId, { content, author });
            this.comments.push(newComment);
        },
    },
});
