import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useNewsStore } from "@/stores/newsStore";
import * as yup from "yup";
const route = useRoute();
const router = useRouter();
const store = useNewsStore();
const newsId = Number(route.params.id);
const voteType = ref("fake");
const comment = ref("");
const imageUrl = ref("");
const errors = ref({});
const schema = yup.object({
    type: yup.mixed().required(),
    comment: yup.string().required("Please enter your comment"),
    imageUrl: yup.string().url("Invalid image URL").optional(),
});
async function submitVote() {
    try {
        errors.value = {};
        await schema.validate({
            type: voteType.value,
            comment: comment.value,
            imageUrl: imageUrl.value,
        }, { abortEarly: false });
        store.addVote(newsId, {
            type: voteType.value,
            comment: comment.value.trim(),
            imageUrl: imageUrl.value.trim() || undefined,
        });
        router.push(`/news/${newsId}`);
    }
    catch (e) {
        e.inner?.forEach((err) => (errors.value[err.path] = err.message));
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "space-y-6 max-w-xl mx-auto" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card space-y-4" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold tracking-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block space-y-1.5" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-sm text-zinc-600" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.voteType),
    ...{ class: "select" },
});
// @ts-ignore
[voteType,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "fake",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "not-fake",
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block space-y-1.5" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-sm text-zinc-600" },
});
__VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
    value: (__VLS_ctx.comment),
    rows: "4",
    ...{ class: "textarea" },
    placeholder: "Why do you think so?",
});
// @ts-ignore
[comment,];
if (__VLS_ctx.errors.comment) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-red-600" },
    });
    (__VLS_ctx.errors.comment);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block space-y-1.5" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-sm text-zinc-600" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "input" },
    placeholder: "https://...",
});
(__VLS_ctx.imageUrl);
// @ts-ignore
[imageUrl,];
if (__VLS_ctx.errors.imageUrl) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-red-600" },
    });
    (__VLS_ctx.errors.imageUrl);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "pt-1" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.submitVote) },
    ...{ class: "btn btn-primary" },
});
// @ts-ignore
[submitVote,];
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-emerald-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['select']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            voteType: voteType,
            comment: comment,
            imageUrl: imageUrl,
            errors: errors,
            submitVote: submitVote,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
