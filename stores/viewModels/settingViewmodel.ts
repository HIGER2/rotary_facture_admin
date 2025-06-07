
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useSettingServices } from '../services/settingService';

export const useSettingViewModel = defineStore('SettingViewModel', () => {
    const isLoading = ref(false);
    const useCountry = useSettingServices();
    let currency =ref([])

    async function allCoutry() {
        const data = await useCountry.allCoutry();
        return data?.data?.data
    }

    async function allCurrency() {
        const data = await useCountry.allCurrency();
        currency.value = data?.data?.data
        return data?.data?.data
    }

    async function createOrUpdateCurrency() {
        if (currency.value.length==0) {
            return
        }
        isLoading.value =true
        let items=[...currency.value]
        const data = await useCountry.createOrUpdateCurrency(items);
        isLoading.value = false
        if (data?.error) {
            alert(data?.error?.message)
        }
        if (data?.data) {
            useToastify("Opération éffectuée", {
                autoClose: 1000,
                type: ToastifyOption.TYPE.SUCCESS,
                // position: ToastifyOption.POSITION.TOP_RIGHT,
                // transition: ToastifyOption.TRANSITIONS.,
                // theme: ToastifyOption.THEME.LIGHT,
            });
        }
        return data?.data
    }
    return {
        allCoutry,
        createOrUpdateCurrency,
        allCurrency,
        isLoading,
        currency
        
    }
})