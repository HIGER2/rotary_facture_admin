
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useUserServices } from '../services/userService';

export const useUserViewModel = defineStore('UserViewModel', () => {
   
    const userService = useUserServices();
    
    const stats = reactive<any>({
        data: "",
        analityc: "",
    });
  
    async function analityc() {
        const data = await userService.analityc();
        stats.data = data?.data?.data
        stats.analityc =data?.data?.analytic
    }

    
   
    return {
        analityc,
        stats
    }
})