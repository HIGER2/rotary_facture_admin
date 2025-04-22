
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useAuthServices } from '../services/authService';

export const useAuthViewModel = defineStore('AuthViewModel', () => {
   
    const authService = useAuthServices();
    const {setCookie,getCookie,removeCookie} =useCookies()
    
    const user = ref();
    const isLoading =ref(false);
    const userConnected= ref();
    const newUser = reactive<any>({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    });
    const authUser = reactive<any>({
        identifiant:"admin@gmail.com",
        password:"password",
    })
    
    const clear = () => {
        userConnected.value = ''
    }
    async function register() {
        const data = await authService.register(newUser);
        // user.value = response
        // if (!erreur) {
        //     setCookie('token', user.value?.token);
        //     navigateTo('/account/home/dashboard')
        // }
    }

    async function login() {
        isLoading.value = true
       
        const data = await authService.login(authUser);
        isLoading.value = false
        console.log(data);
        
        if (!data.error) {
            setCookie('token',data.data?.data?.token);
            navigateTo('/account/home')
        }
    }

    async function logout() {
        const data = await authService.logout();
            removeCookie('token');
            navigateTo('/auth/login');
    }

    async function conntected() {
        const { response, erreur } = await authService.connected();
        userConnected.value = response
    }

    return {
        register,
        login,
        newUser,
        authUser,
        conntected,
        userConnected,
        logout,
        isLoading
    }
})