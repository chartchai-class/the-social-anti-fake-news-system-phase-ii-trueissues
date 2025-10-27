import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const pages = computed(() => {
    const arr = [];
    for (let i = 1; i <= props.totalPages; i++)
        arr.push(i);
    return arr;
});
function go(p) {
    if (p < 1 || p > props.totalPages)
        return;
    emit("update:currentPage", p);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.totalPages > 1) {
    // @ts-ignore
    [totalPages,];
    __VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
        ...{ class: "text-center mt-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "inline-flex items-center gap-1 rounded-full border bg-white p-1 shadow-sm" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.totalPages > 1))
                    return;
                __VLS_ctx.go(__VLS_ctx.currentPage - 1);
                // @ts-ignore
                [go, currentPage,];
            } },
        ...{ class: "px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40" },
        disabled: (__VLS_ctx.currentPage === 1),
    });
    // @ts-ignore
    [currentPage,];
    for (const [p] of __VLS_getVForSourceType((__VLS_ctx.pages))) {
        // @ts-ignore
        [pages,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.totalPages > 1))
                        return;
                    __VLS_ctx.go(p);
                    // @ts-ignore
                    [go,];
                } },
            key: (p),
            ...{ class: "px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9" },
            ...{ class: (p === __VLS_ctx.currentPage ? 'bg-black text-white hover:bg-black' : '') },
        });
        // @ts-ignore
        [currentPage,];
        (p);
    }
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.totalPages > 1))
                    return;
                __VLS_ctx.go(__VLS_ctx.currentPage + 1);
                // @ts-ignore
                [go, currentPage,];
            } },
        ...{ class: "px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40" },
        disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages),
    });
    // @ts-ignore
    [totalPages, currentPage,];
}
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            pages: pages,
            go: go,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
