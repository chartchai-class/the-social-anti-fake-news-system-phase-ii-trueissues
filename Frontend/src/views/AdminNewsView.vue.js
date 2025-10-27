import { ref, onMounted } from "vue";
import { useNewsStore } from "@/stores/newsStore";
import axios from "axios";
import { RouterLink } from "vue-router";
const store = useNewsStore();
const isLoading = ref(true);
const isReady = ref(false);
const hasError = ref(false);
async function fetchAllNews() {
    try {
        isLoading.value = true;
        await store.fetchNews("all", 1, 50, "");
        isReady.value = true;
    }
    catch (err) {
        console.error("❌ Failed to fetch news:", err);
        hasError.value = true;
    }
    finally {
        isLoading.value = false;
    }
}
onMounted(fetchAllNews);
async function deleteNews(id) {
    if (!confirm("Are you sure you want to remove this news?"))
        return;
    try {
        await axios.delete(`http://localhost:8080/api/admin/news/${id}`);
        await fetchAllNews();
    }
    catch (err) {
        console.error("❌ Failed to delete news:", err);
    }
}
async function restoreNews(id) {
    if (!confirm("Restore this news?"))
        return;
    try {
        await axios.patch(`http://localhost:8080/api/admin/news/${id}/restore`);
        await fetchAllNews();
    }
    catch (err) {
        console.error("❌ Failed to restore news:", err);
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "max-w-6xl mx-auto py-10 px-4" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2" },
});
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center text-gray-400 py-12" },
    });
}
else if (__VLS_ctx.hasError) {
    // @ts-ignore
    [hasError,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center text-red-500 py-12" },
    });
}
else if (__VLS_ctx.isReady && (!__VLS_ctx.store.newsList || __VLS_ctx.store.newsList.length === 0)) {
    // @ts-ignore
    [isReady, store, store,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center text-gray-500 py-12 italic" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200" },
    });
    __VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
        ...{ class: "min-w-full text-sm text-left border-collapse" },
    });
    __VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({
        ...{ class: "bg-gray-50 text-gray-700 uppercase text-xs" },
    });
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 border-b" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 border-b" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 border-b" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 border-b text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 border-b text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [n] of __VLS_getVForSourceType((__VLS_ctx.store.newsList || []))) {
        // @ts-ignore
        [store,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (n.id),
            ...{ class: "hover:bg-gray-50 transition" },
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-600" },
        });
        (n.id);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b font-medium text-gray-800" },
        });
        (n.title);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-500" },
        });
        (n.reporter);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center font-semibold" },
            ...{ class: ({
                    'text-green-600': n.status === 'NOT_FAKE',
                    'text-red-500': n.status === 'FAKE',
                    'text-gray-500': n.status === 'UNCERTAIN',
                }) },
        });
        (n.removed ? "REMOVED" : n.status);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center" },
        });
        const __VLS_0 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            to: (`/news/${n.id}`),
            ...{ class: "text-blue-600 hover:underline font-medium mr-3" },
        }));
        const __VLS_2 = __VLS_1({
            to: (`/news/${n.id}`),
            ...{ class: "text-blue-600 hover:underline font-medium mr-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_4 } = __VLS_3.slots;
        var __VLS_3;
        if (!n.removed) {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.isLoading))
                            return;
                        if (!!(__VLS_ctx.hasError))
                            return;
                        if (!!(__VLS_ctx.isReady && (!__VLS_ctx.store.newsList || __VLS_ctx.store.newsList.length === 0)))
                            return;
                        if (!(!n.removed))
                            return;
                        __VLS_ctx.deleteNews(n.id);
                        // @ts-ignore
                        [deleteNews,];
                    } },
                ...{ class: "text-red-500 hover:text-red-600 font-medium" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.isLoading))
                            return;
                        if (!!(__VLS_ctx.hasError))
                            return;
                        if (!!(__VLS_ctx.isReady && (!__VLS_ctx.store.newsList || __VLS_ctx.store.newsList.length === 0)))
                            return;
                        if (!!(!n.removed))
                            return;
                        __VLS_ctx.restoreNews(n.id);
                        // @ts-ignore
                        [restoreNews,];
                    } },
                ...{ class: "text-green-600 hover:text-green-700 font-medium" },
            });
        }
    }
}
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['border-collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            store: store,
            isLoading: isLoading,
            isReady: isReady,
            hasError: hasError,
            deleteNews: deleteNews,
            restoreNews: restoreNews,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
