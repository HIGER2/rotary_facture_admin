import type { UseFetchOptions } from 'nuxt/app'

export async function useCustomFetch<T>(url: string | (() => string),options: UseFetchOptions<T> = {},
) {
    const config = useRuntimeConfig()

    let option = {
        ...options,
        // baseURL:'http://localhost:8000/api/',
        baseURL:`${config.public.apiBase}/api` || 'http://localhost:8000/api/',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

//     return useFetch(url, {
//     ...option,
//     $fetch: useNuxtApp().$customFetch,
    //   })
    
    try {
    // Effectuer la requête avec $fetch
    let response = await $fetch<T>(url, {
        ...option,
    })

    return { data: response, error: null }

    } catch (error) {
    // Gérer l'erreur
        if (error.response) return { data: null, error: error.response?._data || 'Erreur inconnue' }
        else return { data: null, error: 'Une erreur inconnue est survenue' }
    
    }

    
}
