

<script setup lang="ts">
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import country from "~/jsons/country.json"



const storeClub = useClubViewModel()

const filters = reactive({
  search: "",
  status: "",
});

const optionStatus = [
    { label: 'actif', status:"actif"},
    { label: 'inactif', status:"inactif"},
]



const isActive = ref(false)
const setActive = (state) => {
    isActive.value =state
}

const createClub = async () => {
    await storeClub.create()
    await handleListe()
    // setActive(false) 
}

const handleListe =async (params:any={}) => {
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        status: params.status || '',
    });

    await storeClub.all(queryParams) 
}

watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
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
    <NuxtLayout>
    <div class="w-full">
        <div class="w-full p-2">
            <div class="w-full">
                <div class="w-full flex items-center justify-between mb-10">
                    <h5 class="text-sm font-semibold uppercase text-neutral-500">Rubriques</h5>
                    <div class="w-auto">
                        <button 
                        @click="setActive(true)"
                        class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                        >
                            Ajouter une rubrique
                        </button>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                    <div class="w-auto">
                        <input 
                        class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" 
                        placeholder="Recherche..." autocomplete="off">
                    </div>
                    <!-- <div class="w-auto gap-2 flex items-center justify-between">
                        <select class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                            <option value="">Tous</option>
                            <option value="">Clubs</option>
                            <option value="">Partenaires</option>
                        </select>
                        <button class="inline-flex items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 rounded-full px-3 text-xs h-8 w-full justify-start">
                            <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8.5v6"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.5l3 3 3-3"></path>
                            </svg>
                            Télécharger
                        </button>
                    </div> -->
                </div>
            </div>
            <div class="w-full p-2">
                <ClubTableComponent :data="storeClub?.clubs"/>
            </div>
    <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
        <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                        Nouveelle rubrique
                    </h2>
                </div>
                <form class="" @submit.prevent="createClub()">
                        <div class=" mb-4">
                        <UiFormInput 
                        required
                        v-model="storeClub.newClub.name"
                        label="Nom club" placeholder="Nom du club" name="title" />
                    </div>
                    <div class="">
                    <UiFormSelect 
                        required
                        :options="country"
                            v-model="storeClub.newClub.pays"
                        placeholder="Pays" 
                        label="Pays"
                        />
                        <UiFormSelect 
                        required
                        :options="optionStatus"
                            v-model="storeClub.newClub.status"
                        placeholder="Statut" 
                        label="Statut"
                        />
                        
                    </div>
                    <div class="w-full mt-4">
                        <UiButtonSubmit label="Créer" :isLoading="storeClub.isLoading"/>    
                    </div>
            </form>
        </div>
            </UiModal>
        </div>
    </div>
    
</NuxtLayout>
    </div>
</template>


<style scoped>

</style>