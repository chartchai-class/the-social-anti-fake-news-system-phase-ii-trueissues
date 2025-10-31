<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { UserCog, ArrowUp, ArrowDown } from "lucide-vue-next";

interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER" | "READER";
}

const users = ref<User[]>([]);
const loading = ref(false);
const message = ref("");

async function fetchUsers() {
  loading.value = true;
  try {
    const res = await axios.get("http://localhost:8080/api/admin/users");
    users.value = res.data;
  } catch (err) {
    message.value = "❌ Failed to load users";
  } finally {
    loading.value = false;
  }
}

async function changeRole(id: number, role: string) {
  try {
    await axios.put(`http://localhost:8080/api/admin/users/${id}/role?role=${role}`);
    message.value = `✅ User #${id} is now ${role}`;
    await fetchUsers();
    setTimeout(() => (message.value = ""), 2500);
  } catch (err) {
    message.value = "❌ Failed to change role";
  }
}

onMounted(fetchUsers);
</script>

<template>
  <section class="max-w-5xl mx-auto py-10 px-6">
 
    <h1 class="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
      <UserCog class="w-7 h-7 text-blue-500" />
      Manage Users
    </h1>

    
    <transition name="fade">
      <p v-if="message" class="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
        {{ message }}
      </p>
    </transition>

    
    <div v-if="loading" class="text-gray-400 text-center py-10 text-sm">
      Loading users...
    </div>

  
    <div
      v-else
      class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200"
    >
      <table class="min-w-full border-collapse text-sm text-left">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3 border-b text-center">ID</th>
            <th class="px-4 py-3 border-b">Name</th>
            <th class="px-4 py-3 border-b">Email</th>
            <th class="px-4 py-3 border-b text-center">Role</th>
            <th class="px-4 py-3 border-b text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="u in users"
            :key="u.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-b text-center text-gray-600">
              {{ u.id }}
            </td>
            <td class="px-4 py-2 border-b font-medium text-gray-800">
              {{ u.name }}
            </td>
            <td class="px-4 py-2 border-b text-gray-600">
              {{ u.email }}
            </td>

          
            <td class="px-4 py-2 border-b text-center">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="{
                  'bg-blue-100 text-blue-700': u.role === 'ADMIN',
                  'bg-green-100 text-green-700': u.role === 'MEMBER',
                  'bg-gray-100 text-gray-700': u.role === 'READER',
                }"
              >
                {{ u.role }}
              </span>
            </td>

          
            <td class="px-4 py-2 border-b text-center">
              <div class="flex items-center justify-center gap-2">
               
                <button
                  v-if="u.role === 'READER'"
                  @click="changeRole(u.id, 'MEMBER')"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium transition"
                >
                  <ArrowUp class="w-3 h-3" /> Upgrade
                </button>

               
                <button
                  v-else-if="u.role === 'MEMBER'"
                  @click="changeRole(u.id, 'READER')"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium transition"
                >
                  <ArrowDown class="w-3 h-3" /> Downgrade
                </button>

               
                <span
                  v-else
                  class="text-gray-400 text-xs italic"
                >No actions</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
