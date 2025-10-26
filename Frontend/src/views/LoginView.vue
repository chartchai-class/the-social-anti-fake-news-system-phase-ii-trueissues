<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const errors = ref<string[]>([]);
const loading = ref(false);

async function handleLogin() {
  errors.value = [];

  if (!email.value.trim()) errors.value.push("Email is required.");
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
    errors.value.push("Invalid email format.");

  if (!password.value.trim()) errors.value.push("Password is required.");
  if (errors.value.length) return;

  loading.value = true;
  const ok = await auth.login(email.value, password.value);
  loading.value = false;

  if (ok) router.push("/");
  else errors.value.push("Invalid email or password.");
}
</script>

<template>
  <section
    class="max-w-md mx-auto mt-20 bg-white border border-gray-200 rounded-2xl shadow-lg px-8 py-10 space-y-6"
  >
    <!-- 🔹 หัวข้อ -->
    <h1 class="text-3xl font-bold text-center text-gray-900 tracking-tight">
      Welcome Back 👋
    </h1>
    <p class="text-center text-gray-500 text-sm">
      Please sign in to continue to your account.
    </p>

    <!-- 🔹 แสดง Error -->
    <div
      v-if="errors.length"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
    >
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
      </ul>
    </div>

    <!-- 🔹 ช่องกรอกข้อมูล -->
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="example@email.com"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- 🔹 ปุ่ม Login -->
    <button
      @click="handleLogin"
      :disabled="loading"
      class="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg 
             transition-all duration-300 disabled:opacity-60 shadow-sm"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>

    <!-- 🔹 ลิงก์สมัครสมาชิก -->
    <p class="text-center text-sm text-gray-500 mt-4">
      Don’t have an account?
      <router-link
        to="/register"
        class="text-blue-600 font-medium hover:underline"
      >
        Register here
      </router-link>
    </p>
  </section>
</template>

