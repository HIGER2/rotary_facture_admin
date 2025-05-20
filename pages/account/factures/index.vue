

<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel'


const storeFacture = useFactureViewModel()
const loading=ref(false)

definePageMeta({
  breadcrumb: 'Factures'
})
const filters = reactive({
  search: "",
  status: "",
});

const handleListe =async (params:any={}) => {

    if (storeFacture?.factures?.length == 0) {
        loading.value = true
    }
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        status: params.status || '',
    });
    await storeFacture.all(queryParams) 
    loading.value = false
    
}

watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
        loading.value = true
        storeFacture.factures = []
        handleListe(value);
        clearTimeout(interval);
        }, 400);
    },
    { deep: true }
);

onMounted(() => {
   handleListe()
})
</script>

<template>
    <div>
    <NuxtLayout v-slot="{ userConnected }">
        <div class="w-full">
            <div class="w-full p-2">
                <div class="w-full">
                    <div class="w-full flex items-center justify-between mb-10">
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">Factures</h5>
                        <template v-if="userConnected?.role !== 'club'">
                            <div class="w-auto">
                                <NuxtLink 
                                class="inline-flex items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                                to="factures/create"
                                >
                                    Nouvelle Facture
                                </NuxtLink>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2 mb-5">
                    <template v-for="(item, index) in storeFacture?.analityc" :key="index">
                        <div class="box">
                            <span class=" text-xs text-gray-500 font-medium">{{ item?.label }}</span>
                            <h2 class="text-lg font-extrabold">{{ item?.value }}</h2>
                        </div>
                    </template>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                        <div class="w-auto">
                            <input 
                            v-model="filters.search"
                            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" 
                            placeholder="Recherche facture..."  autocomplete="off">
                        </div>
                        <div class="w-auto gap-2 flex items-center justify-between">
                            <select v-model="filters.status" class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                                <option value="" >Tout</option>
                                <option value="en_cours">en cours</option>
                                <option value="brouillon">brouillon</option>
                                <option value="payée">payée</option>
                                <option value="annulée">annulée</option>
                                <option value="partiellement_payé">partiellement payé</option>
                                <option value="arriérée">arriérée</option>
                            </select>
                            <button class="inline-flex cursor-pointer items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 rounded-full px-3 text-xs h-8 w-full justify-start">
                                <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8.5v6"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.5l3 3 3-3"></path>
                                </svg>
                                Télécharger
                            </button>
                        </div>
                </div>
                <div class="w-full p-2">
                    <FactureTableComponent :loading="loading" :user="userConnected" :data="storeFacture?.factures"/>
                </div>
            </div>
        </div>
        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>