
import { defineStore } from 'pinia'


export const useClubPersonnelServices = defineStore('clubPersonnel', () => { 

    async function all(queryParams:any) {
        return await useCustomFetch(`/club/all?${queryParams.toString()}`)
    }
    async function findDetail(params: any) {
        return await useCustomFetch(`/club/${params.id}/${params.uid}`)
    }
      async function create(items:any) {
        return await useCustomFetch(`/club/personnal/create`, {
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