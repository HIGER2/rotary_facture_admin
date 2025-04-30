
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useClubServices = defineStore('club', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/club/all?${queryParams.toString()}`)
    }

    async function allByFilter(queryParams:any) {
        return await useCustomFetch(`/club/all/filter?${queryParams.toString()}`)
    }
    
    async function findDetail(params: any) {
        return await useCustomFetch(`/club/${params.id}/${params.uid}`)
    }
    async function create(items:any) {
        return await useCustomFetch(`/club/create`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/club/update`, {
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