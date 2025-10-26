<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const auth = useAuthStore();
const showAdminMenu = ref(false); // ✅ สร้าง state สำหรับเปิด/ปิด dropdown

function toggleMenu() {
  showAdminMenu.value = !showAdminMenu.value;
}

// ✅ คลิกที่อื่น → ปิดเมนู
function handleClickOutside(e: MouseEvent) {
  const menu = document.getElementById("admin-dropdown");
  if (menu && !menu.contains(e.target as Node)) {
    showAdminMenu.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  auth.initialize?.(); // ถ้ามี initialize() ใน authStore
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-zinc-50 text-zinc-900">
   
    <header class="sticky top-0 z-30 border-b bg-white/80 backdrop-blur shadow-sm">
      <div class="container-app h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex flex-col leading-none">
          <span class="text-lg font-semibold tracking-tight">TrustIssues</span>
          <span class="brand-sub">Social Anti-Fake News</span>
        </RouterLink>

        <nav class="flex items-center gap-1">
          <RouterLink
            to="/"
            class="rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100"
            exact-active-class="bg-zinc-900 text-white"
          >
            Home
          </RouterLink>

          
          <template v-if="!auth.user">
            <RouterLink
              to="/login"
              class="rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100"
              exact-active-class="bg-zinc-900 text-white"
            >
              Login
            </RouterLink>

            <RouterLink
              to="/register"
              class="rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100"
              exact-active-class="bg-zinc-900 text-white"
            >
              Register
            </RouterLink>
          </template>

         
          <template v-else>
            
            <div id="admin-dropdown" class="relative">
              <button
                v-if="auth.user.role?.toLowerCase() === 'admin'"
                @click.stop="toggleMenu"
                class="rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100"
              >
                Admin Panel ⌄
              </button>

             
              <div
                v-show="showAdminMenu"
                class="absolute right-0 mt-1 flex flex-col bg-white border shadow-md rounded-lg overflow-hidden w-44 z-50"
              >
                <RouterLink
                  to="/admin/news"
                  class="px-3 py-2 text-sm hover:bg-zinc-100 text-left"
                  @click="showAdminMenu = false"
                >
                  📰 Manage News
                </RouterLink>

                <RouterLink
                  to="/admin/comments"
                  class="px-3 py-2 text-sm hover:bg-zinc-100 text-left"
                  @click="showAdminMenu = false"
                >
                  💬 Manage Comments & Votes
                </RouterLink>

                <RouterLink
                  to="/admin/users"
                  class="px-3 py-2 text-sm hover:bg-zinc-100 text-left"
                  @click="showAdminMenu = false"
                >
                  👥 Manage Users
                </RouterLink>
              </div>
            </div>

         
            <div class="flex items-center gap-2 ml-2">
              <span class="text-sm text-zinc-700">
                👋 {{ auth.user?.name || "User" }}
              </span>

              <button
                @click="auth.logout()"
                class="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          </template>
        </nav>
      </div>
    </header>

    <main class="container-app flex-1 py-8">
      <RouterView />
    </main>

  
    <footer class="border-t bg-white/70">
      <div
        class="container-app py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-sm text-zinc-500">
          © {{ new Date().getFullYear() }} TrustIssues
        </p>

        <div class="flex items-center gap-4 text-sm">
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#"
            >Terms</a
          >
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#"
            >Privacy</a
          >
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#"
            >Contact</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>
