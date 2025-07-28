
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'


export const useClubServices = defineStore('club', () => { 

    async function createFromFile(items:any) {

        return await useCustomFetch(`/club/createFromFile`, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            body: items
        })
    }

    async function all(queryParams:any) {
        return await useCustomFetch(`/club/all?${queryParams.toString()}`)
    }

    async function allByFilter(queryParams:any) {
        return await useCustomFetch(`/club/all/filter?${queryParams.toString()}`)
    }
    
    async function findDetail(params: any) {
        return await useCustomFetch(`/club/${params.id}/${params.uid}`)
    }

    async function findByMember(params: any) {
        return await useCustomFetch(`/club/by/member/${params.id}/${params.uid}`)
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
        update,
        findByMember,
        createFromFile
    }
})