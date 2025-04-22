import { useAuthStores } from "~/stores/auth";


export default defineNuxtRouteMiddleware((to, from, next) => {
    const Auth = useAuthStores();

    if (to.path.includes("/auth")) {
        if (Auth.isAuthenticate()) {
            return navigateTo("/account/home")
        }
    } else if (to.path.includes('/account')) {
        if (!Auth.isAuthenticate()) {
            return navigateTo("/auth/login")
        }
    }

    // next()
})
