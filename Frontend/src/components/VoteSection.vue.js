import { onMounted } from "vue";
import { useVoteStore } from "@/stores/voteStore";
import { useAuthStore } from "@/stores/authStore";
const props = defineProps();
const voteStore = useVoteStore();
const auth = useAuthStore();
onMounted(() => {
    voteStore.fetchByNews(props.newsId);
});
async function handleVote(type) {
    if (!auth.user) {
        alert("Please login to vote.");
        return;
    }
    await voteStore.vote(props.newsId, type);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "mt-8 border-t pt-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-lg font-semibold mb-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex gap-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleVote('FAKE');
            // @ts-ignore
            [handleVote,];
        } },
    ...{ class: "px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-semibold" },
});
(__VLS_ctx.voteStore.fakeCount);
// @ts-ignore
[voteStore,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleVote('NOT_FAKE');
            // @ts-ignore
            [handleVote,];
        } },
    ...{ class: "px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 font-semibold" },
});
(__VLS_ctx.voteStore.notFakeCount);
// @ts-ignore
[voteStore,];
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-green-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            voteStore: voteStore,
            handleVote: handleVote,
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
