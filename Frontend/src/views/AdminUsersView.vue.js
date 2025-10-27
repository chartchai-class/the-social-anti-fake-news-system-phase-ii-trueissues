import { ref, onMounted } from "vue";
import axios from "axios";
import { UserCog, ArrowUp, ArrowDown } from "lucide-vue-next";
const users = ref([]);
const loading = ref(false);
const message = ref("");
async function fetchUsers() {
    loading.value = true;
    try {
        const res = await axios.get("http://localhost:8080/api/admin/users");
        users.value = res.data;
    }
    catch (err) {
        message.value = "❌ Failed to load users";
    }
    finally {
        loading.value = false;
    }
}
async function changeRole(id, role) {
    try {
        await axios.put(`http://localhost:8080/api/admin/users/${id}/role?role=${role}`);
        message.value = `✅ User #${id} is now ${role}`;
        await fetchUsers();
        setTimeout(() => (message.value = ""), 2500);
    }
    catch (err) {
        message.value = "❌ Failed to change role";
    }
}
onMounted(fetchUsers);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "max-w-5xl mx-auto py-10 px-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800" },
});
const __VLS_0 = {}.UserCog;
/** @type {[typeof __VLS_components.UserCog, ]} */ ;
// @ts-ignore
UserCog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "w-7 h-7 text-blue-500" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "w-7 h-7 text-blue-500" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    name: "fade",
}));
const __VLS_7 = __VLS_6({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
if (__VLS_ctx.message) {
    // @ts-ignore
    [message,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg" },
    });
    (__VLS_ctx.message);
    // @ts-ignore
    [message,];
}
var __VLS_8;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-gray-400 text-center py-10 text-sm" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200" },
    });
    __VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
        ...{ class: "min-w-full border-collapse text-sm text-left" },
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
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [u] of __VLS_getVForSourceType((__VLS_ctx.users))) {
        // @ts-ignore
        [users,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (u.id),
            ...{ class: "hover:bg-gray-50 transition" },
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center text-gray-600" },
        });
        (u.id);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b font-medium text-gray-800" },
        });
        (u.name);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-gray-600" },
        });
        (u.email);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "px-3 py-1 rounded-full text-xs font-semibold" },
            ...{ class: ({
                    'bg-blue-100 text-blue-700': u.role === 'ADMIN',
                    'bg-green-100 text-green-700': u.role === 'MEMBER',
                    'bg-gray-100 text-gray-700': u.role === 'READER',
                }) },
        });
        (u.role);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-2 border-b text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center justify-center gap-2" },
        });
        if (u.role === 'READER') {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!(u.role === 'READER'))
                            return;
                        __VLS_ctx.changeRole(u.id, 'MEMBER');
                        // @ts-ignore
                        [changeRole,];
                    } },
                ...{ class: "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium transition" },
            });
            const __VLS_10 = {}.ArrowUp;
            /** @type {[typeof __VLS_components.ArrowUp, ]} */ ;
            // @ts-ignore
            ArrowUp;
            // @ts-ignore
            const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
                ...{ class: "w-3 h-3" },
            }));
            const __VLS_12 = __VLS_11({
                ...{ class: "w-3 h-3" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        }
        else if (u.role === 'MEMBER') {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(u.role === 'READER'))
                            return;
                        if (!(u.role === 'MEMBER'))
                            return;
                        __VLS_ctx.changeRole(u.id, 'READER');
                        // @ts-ignore
                        [changeRole,];
                    } },
                ...{ class: "bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium transition" },
            });
            const __VLS_15 = {}.ArrowDown;
            /** @type {[typeof __VLS_components.ArrowDown, ]} */ ;
            // @ts-ignore
            ArrowDown;
            // @ts-ignore
            const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
                ...{ class: "w-3 h-3" },
            }));
            const __VLS_17 = __VLS_16({
                ...{ class: "w-3 h-3" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        }
        else {
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-gray-400 text-xs italic" },
            });
        }
    }
}
/** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-50']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-green-200']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
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
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-yellow-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-yellow-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            UserCog: UserCog,
            ArrowUp: ArrowUp,
            ArrowDown: ArrowDown,
            users: users,
            loading: loading,
            message: message,
            changeRole: changeRole,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
