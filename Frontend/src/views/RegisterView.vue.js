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
const file = ref(null);
const previewUrl = ref("");
const errors = ref([]);
const success = ref(false);
const isUploading = ref(false);
function handleFileChange(e) {
    const target = e.target;
    if (target.files && target.files[0]) {
        file.value = target.files[0];
        previewUrl.value = URL.createObjectURL(file.value);
    }
}
async function uploadProfileImage() {
    if (!file.value)
        return null;
    const fileName = `${Date.now()}_${file.value.name}`;
    const { data, error } = await supabase.storage.from("ImageRegister").upload(fileName, file.value);
    if (error)
        throw error;
    const { data: { publicUrl }, } = supabase.storage.from("ImageRegister").getPublicUrl(fileName);
    return publicUrl;
}
async function handleRegister() {
    errors.value = [];
    if (!name.value.trim())
        errors.value.push("Name is required.");
    if (!email.value.trim())
        errors.value.push("Email is required.");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
        errors.value.push("Invalid email format.");
    if (!password.value.trim())
        errors.value.push("Password is required.");
    else if (password.value.length < 6)
        errors.value.push("Password must be at least 6 characters.");
    if (confirm.value !== password.value)
        errors.value.push("Passwords do not match.");
    if (errors.value.length)
        return;
    isUploading.value = true;
    try {
        let imageUrl = null;
        if (file.value)
            imageUrl = await uploadProfileImage();
        const ok = await auth.register(name.value, email.value, password.value, imageUrl);
        if (ok) {
            success.value = true;
            setTimeout(() => router.push("/login"), 1200);
        }
        else {
            errors.value.push("Registration failed, please try again.");
        }
    }
    catch (err) {
        console.error(err);
        errors.value.push("Upload or register failed.");
    }
    finally {
        isUploading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "max-w-md mx-auto mt-20 bg-white border border-gray-200 rounded-2xl shadow-lg px-8 py-10 space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center space-y-1" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold text-gray-900" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm text-gray-500" },
});
if (__VLS_ctx.errors.length) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "list-disc pl-5 space-y-1" },
    });
    for (const [e, i] of __VLS_getVForSourceType((__VLS_ctx.errors))) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
            key: (i),
        });
        (e);
    }
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    value: (__VLS_ctx.name),
    type: "text",
    placeholder: "Your full name",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030" },
});
// @ts-ignore
[name,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "email",
    placeholder: "you@example.com",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030" },
});
(__VLS_ctx.email);
// @ts-ignore
[email,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-2 gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    placeholder: "••••••",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030" },
});
(__VLS_ctx.password);
// @ts-ignore
[password,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    placeholder: "Repeat password",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0035\u0030\u0030" },
});
(__VLS_ctx.confirm);
// @ts-ignore
[confirm,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-gray-700 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.handleFileChange) },
    type: "file",
    accept: "image/*",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0034\u0030\u0030" },
});
// @ts-ignore
[handleFileChange,];
if (__VLS_ctx.previewUrl) {
    // @ts-ignore
    [previewUrl,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-3 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.previewUrl),
        ...{ class: "w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm mx-auto" },
    });
    // @ts-ignore
    [previewUrl,];
}
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.handleRegister) },
    disabled: (__VLS_ctx.isUploading),
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u006d\u0074\u002d\u0032\u0020\u0062\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0036\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0067\u0072\u0065\u0065\u006e\u002d\u0037\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0066\u006f\u006e\u0074\u002d\u0073\u0065\u006d\u0069\u0062\u006f\u006c\u0064\u0020\u0070\u0079\u002d\u0032\u002e\u0035\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030\u0020\u0064\u0069\u0073\u0061\u0062\u006c\u0065\u0064\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0036\u0030\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d" },
});
// @ts-ignore
[handleRegister, isUploading,];
(__VLS_ctx.isUploading ? "Uploading..." : "Register");
// @ts-ignore
[isUploading,];
if (__VLS_ctx.success) {
    // @ts-ignore
    [success,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-green-600 text-center text-sm font-medium bg-green-50 border border-green-200 rounded-md py-2" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-center text-sm text-gray-500 mt-3" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/login",
    ...{ class: "text-green-600 font-medium hover:underline" },
}));
const __VLS_2 = __VLS_1({
    to: "/login",
    ...{ class: "text-green-600 font-medium hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-50']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['list-disc']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-50']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-green-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            name: name,
            email: email,
            password: password,
            confirm: confirm,
            previewUrl: previewUrl,
            errors: errors,
            success: success,
            isUploading: isUploading,
            handleFileChange: handleFileChange,
            handleRegister: handleRegister,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
