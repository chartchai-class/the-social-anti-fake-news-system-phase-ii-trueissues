<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNewsStore } from "@/stores/newsStore";
import axios from "axios";
import { RouterLink } from "vue-router";

const store = useNewsStore();
const isLoading = ref(true);
const isReady = ref(false);
const hasError = ref(false);

async function fetchAllNews() {
  try {
    isLoading.value = true;
    await store.fetchNews("all", 1, 50, "");
    isReady.value = true;
  } catch (err) {
    console.error("❌ Failed to fetch news:", err);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchAllNews);


async function deleteNews(id: number) {
  if (!confirm("Are you sure you want to remove this news?")) return;
  try {
    await axios.delete(`http://localhost:8080/api/admin/news/${id}`);
    await fetchAllNews();
  } catch (err) {
    console.error("❌ Failed to delete news:", err);
  }
}


async function restoreNews(id: number) {
  if (!confirm("Restore this news?")) return;
  try {
    await axios.patch(`http://localhost:8080/api/admin/news/${id}/restore`);
    await fetchAllNews();
  } catch (err) {
    console.error("❌ Failed to restore news:", err);
  }
}
</script>

<template>
  <section class="max-w-6xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      🛠 Admin - Manage News
    </h1>

  
    <div v-if="isLoading" class="text-center text-gray-400 py-12">
      Loading all news...
    </div>

   
    <div v-else-if="hasError" class="text-center text-red-500 py-12">
      ❌ Failed to load news. Please try again later.
    </div>

    
    <div
      v-else-if="isReady && (!store.newsList || store.newsList.length === 0)"
      class="text-center text-gray-500 py-12 italic"
    >
      No news found.
    </div>

   
    <div v-else class="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table class="min-w-full text-sm text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3 border-b">ID</th>
            <th class="px-4 py-3 border-b">Title</th>
            <th class="px-4 py-3 border-b">Reporter</th>
            <th class="px-4 py-3 border-b text-center">Status</th>
            <th class="px-4 py-3 border-b text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="n in store.newsList || []"
            :key="n.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-b text-gray-600">{{ n.id }}</td>
            <td class="px-4 py-2 border-b font-medium text-gray-800">
              {{ n.title }}
            </td>
            <td class="px-4 py-2 border-b text-gray-500">{{ n.reporter }}</td>

           
            <td
              class="px-4 py-2 border-b text-center font-semibold"
              :class="{
                'text-green-600': n.status === 'NOT_FAKE',
                'text-red-500': n.status === 'FAKE',
                'text-gray-500': n.status === 'UNCERTAIN',
              }"
            >
              {{ n.removed ? "REMOVED" : n.status }}
            </td>

        
            <td class="px-4 py-2 border-b text-center">
              <RouterLink
                :to="`/news/${n.id}`"
                class="text-blue-600 hover:underline font-medium mr-3"
              >
                View
              </RouterLink>

              <button
                v-if="!n.removed"
                class="text-red-500 hover:text-red-600 font-medium"
                @click="deleteNews(n.id)"
              >
                Remove
              </button>
              <button
                v-else
                class="text-green-600 hover:text-green-700 font-medium"
                @click="restoreNews(n.id)"
              >
                Restore
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
