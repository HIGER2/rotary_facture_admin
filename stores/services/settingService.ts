
import { defineStore } from 'pinia'


export const useSettingServices = defineStore('setting', () => { 

    async function allCoutry() {
        return await useCustomFetch(`setting/countrie/all`)
    }

    async function allCurrency() {
        return await useCustomFetch(`setting/currency/all`)
    }

    async function createOrUpdateCurrency(item:any) {
        return await useCustomFetch(`setting/currency/create-update`,{
            method:'post',
            body:item
        })
    }
    return {
        allCoutry,
        createOrUpdateCurrency,
        allCurrency
    }
})