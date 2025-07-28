import { useCookies } from "~/composables/hooks/useCookie"

export const useUserManager = defineStore('GlobaleManager', () => {

    let cookie = useCookies()
    
    const isAuthenticated = computed(() => {
        let token = cookie.getCookie('token')
        return token ? true : false
    })

    return {
        isAuthenticated
    }
})