
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const usePaymentServices = defineStore('payment', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/payment/all?${queryParams.toString()}`)
    }

    async function create(items:any) {
        return await useCustomFetch(`/payment/create`, {
                method: 'POST',
                body:items
            })
    }

    async function processePayment(items:any) {
        return await useCustomFetch(`/payment/processe`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/payment/update`, {
                method: 'put',
                body:items
            })
    }

    async function checkPayment(items:any) {
        return await useCustomFetch(`/payment/verify/token`, {
                method: 'post',
                body:items
            })
    }

    async function findWithPaiement(reference:string) {
        return await useCustomFetch(`/payment/find/${reference}`)
    }

    return {
        all,
        create,
        findWithPaiement,
        update,
        processePayment,
        checkPayment
    }
})