
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthServices = defineStore('auth', () => { 
    
    async function register(items:any) {
        return await useCustomFetch(`/register`, {
                method: 'POST',
                body:items
        })
    }

    async function login(items:any) {
        return await useCustomFetch(`/auth/login`, {
                method: 'POST',
                body:items
        })
    }
    async function logout() {
        return await useCustomFetch(`/auth/logout`)
    }

    async function loginWithToken(token:string) {
        return await useCustomFetch(`/auth/magic-login/${token}`)
    }

    async function connected() {
        return await useCustomFetch(`/auth/connected`)
    }
    
    return {
        register,
        login,
        logout,
        loginWithToken,
        connected
    }
})