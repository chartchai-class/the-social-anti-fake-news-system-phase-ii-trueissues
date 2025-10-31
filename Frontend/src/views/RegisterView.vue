<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/supabase";

const router = useRouter();
const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const file = ref<File | null>(null);
const previewUrl = ref("");
const errors = ref<string[]>([]);
const success = ref(false);
const isUploading = ref(false);

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    previewUrl.value = URL.createObjectURL(file.value);
  }
}

async function uploadProfileImage() {
  if (!file.value) return null;
  const fileName = `${Date.now()}_${file.value.name}`;

  const { data, error } = await supabase.storage.from("ImageRegister").upload(fileName, file.value);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("ImageRegister").getPublicUrl(fileName);

  return publicUrl;
}

async function handleRegister() {
  errors.value = [];
  if (!name.value.trim()) errors.value.push("Name is required.");
  if (!email.value.trim()) errors.value.push("Email is required.");
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) errors.value.push("Invalid email format.");
  if (!password.value.trim()) errors.value.push("Password is required.");
  else if (password.value.length < 6) errors.value.push("Password must be at least 6 characters.");
  if (confirm.value !== password.value) errors.value.push("Passwords do not match.");
  if (errors.value.length) return;

  isUploading.value = true;
  try {
    let imageUrl = null;
    if (file.value) imageUrl = await uploadProfileImage();

    const ok = await auth.register(name.value, email.value, password.value, imageUrl);
    if (ok) {
      success.value = true;
      setTimeout(() => router.push("/login"), 1200);
    } else {
      errors.value.push("Registration failed, please try again.");
    }
  } catch (err) {
    console.error(err);
    errors.value.push("Upload or register failed.");
  } finally {
    isUploading.value = false;
  }
}
</script>

<template>
  <section
    class="max-w-md mx-auto mt-20 bg-white border border-gray-200 rounded-2xl shadow-lg px-8 py-10 space-y-6"
  >

    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
      <p class="text-sm text-gray-500">Join TrustIssues today and help verify the truth.</p>
    </div>

 
    <div
      v-if="errors.length"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
    >
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
      </ul>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Your full name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
          <input
            v-model="confirm"
            type="password"
            placeholder="Repeat password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

 
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Profile Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700
                 focus:outline-none focus:ring-1 focus:ring-green-400"
        />

        <div v-if="previewUrl" class="mt-3 text-center">
          <img
            :src="previewUrl"
            class="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm mx-auto"
          />
        </div>
      </div>
    </div>

    <button
      @click="handleRegister"
      :disabled="isUploading"
      class="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg 
             transition-all duration-300 disabled:opacity-60 shadow-sm"
    >
      {{ isUploading ? "Uploading..." : "Register" }}
    </button>

   
    <p
      v-if="success"
      class="text-green-600 text-center text-sm font-medium bg-green-50 border border-green-200 rounded-md py-2"
    >
      ✅ Registered successfully! Redirecting...
    </p>

  
    <p class="text-center text-sm text-gray-500 mt-3">
      Already have an account?
      <router-link to="/login" class="text-green-600 font-medium hover:underline">
        Login here
      </router-link>
    </p>
  </section>
</template>
