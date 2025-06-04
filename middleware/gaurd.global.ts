import { useAuthStores } from "~/stores/auth";


export default defineNuxtRouteMiddleware((to, from, next) => {
    const Auth = useAuthStores();
    if (to.path.includes("/auth")) {
        if (Auth.isAuthenticate()) {
            return navigateTo("/account/home")
        }
    } else if (to.path.includes('/account')) {
        if (!Auth.isAuthenticate()) {
            let redirectPath = "/auth/login";
            if (to?.query?.pay && to?.params?.slug) {
                redirectPath= redirectPath +`?pay=${to.params.slug}`;
            }
            return navigateTo(redirectPath)
        }
    }

    // next()
})
