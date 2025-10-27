import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();
const showAdminMenu = ref(false); // ✅ สร้าง state สำหรับเปิด/ปิด dropdown
function toggleMenu() {
    showAdminMenu.value = !showAdminMenu.value;
}
// ✅ คลิกที่อื่น → ปิดเมนู
function handleClickOutside(e) {
    const menu = document.getElementById("admin-dropdown");
    if (menu && !menu.contains(e.target)) {
        showAdminMenu.value = false;
    }
}
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    auth.initialize?.(); // ถ้ามี initialize() ใน authStore
});
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-dvh flex flex-col bg-zinc-50 text-zinc-900" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "sticky top-0 z-30 border-b bg-white/80 backdrop-blur shadow-sm" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container-app h-16 flex items-center justify-between" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "flex flex-col leading-none" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "flex flex-col leading-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-lg font-semibold tracking-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "brand-sub" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "flex items-center gap-1" },
});
const __VLS_5 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    to: "/",
    ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
    exactActiveClass: "bg-zinc-900 text-white",
}));
const __VLS_7 = __VLS_6({
    to: "/",
    ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
    exactActiveClass: "bg-zinc-900 text-white",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
var __VLS_8;
if (!__VLS_ctx.auth.user) {
    // @ts-ignore
    [auth,];
    const __VLS_10 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        to: "/login",
        ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
        exactActiveClass: "bg-zinc-900 text-white",
    }));
    const __VLS_12 = __VLS_11({
        to: "/login",
        ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
        exactActiveClass: "bg-zinc-900 text-white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    var __VLS_13;
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        to: "/register",
        ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
        exactActiveClass: "bg-zinc-900 text-white",
    }));
    const __VLS_17 = __VLS_16({
        to: "/register",
        ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
        exactActiveClass: "bg-zinc-900 text-white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_19 } = __VLS_18.slots;
    var __VLS_18;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        id: "admin-dropdown",
        ...{ class: "relative" },
    });
    if (__VLS_ctx.auth.user.role?.toLowerCase() === 'admin') {
        // @ts-ignore
        [auth,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.toggleMenu) },
            ...{ class: "rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100" },
        });
        // @ts-ignore
        [toggleMenu,];
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute right-0 mt-1 flex flex-col bg-white border shadow-md rounded-lg overflow-hidden w-44 z-50" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showAdminMenu) }, null, null);
    // @ts-ignore
    [vShow, showAdminMenu,];
    const __VLS_20 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        to: "/admin/news",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        to: "/admin/news",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    const __VLS_26 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.auth.user))
                    return;
                __VLS_ctx.showAdminMenu = false;
                // @ts-ignore
                [showAdminMenu,];
            } });
    const { default: __VLS_27 } = __VLS_23.slots;
    var __VLS_23;
    const __VLS_28 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        to: "/admin/comments",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        to: "/admin/comments",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    const __VLS_34 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.auth.user))
                    return;
                __VLS_ctx.showAdminMenu = false;
                // @ts-ignore
                [showAdminMenu,];
            } });
    const { default: __VLS_35 } = __VLS_31.slots;
    var __VLS_31;
    const __VLS_36 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ 'onClick': {} },
        to: "/admin/users",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onClick': {} },
        to: "/admin/users",
        ...{ class: "px-3 py-2 text-sm hover:bg-zinc-100 text-left" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    const __VLS_42 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.auth.user))
                    return;
                __VLS_ctx.showAdminMenu = false;
                // @ts-ignore
                [showAdminMenu,];
            } });
    const { default: __VLS_43 } = __VLS_39.slots;
    var __VLS_39;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center gap-2 ml-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm text-zinc-700" },
    });
    (__VLS_ctx.auth.user?.name || "User");
    // @ts-ignore
    [auth,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.auth.user))
                    return;
                __VLS_ctx.auth.logout();
                // @ts-ignore
                [auth,];
            } },
        ...{ class: "rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-100" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "container-app flex-1 py-8" },
});
const __VLS_44 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_asFunctionalElement(__VLS_elements.footer, __VLS_elements.footer)({
    ...{ class: "border-t bg-white/70" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container-app py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm text-zinc-500" },
});
(new Date().getFullYear());
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-4 text-sm" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    ...{ class: "text-zinc-500 hover:text-zinc-700 transition" },
    href: "#",
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    ...{ class: "text-zinc-500 hover:text-zinc-700 transition" },
    href: "#",
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    ...{ class: "text-zinc-500 hover:text-zinc-700 transition" },
    href: "#",
});
/** @type {__VLS_StyleScopedClasses['min-h-dvh']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-zinc-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-900']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['container-app']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-zinc-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['container-app']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/70']} */ ;
/** @type {__VLS_StyleScopedClasses['container-app']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-zinc-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-zinc-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-zinc-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-zinc-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            RouterView: RouterView,
            auth: auth,
            showAdminMenu: showAdminMenu,
            toggleMenu: toggleMenu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
