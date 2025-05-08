
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useRubirqueServices = defineStore('rubrique', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/rubrique/all?${queryParams.toString()}`)
    }

    async function allByFilter(queryParams:any) {
        return await useCustomFetch(`/rubrique/all/filter?${queryParams.toString()}`)
    }
    
    async function findDetail(params: any) {
        return await useCustomFetch(`/rubrique/${params.id}/${params.uid}`)
    }
    async function create(items:any) {
        return await useCustomFetch(`/rubrique/create`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/rubrique/update`, {
                method: 'put',
                body:items
            })
    }
    return {
        all,
        create,
        findDetail,
        allByFilter,
        update
    }
})