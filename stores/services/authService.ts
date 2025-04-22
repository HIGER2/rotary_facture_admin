
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
        return await useCustomFetch(`/logout`)
    }

    async function connected() {
        return await useCustomFetch(`/me`)
    }
    
    return {
        register,
        login,
        logout,
        connected
    }
})