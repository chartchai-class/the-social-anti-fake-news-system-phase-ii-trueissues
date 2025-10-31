<script setup lang="ts">
defineProps<{ news: any }>();
</script>

<template>
  <article
    class="relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300"
  >
    
    <div
      class="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-semibold rounded-full shadow-sm"
      :class="{
        'bg-red-100 text-red-700': news.status === 'FAKE',
        'bg-green-100 text-green-700': news.status === 'NOT_FAKE',
        'bg-gray-200 text-gray-700': news.status === 'UNCERTAIN',
      }"
    >
      {{ news.status === 'FAKE'
        ? '❌ Fake'
        : news.status === 'NOT_FAKE'
        ? '✅ Not Fake'
        : '⏳ Uncertain' }}
    </div>

    
    <img
      v-if="news.imageUrl"
      :src="news.imageUrl"
      alt="news image"
      class="w-full h-44 object-cover"
    />
    <div v-else class="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400">
      No image
    </div>

   
    <div class="p-4 space-y-2">
      <h2 class="font-bold text-lg text-gray-900 leading-tight line-clamp-2">
        {{ news.title }}
      </h2>

      <p class="text-gray-600 text-sm line-clamp-3">
        {{ news.shortDetail }}
      </p>

      <p class="text-xs text-gray-400">
        Reporter: <span class="font-medium text-gray-500">{{ news.reporter }}</span>
      </p>

      <p class="text-xs text-gray-400">
        Date&Time : <span class="font-medium text-gray-500">{{ news.reportedAt }}</span>
      </p>
      <router-link
        :to="`/news/${news.id}`"
        class="inline-block mt-2 text-sm text-blue-600 font-medium hover:underline"
      >
        Read more →
      </router-link>
    </div>
  </article>
</template>

<style scoped>

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
