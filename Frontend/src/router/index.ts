import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NewsDetailView from "@/views/NewsDetailView.vue";
import VoteView from "@/views/VoteView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AdminNewsView from "@/views/AdminNewsView.vue";
import AdminUsersView from "@/views/AdminUsersView.vue";
import AdminCommentsView from "@/views/AdminCommentsView.vue";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/news/:id", name: "newsDetail", component: NewsDetailView },
  { path: "/vote/:id", name: "vote", component: VoteView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/admin/news", name: "adminNews", component: AdminNewsView },
  { path: "/admin/users", name: "adminUsers", component: AdminUsersView },
  { path: "/admin/comments", name: "adminComments", component: AdminCommentsView },
  {
    path: "/news/add",
    name: "newsAdd",
    component: () => import("@/views/AddNewsView.vue"), 
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});


router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  
  if (to.path.startsWith("/admin")) {
    if (!auth.user) {
      alert("Please login first.");
      return next("/login");
    }
    if (auth.user.role?.toLowerCase() !== "admin") {
      alert("You are not authorized to access this page.");
      return next("/");
    }
  }


if (to.path === "/news/add") {
  if (!auth.user || !["MEMBER", "ADMIN"].includes(auth.user.role)) {
    alert("Only members or admins can post news.");
    return next("/");
  }
}


  next();
});

export default router;
