import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "@/stores/newsStore";
import { useVoteStore } from "@/stores/voteStore";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/supabase";
const route = useRoute();
const newsStore = useNewsStore();
const voteStore = useVoteStore();
const auth = useAuthStore();
const news = ref(null);
const isLoading = ref(true);
const isSubmitting = ref(false);
const currentPage = ref(1);
const perPage = ref(5);
const newVoteType = ref("");
const newComment = ref("");
const selectedFile = ref(null);
const previewUrl = ref("");
onMounted(async () => {
    try {
        const id = Number(route.params.id);
        news.value = await newsStore.fetchNewsById(id);
        await voteStore.fetchVotes(id, currentPage.value, perPage.value);
    }
    catch (err) {
        console.error("❌ Failed to load news detail:", err);
    }
    finally {
        isLoading.value = false;
    }
});
async function handleFileUpload(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
        selectedFile.value = file;
        previewUrl.value = URL.createObjectURL(file);
    }
}
async function handleSubmitVote() {
    if (!auth.user) {
        alert("⚠️ Please login before voting or commenting.");
        return;
    }
    if (!newVoteType.value) {
        alert("Please select a vote type first.");
        return;
    }
    isSubmitting.value = true;
    let imageUrl = null;
    try {
        // 🔹 Upload image to Supabase bucket "ImageComments"
        if (selectedFile.value) {
            const fileName = `${Date.now()}_${selectedFile.value.name}`;
            const { data, error } = await supabase.storage
                .from("ImageComments")
                .upload(fileName, selectedFile.value);
            if (error)
                throw error;
            const { data: publicUrl } = supabase.storage
                .from("ImageComments")
                .getPublicUrl(fileName);
            imageUrl = publicUrl.publicUrl;
            console.log("✅ Uploaded image URL:", imageUrl);
        }
        const mappedType = newVoteType.value === "FAKE" ? "FAKE" : "NOT_FAKE";
        // ✅ เพิ่มโหวตใหม่
        await voteStore.addVote(news.value.id, {
            type: mappedType,
            comment: newComment.value,
            imageUrl: imageUrl,
            userId: auth.user.id,
        });
        // ✅ ดึงโหวตใหม่หลังเพิ่ม
        await voteStore.fetchVotes(news.value.id, currentPage.value, perPage.value);
        // ✅ 🧩 ดึงข่าวใหม่จาก backend เพื่ออัปเดต status
        const updatedNews = await newsStore.fetchNewsById(news.value.id);
        news.value = updatedNews; // อัปเดตตัวแปรที่ใช้แสดงผลใน view
        console.log("♻️ Refreshed news:", updatedNews.status);
        // ✅ Reset form
        newVoteType.value = "";
        newComment.value = "";
        selectedFile.value = null;
        previewUrl.value = "";
        alert("✅ Vote submitted successfully! News status updated.");
    }
    catch (err) {
        console.error("❌ Submit error:", err);
        alert("Something went wrong. Please try again.");
    }
    finally {
        isSubmitting.value = false;
    }
}
async function changePage(page) {
    currentPage.value = page;
    await voteStore.fetchVotes(news.value.id, page, perPage.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "text-center text-gray-400 py-20" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "animate-pulse text-lg" },
    });
}
else if (__VLS_ctx.news) {
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "max-w-4xl mx-auto px-4 py-10 space-y-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.news.imageUrl),
        alt: "news image",
        ...{ class: "rounded-xl w-full object-cover shadow-md" },
    });
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-3xl font-bold text-gray-900 tracking-tight" },
    });
    (__VLS_ctx.news.title);
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "inline-block text-sm font-semibold px-3 py-1 rounded-full" },
        ...{ class: ({
                'bg-green-100 text-green-700': __VLS_ctx.news.status === 'NOT_FAKE',
                'bg-red-100 text-red-700': __VLS_ctx.news.status === 'FAKE',
                'bg-gray-200 text-gray-700': __VLS_ctx.news.status === 'UNCERTAIN'
            }) },
    });
    // @ts-ignore
    [news, news, news,];
    (__VLS_ctx.news.status);
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600 leading-relaxed" },
    });
    (__VLS_ctx.news.fullDetail || __VLS_ctx.news.shortDetail);
    // @ts-ignore
    [news, news,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-medium text-gray-600" },
    });
    (__VLS_ctx.news.reporter);
    // @ts-ignore
    [news,];
    __VLS_asFunctionalElement(__VLS_elements.hr)({
        ...{ class: "border-gray-200 my-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "space-y-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-2xl font-semibold text-gray-800" },
    });
    if (__VLS_ctx.voteStore.voteList.length) {
        // @ts-ignore
        [voteStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        for (const [vote] of __VLS_getVForSourceType((__VLS_ctx.voteStore.voteList))) {
            // @ts-ignore
            [voteStore,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                key: (vote.id),
                ...{ class: "bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex justify-between items-center mb-2" },
            });
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-xs text-gray-500" },
            });
            (new Date(vote.createdAt || '').toLocaleString());
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "font-semibold text-sm" },
                ...{ class: ({
                        'text-green-600': vote.type === 'NOT_FAKE',
                        'text-red-500': vote.type === 'FAKE',
                    }) },
            });
            (vote.type === 'NOT_FAKE' ? '✅ Not Fake' : '❌ Fake');
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-gray-700 text-sm leading-relaxed" },
            });
            (vote.comment);
            if (vote.imageUrl) {
                __VLS_asFunctionalElement(__VLS_elements.img)({
                    src: (vote.imageUrl),
                    ...{ class: "rounded-lg max-h-56 mt-3 mx-auto object-cover shadow" },
                });
            }
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-xs text-gray-500 mt-2 text-right" },
            });
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "font-medium" },
            });
            (vote.userName || 'Anonymous');
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-gray-400 italic text-center py-6" },
        });
    }
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "mt-10 bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-5" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-xl font-semibold text-gray-800" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLoading))
                    return;
                if (!(__VLS_ctx.news))
                    return;
                __VLS_ctx.newVoteType = 'NOT_FAKE';
                // @ts-ignore
                [newVoteType,];
            } },
        ...{ class: "px-4 py-2 rounded-lg font-semibold border border-gray-300 transition" },
        ...{ class: ({
                'bg-green-500 text-white border-green-500': __VLS_ctx.newVoteType === 'NOT_FAKE',
                'hover:bg-green-100': __VLS_ctx.newVoteType !== 'NOT_FAKE'
            }) },
    });
    // @ts-ignore
    [newVoteType, newVoteType,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLoading))
                    return;
                if (!(__VLS_ctx.news))
                    return;
                __VLS_ctx.newVoteType = 'FAKE';
                // @ts-ignore
                [newVoteType,];
            } },
        ...{ class: "px-4 py-2 rounded-lg font-semibold border border-gray-300 transition" },
        ...{ class: ({
                'bg-red-500 text-white border-red-500': __VLS_ctx.newVoteType === 'FAKE',
                'hover:bg-red-100': __VLS_ctx.newVoteType !== 'FAKE'
            }) },
    });
    // @ts-ignore
    [newVoteType, newVoteType,];
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.newComment),
        rows: "3",
        placeholder: "Leave your comment here...",
        ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0030" },
    });
    // @ts-ignore
    [newComment,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ onChange: (__VLS_ctx.handleFileUpload) },
        type: "file",
        accept: "image/*",
        ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0036\u0030\u0030\u0020\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0034\u0030\u0030" },
    });
    // @ts-ignore
    [handleFileUpload,];
    if (__VLS_ctx.previewUrl) {
        // @ts-ignore
        [previewUrl,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-xs text-gray-500 mb-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (__VLS_ctx.previewUrl),
            ...{ class: "rounded-lg max-h-48 border border-gray-200 shadow-sm" },
        });
        // @ts-ignore
        [previewUrl,];
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.handleSubmitVote) },
        ...{ class: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60" },
        disabled: (__VLS_ctx.isSubmitting),
    });
    // @ts-ignore
    [handleSubmitVote, isSubmitting,];
    (__VLS_ctx.isSubmitting ? "Submitting..." : "Submit");
    // @ts-ignore
    [isSubmitting,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "text-center text-gray-400 py-20" },
    });
}
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['my-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-56']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            voteStore: voteStore,
            news: news,
            isLoading: isLoading,
            isSubmitting: isSubmitting,
            newVoteType: newVoteType,
            newComment: newComment,
            previewUrl: previewUrl,
            handleFileUpload: handleFileUpload,
            handleSubmitVote: handleSubmitVote,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
