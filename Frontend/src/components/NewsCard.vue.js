const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.article, __VLS_elements.article)({
    ...{ class: "relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "absolute top-0 right-0 px-3 py-1 m-2 text-xs font-semibold rounded-full shadow-sm" },
    ...{ class: ({
            'bg-red-100 text-red-700': __VLS_ctx.news.status === 'FAKE',
            'bg-green-100 text-green-700': __VLS_ctx.news.status === 'NOT_FAKE',
            'bg-gray-200 text-gray-700': __VLS_ctx.news.status === 'UNCERTAIN',
        }) },
});
// @ts-ignore
[news, news, news,];
(__VLS_ctx.news.status === 'FAKE'
    ? '❌ Fake'
    : __VLS_ctx.news.status === 'NOT_FAKE'
        ? '✅ Not Fake'
        : '⏳ Uncertain');
// @ts-ignore
[news, news,];
if (__VLS_ctx.news.imageUrl) {
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.news.imageUrl),
        alt: "news image",
        ...{ class: "w-full h-44 object-cover" },
    });
    // @ts-ignore
    [news,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-4 space-y-2" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "font-bold text-lg text-gray-900 leading-tight line-clamp-2" },
});
(__VLS_ctx.news.title);
// @ts-ignore
[news,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-gray-600 text-sm line-clamp-3" },
});
(__VLS_ctx.news.shortDetail);
// @ts-ignore
[news,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-xs text-gray-400" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium text-gray-500" },
});
(__VLS_ctx.news.reporter);
// @ts-ignore
[news,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-xs text-gray-400" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium text-gray-500" },
});
(__VLS_ctx.news.reportedAt);
// @ts-ignore
[news,];
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: (`/news/${__VLS_ctx.news.id}`),
    ...{ class: "inline-block mt-2 text-sm text-blue-600 font-medium hover:underline" },
}));
const __VLS_2 = __VLS_1({
    to: (`/news/${__VLS_ctx.news.id}`),
    ...{ class: "inline-block mt-2 text-sm text-blue-600 font-medium hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[news,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['m-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-44']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-44']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
