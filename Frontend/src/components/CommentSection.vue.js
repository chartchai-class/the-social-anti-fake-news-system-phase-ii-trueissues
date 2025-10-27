import { ref, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useAuthStore } from "@/stores/authStore";
const props = defineProps();
const store = useCommentStore();
const auth = useAuthStore();
const newComment = ref("");
onMounted(() => {
    store.fetchByNews(props.newsId);
});
async function submitComment() {
    if (!newComment.value.trim())
        return;
    await store.create(props.newsId, newComment.value, auth.user?.name || "Guest");
    newComment.value = "";
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "mt-10 border-t pt-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-lg font-semibold mb-3" },
});
(__VLS_ctx.store.comments.length);
// @ts-ignore
[store,];
if (__VLS_ctx.auth.user) {
    // @ts-ignore
    [auth,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.newComment),
        placeholder: "Write a comment...",
        ...{ class: "w-full border rounded-lg p-2 text-sm resize-none" },
    });
    // @ts-ignore
    [newComment,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.submitComment) },
        ...{ class: "mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700" },
    });
    // @ts-ignore
    [submitComment,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-500 text-sm" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
    ...{ class: "space-y-3 mt-4" },
});
for (const [c] of __VLS_getVForSourceType((__VLS_ctx.store.comments))) {
    // @ts-ignore
    [store,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        key: (c.id),
        ...{ class: "border rounded-lg p-3 bg-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm" },
    });
    (c.content);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-400 mt-1" },
    });
    (c.author);
}
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            auth: auth,
            newComment: newComment,
            submitComment: submitComment,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
