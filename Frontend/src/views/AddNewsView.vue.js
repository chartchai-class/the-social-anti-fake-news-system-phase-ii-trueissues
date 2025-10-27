import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/supabase";
import { Newspaper, Upload, CheckCircle } from "lucide-vue-next";
const auth = useAuthStore();
const title = ref("");
const detail = ref("");
const status = ref("FAKE");
const image = ref(null);
const imagePreview = ref(null);
const message = ref("");
const loading = ref(false);
const previewData = ref(null);
function onFileChange(event) {
    const target = event.target;
    if (target.files && target.files.length > 0) {
        image.value = target.files[0];
        imagePreview.value = URL.createObjectURL(image.value);
    }
    else {
        image.value = null;
        imagePreview.value = null;
    }
}
async function submitNews() {
    if (!title.value || !detail.value) {
        message.value = "⚠️ Please fill all required fields.";
        return;
    }
    loading.value = true;
    try {
        let imageUrl = "";
        if (image.value) {
            const fileName = `${Date.now()}_${image.value.name}`;
            const { error } = await supabase.storage
                .from("ImageNews")
                .upload(fileName, image.value, {
                cacheControl: "3600",
                upsert: false,
            });
            if (error)
                throw error;
            const { data: publicData } = supabase.storage
                .from("ImageNews")
                .getPublicUrl(fileName);
            imageUrl = publicData.publicUrl;
        }
        const payload = {
            title: title.value,
            shortDetail: detail.value,
            fullDetail: detail.value,
            status: status.value,
            imageUrl: imageUrl,
            userId: auth.user.id,
        };
        const res = await axios.post("http://localhost:8080/api/news", payload, {
            headers: { "Content-Type": "application/json" },
        });
        previewData.value = res.data;
        message.value = "✅ News submitted successfully!";
        title.value = "";
        detail.value = "";
        image.value = null;
        imagePreview.value = null;
    }
    catch (err) {
        console.error(err);
        message.value = "❌ Failed to submit news.";
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "min-h-[85vh] flex flex-col items-center bg-gray-50 py-10 px-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white shadow-lg rounded-2xl w-full max-w-lg px-8 py-8 border border-gray-200" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-center mb-6 gap-2" },
});
const __VLS_0 = {}.Newspaper;
/** @type {[typeof __VLS_components.Newspaper, ]} */ ;
// @ts-ignore
Newspaper;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "w-6 h-6 text-blue-600" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "w-6 h-6 text-blue-600" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold text-gray-800" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-5" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-semibold mb-1 text-gray-700" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" },
    placeholder: "Enter news title",
});
(__VLS_ctx.title);
// @ts-ignore
[title,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-semibold mb-1 text-gray-700" },
});
__VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
    value: (__VLS_ctx.detail),
    ...{ class: "w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none" },
    placeholder: "Enter detailed description",
});
// @ts-ignore
[detail,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-semibold mb-1 text-gray-700" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.status),
    ...{ class: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" },
});
// @ts-ignore
[status,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "FAKE",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "NOT_FAKE",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-semibold mb-1 text-gray-700 flex items-center gap-1" },
});
const __VLS_5 = {}.Upload;
/** @type {[typeof __VLS_components.Upload, ]} */ ;
// @ts-ignore
Upload;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "w-4 h-4 text-gray-500" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "w-4 h-4 text-gray-500" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.onFileChange) },
    type: "file",
    accept: "image/*",
    ...{ class: "w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500" },
});
// @ts-ignore
[onFileChange,];
if (__VLS_ctx.imagePreview) {
    // @ts-ignore
    [imagePreview,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.imagePreview),
        alt: "Preview",
        ...{ class: "rounded-lg border w-full max-h-48 object-cover" },
    });
    // @ts-ignore
    [imagePreview,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center mt-6" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.submitNews) },
    disabled: (__VLS_ctx.loading),
    ...{ class: "w-full py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition" },
});
// @ts-ignore
[submitNews, loading,];
(__VLS_ctx.loading ? "Submitting..." : "Submit");
// @ts-ignore
[loading,];
if (__VLS_ctx.message) {
    // @ts-ignore
    [message,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center text-sm mt-3" },
        ...{ class: (__VLS_ctx.message.includes('✅') ? 'text-green-600' : 'text-red-500') },
    });
    // @ts-ignore
    [message,];
    (__VLS_ctx.message);
    // @ts-ignore
    [message,];
}
const __VLS_10 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    name: "fade",
}));
const __VLS_12 = __VLS_11({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
if (__VLS_ctx.previewData) {
    // @ts-ignore
    [previewData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-10 bg-white border border-gray-200 shadow-md rounded-xl w-full max-w-lg p-5" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center gap-2 mb-3" },
    });
    const __VLS_15 = {}.CheckCircle;
    /** @type {[typeof __VLS_components.CheckCircle, ]} */ ;
    // @ts-ignore
    CheckCircle;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ class: "text-green-500 w-5 h-5" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "text-green-500 w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-lg font-bold text-gray-800" },
    });
    if (__VLS_ctx.previewData.imageUrl) {
        // @ts-ignore
        [previewData,];
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (__VLS_ctx.previewData.imageUrl),
            ...{ class: "rounded-lg w-full h-48 object-cover border mb-4" },
        });
        // @ts-ignore
        [previewData,];
    }
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "font-bold text-xl text-gray-900 mb-1" },
    });
    (__VLS_ctx.previewData.title);
    // @ts-ignore
    [previewData,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-700 mb-3" },
    });
    (__VLS_ctx.previewData.shortDetail);
    // @ts-ignore
    [previewData,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "px-3 py-1 rounded-full text-xs font-semibold" },
        ...{ class: ({
                'bg-red-100 text-red-700': __VLS_ctx.previewData.status === 'FAKE',
                'bg-green-100 text-green-700': __VLS_ctx.previewData.status === 'NOT_FAKE',
            }) },
    });
    // @ts-ignore
    [previewData, previewData,];
    (__VLS_ctx.previewData.status);
    // @ts-ignore
    [previewData,];
}
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['min-h-[85vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-28']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['file:mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['file:py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['file:px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['file:rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['file:border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['file:bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['file:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:file:bg-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Newspaper: Newspaper,
            Upload: Upload,
            CheckCircle: CheckCircle,
            title: title,
            detail: detail,
            status: status,
            imagePreview: imagePreview,
            message: message,
            loading: loading,
            previewData: previewData,
            onFileChange: onFileChange,
            submitNews: submitNews,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
