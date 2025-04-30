
import { defineStore } from 'pinia'


export const useSettingServices = defineStore('setting', () => { 

    async function allCoutry() {
        return await useCustomFetch(`setting/countrie/all`)
    }
  
    return {
        allCoutry
    }
})