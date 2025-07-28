import type { UseFetchOptions } from 'nuxt/app'

export async function useCustomFetch<T>(url: string | (() => string),options: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig()
    const { getCookie } = useCookies()
    const token = getCookie('token')
            let headers = {
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...options.headers
            }
        
        if (options.body instanceof FormData) {
        delete headers['Content-Type']
        } else {
        headers['Content-Type'] = 'application/json'
        }

    let option = {
        ...options,
        // baseURL:'http://localhost:8000/api/',
        baseURL:`${config.public.apiBase}`,
        headers
    }

    
//     return useFetch(url, {
//     ...option,
//     $fetch: useNuxtApp().$customFetch,
    //   })
    
    try {
    // Effectuer la requête avec $fetch
    let response = await $fetch<T>(url, {
        ...option,
        onResponseError({ response }) {
            if (response.status === 401 && response._data?.message === 'Unauthenticated.') {
                const { removeCookie } = useCookies()
                removeCookie('token')
                navigateTo('/auth/login')
            }
        },
    })

    return { data: response, error: null }

    } catch (error) {
    // Gérer l'erreur
        if (error.response) return { data: null, error: error.response?._data || 'Erreur inconnue' }
        else return { data: null, error: 'Une erreur inconnue est survenue' }
    }

    
}
