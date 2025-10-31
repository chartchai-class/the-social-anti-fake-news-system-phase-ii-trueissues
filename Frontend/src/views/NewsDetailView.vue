<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "@/stores/newsStore";
import { useVoteStore } from "@/stores/voteStore";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/supabase";

const route = useRoute();
const newsStore = useNewsStore();
const voteStore = useVoteStore();
const auth = useAuthStore();

const news = ref<any>(null);
const isLoading = ref(true);
const isSubmitting = ref(false);

const currentPage = ref(1);
const perPage = ref(5);

const newVoteType = ref<"FAKE" | "NOT_FAKE" | "">("");
const newComment = ref("");
const selectedFile = ref<File | null>(null);
const previewUrl = ref("");

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    news.value = await newsStore.fetchNewsById(id);
    await voteStore.fetchVotes(id, currentPage.value, perPage.value);
  } catch (err) {
    console.error("❌ Failed to load news detail:", err);
  } finally {
    isLoading.value = false;
  }
});

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function handleSubmitVote() {
  if (!auth.user) {
    alert("⚠️ Please login before voting or commenting.");
    return;
  }
  if (!newVoteType.value) {
    alert("Please select a vote type first.");
    return;
  }

  isSubmitting.value = true;
  let imageUrl: string | null = null;

  try {
    // 🔹 Upload image to Supabase bucket "ImageComments"
    if (selectedFile.value) {
      const fileName = `${Date.now()}_${selectedFile.value.name}`;
      const { data, error } = await supabase.storage
        .from("ImageComments")
        .upload(fileName, selectedFile.value);

      if (error) throw error;
      const { data: publicUrl } = supabase.storage
        .from("ImageComments")
        .getPublicUrl(fileName);
      imageUrl = publicUrl.publicUrl;
      console.log("✅ Uploaded image URL:", imageUrl);
    }

    const mappedType =
      newVoteType.value === "FAKE" ? "FAKE" : "NOT_FAKE";

    // ✅ เพิ่มโหวตใหม่
    await voteStore.addVote(news.value.id, {
      type: mappedType,
      comment: newComment.value,
      imageUrl: imageUrl,
      userId: auth.user.id,
    });

    // ✅ ดึงโหวตใหม่หลังเพิ่ม
    await voteStore.fetchVotes(news.value.id, currentPage.value, perPage.value);

    // ✅ 🧩 ดึงข่าวใหม่จาก backend เพื่ออัปเดต status
    const updatedNews = await newsStore.fetchNewsById(news.value.id);
    news.value = updatedNews; // อัปเดตตัวแปรที่ใช้แสดงผลใน view

    console.log("♻️ Refreshed news:", updatedNews.status);

    // ✅ Reset form
    newVoteType.value = "";
    newComment.value = "";
    selectedFile.value = null;
    previewUrl.value = "";

    alert("✅ Vote submitted successfully! News status updated.");
  } catch (err) {
    console.error("❌ Submit error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
}

async function changePage(page: number) {
  currentPage.value = page;
  await voteStore.fetchVotes(news.value.id, page, perPage.value);
}
</script>

<template>
  <!-- 🔹 Loading -->
  <section v-if="isLoading" class="text-center text-gray-400 py-20">
    <div class="animate-pulse text-lg">Loading...</div>
  </section>

  <!-- 🔹 ข่าว -->
  <section v-else-if="news" class="max-w-4xl mx-auto px-4 py-10 space-y-8">
    <!-- ภาพข่าว -->
    <img
      :src="news.imageUrl"
      alt="news image"
      class="rounded-xl w-full object-cover shadow-md"
    />

    <!-- หัวข้อข่าว -->
    <div class="space-y-3">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        {{ news.title }}
      </h1>

      <!-- สถานะข่าว -->
      <p
        class="inline-block text-sm font-semibold px-3 py-1 rounded-full"
        :class="{
          'bg-green-100 text-green-700': news.status === 'NOT_FAKE',
          'bg-red-100 text-red-700': news.status === 'FAKE',
          'bg-gray-200 text-gray-700': news.status === 'UNCERTAIN'
        }"
      >
        Status: {{ news.status }}
      </p>

      <p class="text-gray-600 leading-relaxed">
        {{ news.fullDetail || news.shortDetail }}
      </p>

      <p class="text-sm text-gray-400">
        Reporter: <span class="font-medium text-gray-600">{{ news.reporter }}</span>
      </p>
    </div>

    <hr class="border-gray-200 my-8" />

    <!-- 🔹 ส่วนความคิดเห็นและโหวต -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-800">Comments & Votes</h2>

      <!-- รายการโหวต -->
      <div v-if="voteStore.voteList.length" class="space-y-4">
        <div
          v-for="vote in voteStore.voteList"
          :key="vote.id"
          class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div class="flex justify-between items-center mb-2">
            <p class="text-xs text-gray-500">
              {{ new Date(vote.createdAt || '').toLocaleString() }}
            </p>
            <p
              class="font-semibold text-sm"
              :class="{
                'text-green-600': vote.type === 'NOT_FAKE',
                'text-red-500': vote.type === 'FAKE',
              }"
            >
              {{ vote.type === 'NOT_FAKE' ? '✅ Not Fake' : '❌ Fake' }}
            </p>
          </div>

          <p class="text-gray-700 text-sm leading-relaxed">
            {{ vote.comment }}
          </p>

          <img
            v-if="vote.imageUrl"
            :src="vote.imageUrl"
            class="rounded-lg max-h-56 mt-3 mx-auto object-cover shadow"
          />

          <p class="text-xs text-gray-500 mt-2 text-right">
            By: <span class="font-medium">{{ vote.userName || 'Anonymous' }}</span>
          </p>
        </div>
      </div>

      <p v-else class="text-gray-400 italic text-center py-6">
        No votes yet.
      </p>
    </section>

    <!-- 🔹 ฟอร์มเพิ่มโหวต -->
    <section
      class="mt-10 bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-5"
    >
      <h3 class="text-xl font-semibold text-gray-800">Add your vote</h3>

      <div class="flex gap-4">
        <button
          class="px-4 py-2 rounded-lg font-semibold border border-gray-300 transition"
          :class="{
            'bg-green-500 text-white border-green-500': newVoteType === 'NOT_FAKE',
            'hover:bg-green-100': newVoteType !== 'NOT_FAKE'
          }"
          @click="newVoteType = 'NOT_FAKE'"
        >
          ✅ Not Fake
        </button>
        <button
          class="px-4 py-2 rounded-lg font-semibold border border-gray-300 transition"
          :class="{
            'bg-red-500 text-white border-red-500': newVoteType === 'FAKE',
            'hover:bg-red-100': newVoteType !== 'FAKE'
          }"
          @click="newVoteType = 'FAKE'"
        >
          ❌ Fake
        </button>
      </div>

      <textarea
        v-model="newComment"
        rows="3"
        placeholder="Leave your comment here..."
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>

      <input
        type="file"
        accept="image/*"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 
               focus:outline-none focus:ring-1 focus:ring-blue-400"
        @change="handleFileUpload"
      />

      <div v-if="previewUrl" class="mt-3">
        <p class="text-xs text-gray-500 mb-1">Preview:</p>
        <img
          :src="previewUrl"
          class="rounded-lg max-h-48 border border-gray-200 shadow-sm"
        />
      </div>

      <div class="pt-2">
        <button
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          @click="handleSubmitVote"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </section>
  </section>

  <!-- 🔹 ไม่พบข่าว -->
  <section v-else class="text-center text-gray-400 py-20">
    News not found.
  </section>
</template>

