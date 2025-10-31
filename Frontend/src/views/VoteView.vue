<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useNewsStore } from "@/stores/newsStore";
import * as yup from "yup";

const route = useRoute();
const router = useRouter();
const store = useNewsStore();
const newsId = Number(route.params.id);

const voteType = ref<"fake" | "not-fake">("fake");
const comment = ref("");
const imageUrl = ref("");
const errors = ref<{ comment?: string; imageUrl?: string }>({});


const schema = yup.object({
  type: yup.mixed<"fake" | "not-fake">().required(),
  comment: yup.string().required("Please enter your comment"),
  imageUrl: yup.string().url("Invalid image URL").optional(),
});

async function submitVote() {
  try {
    errors.value = {};
    await schema.validate(
      {
        type: voteType.value,
        comment: comment.value,
        imageUrl: imageUrl.value,
      },
      { abortEarly: false }
    );

    store.addVote(newsId, {
      type: voteType.value,
      comment: comment.value.trim(),
      imageUrl: imageUrl.value.trim() || undefined,
    });

    router.push(`/news/${newsId}`);
  } catch (e: any) {
    e.inner?.forEach((err: any) => (errors.value[err.path] = err.message));
  }
}
</script>

<template>
  <section class="space-y-6 max-w-xl mx-auto">
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
    >
      ← Back to home
    </RouterLink>

    <div class="card space-y-4">
      <h1 class="text-2xl font-bold tracking-tight">Vote on News</h1>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Your vote</span>
        <select v-model="voteType" class="select">
          <option value="fake">Fake</option>
          <option value="not-fake">Not Fake</option>
        </select>
      </label>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Comment</span>
        <textarea
          v-model="comment"
          rows="4"
          class="textarea"
          placeholder="Why do you think so?"
        ></textarea>
        <p v-if="errors.comment" class="text-sm text-red-600">
          {{ errors.comment }}
        </p>
      </label>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Image URL (optional)</span>
        <input v-model="imageUrl" class="input" placeholder="https://..." />
        <p v-if="errors.imageUrl" class="text-sm text-red-600">
          {{ errors.imageUrl }}
        </p>
      </label>

      <div class="pt-1">
        <button @click="submitVote" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </section>
</template>
