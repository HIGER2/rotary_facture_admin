
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useFactureServices = defineStore('facture', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/facture/all?${queryParams.toString()}`)
    }

    async function create(items:any) {
        return await useCustomFetch(`/facture/create`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/facture/update`, {
                method: 'PUT',
                body:items
            })
    }

    async function findWithPaiement(reference:string) {
        return await useCustomFetch(`/facture/find/${reference}`)
    }

    async function find(reference:string) {
        return await useCustomFetch(`/facture/get/${reference}`)
    }

    return {
        all,
        create,
        findWithPaiement,
        find,
        update
    }
})