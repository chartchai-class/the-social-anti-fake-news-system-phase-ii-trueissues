<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface CommentWithVote {
  id: number;
  userName?: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  voteType?: string; 
  newsId?: number;
}

const comments = ref<CommentWithVote[]>([]);
const isLoading = ref(true);
const isReady = ref(false);
const hasError = ref(false);


async function loadComments() {
  try {
    isLoading.value = true;

   
    const res = await axios.get("http://localhost:8080/api/admin/vote-comments");

    
    comments.value = res.data || [];
    isReady.value = true;
    console.log("✅ Comments with votes fetched:", comments.value);
  } catch (err) {
    console.error("❌ Failed to fetch comments:", err);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}


async function removeComment(id: number) {
  if (!confirm("🗑️ Delete this comment and its vote?")) return;
  try {
    await axios.delete(`http://localhost:8080/api/admin/votes/${id}`);
    comments.value = comments.value.filter((c) => c.id !== id);
    console.log("🗑️ Deleted comment/vote:", id);
  } catch (err) {
    console.error("❌ Failed to delete comment/vote:", err);
    alert("Failed to delete comment. Please try again.");
  }
}

onMounted(loadComments);
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      💬 Admin - Manage Comments & Votes
    </h1>

  
    <div v-if="isLoading" class="text-center text-gray-400 py-12">
      Loading comments & votes...
    </div>

    <div v-else-if="hasError" class="text-center text-red-500 py-12">
      ❌ Failed to load comments. Please try again later.
    </div>

 
    <div
      v-else-if="isReady && (!comments || comments.length === 0)"
      class="text-center text-gray-500 py-12 italic"
    >
      No comments found.
    </div>


    <div v-else class="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table class="min-w-full text-sm text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3 border-b text-center">ID</th>
            <th class="px-4 py-3 border-b">User</th>
            <th class="px-4 py-3 border-b">Comment</th>
            <th class="px-4 py-3 border-b text-center">Vote</th>
            <th class="px-4 py-3 border-b text-center">News ID</th>
            <th class="px-4 py-3 border-b">Created</th>
            <th class="px-4 py-3 border-b text-center">Image</th>
            <th class="px-4 py-3 border-b text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="c in comments"
            :key="c.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-b text-center text-gray-600">
              {{ c.id }}
            </td>
            <td class="px-4 py-2 border-b text-gray-800">
  {{ c.userName || "Anonymous" }}
</td>

            <td class="px-4 py-2 border-b text-gray-600">
              {{ c.content || "-" }}
            </td>

            <td
              class="px-4 py-2 border-b text-center font-semibold"
              :class="{
                'text-green-600': c.voteType === 'NOT_FAKE',
                'text-red-500': c.voteType === 'FAKE',
                'text-gray-500': !c.voteType || c.voteType === 'UNCERTAIN',
              }"
            >
              <span v-if="c.voteType === 'NOT_FAKE'">✅ NOT_FAKE</span>
              <span v-else-if="c.voteType === 'FAKE'">❌ FAKE</span>
              <span v-else>❔ UNCERTAIN</span>
            </td>

            <td class="px-4 py-2 border-b text-center text-gray-500">
              {{ c.newsId || "-" }}
            </td>

            <td class="px-4 py-2 border-b text-gray-500">
              {{ c.createdAt ? new Date(c.createdAt).toLocaleString() : "-" }}
            </td>

            <td class="px-4 py-2 border-b text-center">
              <img
                v-if="c.imageUrl"
                :src="c.imageUrl"
                class="h-16 w-auto object-cover rounded-lg mx-auto border"
              />
              <span v-else class="text-gray-400">-</span>
            </td>

            <td class="px-4 py-2 border-b text-center">
              <button
                @click="removeComment(c.id)"
                class="text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
