
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useUserServices } from '../services/userService';

export const useUserViewModel = defineStore('UserViewModel', () => {
   
    const userService = useUserServices();
 
    const rapports = reactive({
        analityc:[],
        club :[]
    })
    const stats = reactive<any>({
        data: "",
        analityc: "",
    });
  
    async function analityc() {
        const data = await userService.analityc();
        stats.data = data?.data?.data
        stats.analityc =data?.data?.analytic
    }

    async function rapport(queryParams) {
        const data = await userService.rapport(queryParams);

        rapports.analityc = data?.data?.data?.analityc
        rapports.club = data?.data?.data?.club
        
    }
    return {
        analityc,
        stats,
        rapport,
        rapports,
    }
})