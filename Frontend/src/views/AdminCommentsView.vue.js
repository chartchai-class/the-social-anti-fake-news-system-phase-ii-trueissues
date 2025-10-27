import { ref, onMounted } from "vue";
import axios from "axios";
const comments = ref([]);
const isLoading = ref(true);
const isReady = ref(false);
const hasError = ref(false);
async function loadComments() {
    try {
        isLoading.value = true;
        const res = await axios.get("http://localhost:8080/api/admin/vote-comments");
        comments.value = res.data || [];
        isReady.value = true;
        console.log("✅ Comments with votes fetched:", comments.value);
    }
    catch (err) {
        console.error("❌ Failed to fetch comments:", err);
        hasError.value = true;
    }
    finally {
        isLoading.value = false;
    }
}
async function removeComment(id) {
    if (!confirm("🗑️ Delete this comment and its vote?"))
        return;
    try {
        await axios.delete(`http://localhost:8080/api/admin/votes/${id}`);
        comments.value = comments.value.filter((c) => c.id !== id);
        console.log("🗑️ Deleted comment/vote:", id);
    }
    catch (err) {
        console.error("❌ Failed to delete comment/vote:", err);
        alert("Failed to delete comment. Please try again.");
    }
}
onMounted(loadComments);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "max-w-7xl mx-auto py-10 px-4" },
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
else if (__VLS_ctx.isReady && (!__VLS_ctx.comments || __VLS_ctx.comments.length === 0)) {
    // @ts-ignore
    [isReady, comments, comments,];
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
        ...{ class: "px-4 py-3 border-b text-center" },
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
    for (const [c] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
        // @ts-ignore
        [comments,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (c.id),
            ...{ class: "hover:bg-gray-50 transition" },
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center text-gray-600" },
        });
        (c.id);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-800" },
        });
        (c.userName || "Anonymous");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-600" },
        });
        (c.content || "-");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center font-semibold" },
            ...{ class: ({
                    'text-green-600': c.voteType === 'NOT_FAKE',
                    'text-red-500': c.voteType === 'FAKE',
                    'text-gray-500': !c.voteType || c.voteType === 'UNCERTAIN',
                }) },
        });
        if (c.voteType === 'NOT_FAKE') {
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        }
        else if (c.voteType === 'FAKE') {
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        }
        else {
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        }
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center text-gray-500" },
        });
        (c.newsId || "-");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-500" },
        });
        (c.createdAt ? new Date(c.createdAt).toLocaleString() : "-");
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center" },
        });
        if (c.imageUrl) {
            __VLS_asFunctionalElement(__VLS_elements.img)({
                src: (c.imageUrl),
                ...{ class: "h-16 w-auto object-cover rounded-lg mx-auto border" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-gray-400" },
            });
        }
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLoading))
                        return;
                    if (!!(__VLS_ctx.hasError))
                        return;
                    if (!!(__VLS_ctx.isReady && (!__VLS_ctx.comments || __VLS_ctx.comments.length === 0)))
                        return;
                    __VLS_ctx.removeComment(c.id);
                    // @ts-ignore
                    [removeComment,];
                } },
            ...{ class: "text-red-500 hover:text-red-600 font-medium" },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            comments: comments,
            isLoading: isLoading,
            isReady: isReady,
            hasError: hasError,
            removeComment: removeComment,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
