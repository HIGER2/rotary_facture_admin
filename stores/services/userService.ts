
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserServices = defineStore('user', () => { 
    async function analityc() {
        return await useCustomFetch(`/user/stats`)
    }
    async function rapport(queryParams) {
        return await useCustomFetch(`/user/rapport?${queryParams.toString()}`)
    }
    async function all(queryParams:any) {
        return await useCustomFetch(`/user/all?${queryParams.toString()}`)
    }

    async function allByFilter(queryParams:any) {
        return await useCustomFetch(`/user/all/filter?${queryParams.toString()}`)
    }
    
    async function findDetail(params: any) {
        return await useCustomFetch(`/user/${params.id}/${params.uid}`)
    }
    async function create(items:any) {
        return await useCustomFetch(`/user/create`, {
                method: 'POST',
                body:items
            })
    }

    async function update(items:any) {
        return await useCustomFetch(`/user/update`, {
                method: 'put',
                body:items
            })
    }
    return {
        analityc,
        rapport,
        all,
        create,
        findDetail,
        allByFilter,
        update
    }
})