
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useClubServices = defineStore('club', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/club/all?${queryParams.toString()}`)
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
    return {
        all,
        create,
        findDetail
    }
})