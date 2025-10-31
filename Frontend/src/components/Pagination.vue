<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update:currentPage", value: number): void;
}>();

const pages = computed(() => {
  const arr = [];
  for (let i = 1; i <= props.totalPages; i++) arr.push(i);
  return arr;
});

function go(p: number) {
  if (p < 1 || p > props.totalPages) return;
  emit("update:currentPage", p);
}
</script>

<template>
  <nav v-if="totalPages > 1" class="text-center mt-6">
    <div
      class="inline-flex items-center gap-1 rounded-full border bg-white p-1 shadow-sm"
    >
      <button
        class="px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40"
        :disabled="currentPage === 1"
        @click="go(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="p in pages"
        :key="p"
        class="px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9"
        :class="p === currentPage ? 'bg-black text-white hover:bg-black' : ''"
        @click="go(p)"
      >
        {{ p }}
      </button>

      <button
        class="px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40"
        :disabled="currentPage === totalPages"
        @click="go(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </nav>
</template>
