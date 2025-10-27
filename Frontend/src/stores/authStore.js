import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: (() => {
            const data = localStorage.getItem("user");
            try {
                return data ? JSON.parse(data) : null;
            }
            catch {
                return null;
            }
        })(),
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
        isAdmin: (state) => state.user?.role === "ADMIN",
    },
    actions: {
        async login(email, password) {
            try {
                const res = await axios.post("http://localhost:8080/api/auth/login", {
                    email,
                    password,
                });
                if (res.data.user) {
                    this.user = res.data.user;
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
                    }
                }
                else {
                    this.user = res.data;
                }
                localStorage.setItem("user", JSON.stringify(this.user));
                console.log("✅ Logged in as:", this.user);
                return true;
            }
            catch (err) {
                alert("❌ Invalid email or password");
                return false;
            }
        },
        async register(name, email, password, profileImageUrl) {
            try {
                await axios.post("http://localhost:8080/api/auth/register", {
                    name,
                    email,
                    passwordHash: password,
                    profileImageUrl,
                });
                alert("✅ Register successful! Please login.");
                return true;
            }
            catch (err) {
                alert("❌ Register failed (email may exist)");
                return false;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            console.log("👋 Logged out");
            router.push("/");
        },
        initialize() {
            const data = localStorage.getItem("user");
            if (data) {
                try {
                    this.user = JSON.parse(data);
                    const token = localStorage.getItem("token");
                    if (token) {
                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    }
                    console.log("🔁 Restored login session:", this.user);
                }
                catch {
                    this.user = null;
                }
            }
        },
    },
});
