<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/supabase";
import { Newspaper, Upload, CheckCircle } from "lucide-vue-next";

const auth = useAuthStore();
const title = ref("");
const detail = ref("");
const status = ref("FAKE");
const image = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const message = ref("");
const loading = ref(false);
const previewData = ref<any | null>(null); 

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    image.value = target.files[0];
    imagePreview.value = URL.createObjectURL(image.value);
  } else {
    image.value = null;
    imagePreview.value = null;
  }
}

async function submitNews() {
  if (!title.value || !detail.value) {
    message.value = "⚠️ Please fill all required fields.";
    return;
  }

  loading.value = true;
  try {
    let imageUrl = "";

    if (image.value) {
      const fileName = `${Date.now()}_${image.value.name}`;
      const { error } = await supabase.storage
        .from("ImageNews")
        .upload(fileName, image.value, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;
      const { data: publicData } = supabase.storage
        .from("ImageNews")
        .getPublicUrl(fileName);
      imageUrl = publicData.publicUrl;
    }

    const payload = {
      title: title.value,
      shortDetail: detail.value,
      fullDetail: detail.value,
      status: status.value,
      imageUrl: imageUrl,
      userId: auth.user.id,
    };

    const res = await axios.post("http://localhost:8080/api/news", payload, {
      headers: { "Content-Type": "application/json" },
    });

  
    previewData.value = res.data;
    message.value = "✅ News submitted successfully!";
    title.value = "";
    detail.value = "";
    image.value = null;
    imagePreview.value = null;
  } catch (err) {
    console.error(err);
    message.value = "❌ Failed to submit news.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="min-h-[85vh] flex flex-col items-center bg-gray-50 py-10 px-4">
 
    <div
      class="bg-white shadow-lg rounded-2xl w-full max-w-lg px-8 py-8 border border-gray-200"
    >
      <div class="flex items-center justify-center mb-6 gap-2">
        <Newspaper class="w-6 h-6 text-blue-600" />
        <h1 class="text-2xl font-bold text-gray-800">Add News</h1>
      </div>

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Title</label>
          <input
            v-model="title"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter news title"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Detail</label>
          <textarea
            v-model="detail"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            placeholder="Enter detailed description"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Status</label>
          <select
            v-model="status"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="FAKE">Fake</option>
            <option value="NOT_FAKE">Not Fake</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700 flex items-center gap-1">
            <Upload class="w-4 h-4 text-gray-500" /> Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
          <div v-if="imagePreview" class="mt-3">
            <img
              :src="imagePreview"
              alt="Preview"
              class="rounded-lg border w-full max-h-48 object-cover"
            />
          </div>
        </div>

        <div class="text-center mt-6">
          <button
            @click="submitNews"
            :disabled="loading"
            class="w-full py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition"
          >
            {{ loading ? "Submitting..." : "Submit" }}
          </button>
        </div>

        <p
          v-if="message"
          class="text-center text-sm mt-3"
          :class="message.includes('✅') ? 'text-green-600' : 'text-red-500'"
        >
          {{ message }}
        </p>
      </div>
    </div>


    <transition name="fade">
      <div
        v-if="previewData"
        class="mt-10 bg-white border border-gray-200 shadow-md rounded-xl w-full max-w-lg p-5"
      >
        <div class="flex items-center gap-2 mb-3">
          <CheckCircle class="text-green-500 w-5 h-5" />
          <h2 class="text-lg font-bold text-gray-800">Preview Created News</h2>
        </div>

        <img
          v-if="previewData.imageUrl"
          :src="previewData.imageUrl"
          class="rounded-lg w-full h-48 object-cover border mb-4"
        />

        <h3 class="font-bold text-xl text-gray-900 mb-1">{{ previewData.title }}</h3>
        <p class="text-gray-700 mb-3">{{ previewData.shortDetail }}</p>

        <span
          class="px-3 py-1 rounded-full text-xs font-semibold"
          :class="{
            'bg-red-100 text-red-700': previewData.status === 'FAKE',
            'bg-green-100 text-green-700': previewData.status === 'NOT_FAKE',
          }"
        >
          {{ previewData.status }}
        </span>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
