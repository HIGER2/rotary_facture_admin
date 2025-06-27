
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useAuthServices } from '../services/authService';

export const useAuthViewModel = defineStore('AuthViewModel', () => {
   
    const authService = useAuthServices();
    const {setCookie,getCookie,removeCookie} =useCookies()
    
    const user = ref();
    const isLoading =ref(false);
    const userConnected= ref(null);
    const messageError =ref(null)
    const newUser = reactive<any>({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    });
    const authUser = reactive<any>({
        identifiant:"",
        type:"member",
        password:"",
    })

    const clear = () => {
        userConnected.value = ''
    }
    
    const setMessageError = (value : string | null | undefined=null) => {
        messageError.value = value
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
        setMessageError()
        const data = await authService.login(authUser);
        isLoading.value = false
        if (!data.error) {
            if (data.data.data?.redirect) {
                setCookie('token',data.data?.data?.token);
                navigateTo('/account/home')
            }else{
                let route = useRoute();
                let pay = localStorage.getItem('pay');

                if (route.query?.pay && !pay){
                    localStorage.setItem('pay', route.query?.pay as string);
                }if (!route.query?.pay && pay){
                    localStorage.removeItem('pay');
                    
                }
                navigateTo({
                    path: '/auth/login',
                    query: { success: 'true'}
                },{replace: true})
            }
        }
        
        if (data.error) {
            setMessageError(data.error?.message)
        }
    }

    async function logout() {
        const data = await authService.logout();
            removeCookie('token');
            navigateTo('/auth/login');
    }

    async function loginWithToken(token: string) {
        const data = await authService.loginWithToken(token);
        console.log(data.error?.code);
        
        if (!data.error) {
            setCookie('token',data.data?.data?.token);
            let pay = localStorage.getItem('pay');
            if (pay) {
                localStorage.removeItem('pay');
                navigateTo(`/account/factures/club/invoice-unpaid/${pay}`)
                return
            }
            navigateTo('/account/home')
        }
        else if (data.error && data.error?.code === 403) {
            navigateTo('/auth/login')

        }
    }

    async function conntected() {
       let data  = await authService.connected();
       userConnected.value = data?.data?.data
    //    provide('userConnected', userConnected.value)
    }

    return {
        register,
        login,
        newUser,
        authUser,
        conntected,
        userConnected,
        logout,
        isLoading,
        loginWithToken,
        setMessageError,
        messageError,
    }
})