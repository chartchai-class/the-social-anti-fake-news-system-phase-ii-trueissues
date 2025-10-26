<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useNewsStore } from "@/stores/newsStore";
import NewsCard from "@/components/NewsCard.vue";
import Pagination from "@/components/Pagination.vue";
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();
const store = useNewsStore();

// ตัวแปรควบคุม UI
const filterStatus = ref("all");
const q = ref("");
const perPage = ref(6);
const currentPage = ref(1);
const isLoading = ref(true);

// โหลดข้อมูลจาก backend
const loadNews = async () => {
  isLoading.value = true;
  await store.fetchNews(filterStatus.value, currentPage.value, perPage.value, q.value);
  isLoading.value = false;
};

// โหลดครั้งแรก
onMounted(async () => {
  await loadNews();
});

// เรียกใหม่ทุกครั้งที่ filter/search/page เปลี่ยน
watch([filterStatus, q, perPage, currentPage], async () => {
  await loadNews();
});

watch([filterStatus, perPage], () => { currentPage.value = 1; fetch(); });
watch([currentPage], fetch);

async function fetch() {
  isLoading.value = true;
  await store.fetchNews(filterStatus.value, currentPage.value, perPage.value, q.value);
  isLoading.value = false;
}
onMounted(fetch);
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8 space-y-8">
    <!-- 🔹 ส่วนควบคุม -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-3 flex-wrap">
        <select
          v-model="filterStatus"
          class="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="all">All</option>
          <option value="FAKE">Fake</option>
          <option value="NOT_FAKE">Not Fake</option>
          <option value="UNCERTAIN">Uncertain</option>
        </select>

        <select
          v-model.number="perPage"
          class="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          @change="currentPage = 1"
        >
          <option :value="3">3 / page</option>
          <option :value="6">6 / page</option>
          <option :value="9">9 / page</option>
        </select>
      </div>

      <input
        v-model.trim="q"
        @keyup.enter="currentPage = 1; fetch()"
        placeholder="🔍 Search by title, detail, or reporter..."
        class="w-full sm:w-80 border border-gray-300 rounded-md px-3 py-2 text-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    <!-- 🔹 ปุ่ม Add News -->
    <div class="flex justify-end">
      <button
        v-if="auth.user && ['MEMBER', 'ADMIN'].includes(auth.user.role)"
        @click="$router.push('/news/add')"
        class="px-5 py-2 bg-blue-600 text-white font-medium rounded-md 
               hover:bg-blue-700 transition-all shadow-sm"
      >
        ➕ Add News
      </button>
      <p v-else class="text-sm text-gray-400 italic">
        Only members can post news — ask admin to upgrade your account.
      </p>
    </div>

    <!-- 🔹 Loading -->
    <div v-if="isLoading" class="text-center text-gray-400 py-20">
      <div class="animate-pulse">Loading news...</div>
    </div>

    <!-- 🔹 ข่าว -->
    <div v-else>
      <div v-if="store.newsList.length === 0" class="text-center text-gray-400 py-20">
        No news found.
      </div>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard v-for="n in store.newsList" :key="n.id" :news="n" />
      </div>

      <!-- 🔹 Pagination -->
      <Pagination
        v-if="store.totalNews && store.totalNews > perPage"
        :currentPage="currentPage"
        :totalPages="Math.ceil(store.totalNews / perPage)"
        @update:currentPage="(p) => (currentPage = p)"
      />
    </div>
  </section>
</template>
