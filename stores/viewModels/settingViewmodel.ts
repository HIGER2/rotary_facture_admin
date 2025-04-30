
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useSettingServices } from '../services/settingService';

export const useSettingViewModel = defineStore('SettingViewModel', () => {
    
    const isLoading = ref(false);

    const useCountry = useSettingServices();

    async function allCoutry() {
        const data = await useCountry.allCoutry();

        return data?.data?.data
    }
    return {
        allCoutry,
    }
})