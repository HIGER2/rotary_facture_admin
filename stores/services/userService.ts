
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserServices = defineStore('user', () => { 
    async function analityc() {
        return await useCustomFetch(`/user/stats`)
    }
    async function rapport(queryParams) {
        return await useCustomFetch(`/user/rapport?${queryParams.toString()}`)
    }
    return {
        analityc,
        rapport
    }
})