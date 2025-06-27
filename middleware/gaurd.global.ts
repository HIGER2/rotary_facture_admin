import { useAuthStores } from "~/stores/auth";
import { useAuthViewModel } from "~/stores/viewModels/authViewmodel";


export default defineNuxtRouteMiddleware((to, from, next) => {
    const Auth = useAuthStores();
    const storeAuth = useAuthViewModel()

    const currentRoute = to.path;
    // const allowedRoutes = Auth.router[storeAuth.userConnected?.role].map(item => item.path);
    // const isAllowed = allowedRoutes.some(path => path === currentRoute);
    // if (!isAllowed) {
    //     return navigateTo('/account/home');
    // }
    
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
