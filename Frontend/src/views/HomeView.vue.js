import { ref, watch, onMounted } from "vue";
import { useNewsStore } from "@/stores/newsStore";
import NewsCard from "@/components/NewsCard.vue";
import Pagination from "@/components/Pagination.vue";
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();
const store = useNewsStore();
// ตัวแปรควบคุม UI
const filterStatus = ref("all");
const q = ref("");
const perPage = ref(6);
const currentPage = ref(1);
const isLoading = ref(true);
// โหลดข้อมูลจาก backend
const loadNews = async () => {
    isLoading.value = true;
    await store.fetchNews(filterStatus.value, currentPage.value, perPage.value, q.value);
    isLoading.value = false;
};
// โหลดครั้งแรก
onMounted(async () => {
    await loadNews();
});
// เรียกใหม่ทุกครั้งที่ filter/search/page เปลี่ยน
watch([filterStatus, q, perPage, currentPage], async () => {
    await loadNews();
});
watch([filterStatus, perPage], () => { currentPage.value = 1; fetch(); });
watch([currentPage], fetch);
async function fetch() {
    isLoading.value = true;
    await store.fetchNews(filterStatus.value, currentPage.value, perPage.value, q.value);
    isLoading.value = false;
}
onMounted(fetch);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "max-w-7xl mx-auto px-4 py-8 space-y-8" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-3 flex-wrap" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.filterStatus),
    ...{ class: "\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e" },
});
// @ts-ignore
[filterStatus,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "all",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "FAKE",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "NOT_FAKE",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "UNCERTAIN",
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.currentPage = 1;
            // @ts-ignore
            [currentPage,];
        } },
    value: (__VLS_ctx.perPage),
    ...{ class: "\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e" },
});
// @ts-ignore
[perPage,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: (3),
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: (6),
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: (9),
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onKeyup: (...[$event]) => {
            __VLS_ctx.currentPage = 1;
            __VLS_ctx.fetch();
            // @ts-ignore
            [currentPage, fetch,];
        } },
    placeholder: "🔍 Search by title, detail, or reporter...",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0073\u006d\u003a\u0077\u002d\u0038\u0030\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e" },
});
(__VLS_ctx.q);
// @ts-ignore
[q,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end" },
});
if (__VLS_ctx.auth.user && ['MEMBER', 'ADMIN'].includes(__VLS_ctx.auth.user.role)) {
    // @ts-ignore
    [auth, auth,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.auth.user && ['MEMBER', 'ADMIN'].includes(__VLS_ctx.auth.user.role)))
                    return;
                __VLS_ctx.$router.push('/news/add');
                // @ts-ignore
                [$router,];
            } },
        ...{ class: "\u0070\u0078\u002d\u0035\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0036\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0066\u006f\u006e\u0074\u002d\u006d\u0065\u0064\u0069\u0075\u006d\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0037\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-400 italic" },
    });
}
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center text-gray-400 py-20" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "animate-pulse" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    if (__VLS_ctx.store.newsList.length === 0) {
        // @ts-ignore
        [store,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center text-gray-400 py-20" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" },
        });
        for (const [n] of __VLS_getVForSourceType((__VLS_ctx.store.newsList))) {
            // @ts-ignore
            [store,];
            /** @type {[typeof NewsCard, ]} */ ;
            // @ts-ignore
            const __VLS_0 = __VLS_asFunctionalComponent(NewsCard, new NewsCard({
                key: (n.id),
                news: (n),
            }));
            const __VLS_1 = __VLS_0({
                key: (n.id),
                news: (n),
            }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        }
    }
    if (__VLS_ctx.store.totalNews && __VLS_ctx.store.totalNews > __VLS_ctx.perPage) {
        // @ts-ignore
        [perPage, store, store,];
        /** @type {[typeof Pagination, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(Pagination, new Pagination({
            ...{ 'onUpdate:currentPage': {} },
            currentPage: (__VLS_ctx.currentPage),
            totalPages: (Math.ceil(__VLS_ctx.store.totalNews / __VLS_ctx.perPage)),
        }));
        const __VLS_5 = __VLS_4({
            ...{ 'onUpdate:currentPage': {} },
            currentPage: (__VLS_ctx.currentPage),
            totalPages: (Math.ceil(__VLS_ctx.store.totalNews / __VLS_ctx.perPage)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
        let __VLS_7;
        let __VLS_8;
        const __VLS_9 = ({ 'update:currentPage': {} },
            { 'onUpdate:currentPage': ((p) => (__VLS_ctx.currentPage = p)) });
        // @ts-ignore
        [currentPage, currentPage, perPage, store,];
        var __VLS_6;
    }
}
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NewsCard: NewsCard,
            Pagination: Pagination,
            auth: auth,
            store: store,
            filterStatus: filterStatus,
            q: q,
            perPage: perPage,
            currentPage: currentPage,
            isLoading: isLoading,
            fetch: fetch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
