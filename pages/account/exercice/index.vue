

<script setup lang="ts">
import { useExerciceViewModel } from '~/stores/viewModels/exerciceViewmodel';

const storeExercice = useExerciceViewModel()

const filters = reactive({
  search: "",
  status: "",
  limit: "1",
});



const isActive = ref(false)
const isActiveUpdate = ref(false)
const loading=ref(false)

const setActive = (state:boolean) => {
    isActive.value =state
}

const setActiveUpdate = (state:boolean) => {
    isActiveUpdate.value =state
}


const setUpdate = (item:any) => {
    storeExercice.updateExercice.status = item?.status
    storeExercice.updateExercice.id = item?.id
    storeExercice.updateExercice.annee = item?.annee
    storeExercice.updateExercice.begin_date = item?.begin_date
    storeExercice.updateExercice.end_date = item?.end_date
    setActiveUpdate(true)
}

const createExercice = async () => {
    await storeExercice.create()
    await handleListe()
    // setActive(false) 
}


const updateExercice = async () => {
    await storeExercice.update()
    await handleListe()
    // setActive(false) 
}

const handleListe =async (params:any={}) => {
   
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        page: filters.limit || '',
        status: params.status || '',
    });
    
    await storeExercice.allByFilter(queryParams) 
    loading.value = false
}

watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
            // loading.value = true
            // storeRubrique.rubriques.data = []
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
        <!-- <pre>{{ storeClub?.clubs }}</pre> -->
        <div class="w-full p-2">
            <div class="w-full">
                <div class="w-full flex items-center justify-between mb-10">
                    <h5 class="text-sm font-semibold uppercase text-neutral-500">Exercices</h5>
                    <div class="w-auto">
                        <button 
                        @click="setActive(true)"
                        class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                        >
                            Ajouter un exercice
                        </button>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                    <div class="w-auto">
                        <!-- <input 
                        v-model="filters.search"
                        class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" 
                        placeholder="Recherche..." autocomplete="off"> -->
                    </div>
                    <div class="w-auto gap-2 flex items-center justify-between">
                        <div class="flex gap-2 w-auto rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500  h-8 ">
                            <div class="w-auto px-1 block border-r border-gray-300 ">Par page</div>
                            <div class="w-auto flex items-center justify-center h-full">
                                <select v-model="filters.limit" class="w-full h-full bg-transparent border-none outline-none">
                                    <option 
                                    v-for="(item, index) in storeExercice?.exercices.page" :key="index"
                                    :value="item?.label">{{ item?.label }}</option>
                                    <!-- <option value="all">Tout</option> -->
                                </select>
                            </div>
                        </div>
                        <!-- <select class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
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
                        </button> -->
                    </div>
                </div>
            </div>
            <div class="w-full p-2">
                <ExerciceTableComponent :loading="loading" :data="storeExercice?.exercices.data" :setUpdate="setUpdate"/>
            </div>
           <ExerciceAddComponent
           :new-exercice="storeExercice.newExercice"
           :create-exercice="createExercice"
           :set-active="setActive"
           :is-active="isActive"
           :is-loading="storeExercice.isLoading"
           />
                
           <ExerciceUpdateComponent
           :update="storeExercice.updateExercice"
           :update-exercice="updateExercice"
           :set-active="setActiveUpdate"
           :is-active="isActiveUpdate"
           :is-loading="storeExercice.isLoading"
           />
        </div>
    </div>
    
</NuxtLayout>
    </div>
</template>


<style scoped>

</style>