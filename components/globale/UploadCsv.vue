

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

 const { t } = useI18n() // ✅ t est maintenant accessible

   
defineProps<{
    data: any,
    colunm: any,
    lang?: boolean
}>()

const upload=(data,colunm,lang=false)=>{
    useCsv(data,colunm, lang && t)
}
</script>

<template>
    <div>
        <button 
                @click="upload(data,colunm,lang)"
                class="inline-flex  max-w-max items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 rounded-full px-3 text-xs h-8 w-full justify-start">
                    <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8.5v6"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.5l3 3 3-3"></path>
                    </svg>
                    Télécharger
                </button>
    </div>
</template>


<style scoped>

</style>