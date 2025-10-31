<!-- src/components/CommentSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps<{ newsId: number }>();

const store = useCommentStore();
const auth = useAuthStore();
const newComment = ref("");

onMounted(() => {
  store.fetchByNews(props.newsId);
});

async function submitComment() {
  if (!newComment.value.trim()) return;
  await store.create(props.newsId, newComment.value, auth.user?.name || "Guest");
  newComment.value = "";
}
</script>

<template>
  <section class="mt-10 border-t pt-6">
    <h2 class="text-lg font-semibold mb-3">💬 Comments ({{ store.comments.length }})</h2>

    <div v-if="auth.user" class="mb-4">
      <textarea
        v-model="newComment"
        placeholder="Write a comment..."
        class="w-full border rounded-lg p-2 text-sm resize-none"
      ></textarea>
      <button
        @click="submitComment"
        class="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Post
      </button>
    </div>
    <p v-else class="text-gray-500 text-sm">Please login to comment.</p>

    <ul class="space-y-3 mt-4">
      <li
        v-for="c in store.comments"
        :key="c.id"
        class="border rounded-lg p-3 bg-white"
      >
        <p class="text-sm">{{ c.content }}</p>
        <p class="text-xs text-gray-400 mt-1">By: {{ c.author }}</p>
      </li>
    </ul>
  </section>
</template>
