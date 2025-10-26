<!-- src/components/VoteSection.vue -->
<script setup lang="ts">
import { onMounted } from "vue";
import { useVoteStore } from "@/stores/voteStore";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps<{ newsId: number }>();
const voteStore = useVoteStore();
const auth = useAuthStore();

onMounted(() => {
  voteStore.fetchByNews(props.newsId);
});

async function handleVote(type: "FAKE" | "NOT_FAKE") {
  if (!auth.user) {
    alert("Please login to vote.");
    return;
  }
  await voteStore.vote(props.newsId, type);
}
</script>

<template>
  <section class="mt-8 border-t pt-6">
    <h2 class="text-lg font-semibold mb-3">🗳 Vote</h2>

    <div class="flex gap-4">
      <button
        @click="handleVote('FAKE')"
        class="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-semibold"
      >
        🚫 Fake ({{ voteStore.fakeCount }})
      </button>
      <button
        @click="handleVote('NOT_FAKE')"
        class="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 font-semibold"
      >
        ✅ Not Fake ({{ voteStore.notFakeCount }})
      </button>
    </div>
  </section>
</template>
