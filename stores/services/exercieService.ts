
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useExercieServices = defineStore('exercice', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/exercice/all?${queryParams.toString()}`)
    }

    async function allByFilter(queryParams:any) {
        return await useCustomFetch(`/exercice/all/filter?${queryParams.toString()}`)
    }
    
    async function findDetail(params: any) {
        return await useCustomFetch(`/exercice/${params.id}/${params.uid}`)
    }
    async function create(items:any) {
        return await useCustomFetch(`/exercice/create`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/exercice/update`, {
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