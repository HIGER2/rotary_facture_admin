

<script setup lang="ts">
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import country from "~/jsons/country.json"



definePageMeta({
  breadcrumb: 'navbar.bread.clubs'
})
const storeClub = useClubViewModel()
const loading=ref(false)

const filters = reactive({
  search: "",
  status: "",
  limit: "1",
});


const columns = [
    { label: '#', key: 'id' },
    { label: 'colunm_club.td1', key: 'name' },
    { label: 'colunm_club.td2', key: 'country' },
    { label: 'colunm_club.td3', key: 'language' },
    { label: 'colunm_club.td4', key: 'action' },
]



const isActive = ref(false)
const isActiveUpdate = ref(false)

const setActive = (state:boolean) => {
    isActive.value =state
}

const setActiveUpdate = (state:boolean) => {
    isActiveUpdate.value =state
}


const setUpdate = (item:any) => {
    // Object.assign(storeClub.updateClub, item) 
    storeClub.updateClub.country_id = item?.country_id
    storeClub.updateClub.status = item?.status
    storeClub.updateClub.id = item?.id
    storeClub.updateClub.name = item?.name

    console.log(item);
    
    setActiveUpdate(true)
}

const createClub = async () => {
    await storeClub.create()
    await handleListe()
    // setActive(false) 
}


const updateClub = async () => {
    await storeClub.update()
    await handleListe()
    // setActive(false) 
}

const handleListe =async (params:any={}) => {
    if (storeClub?.clubs?.data?.length == 0) {
        loading.value = true
    }
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        page: filters.limit || '',
        status: params.status || '',
    });

    await storeClub.allByFilter(queryParams) 
    loading.value = false
}

watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
        loading.value = true
        storeClub.clubs.data = []
        await handleListe(value);
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
                    <h5 class="text-sm font-semibold uppercase text-neutral-500">
                        {{ $t("club.title") }}
                    </h5>
                    <div class="w-auto">
                        <nuxt-link 
                        class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors e text-xs disabled:opacity-50 bg-primary text-slate-50 shadow   px-4 py-3 self-start"
                        to="/account/clubs/create">
                            {{ $t("club.button") }}
                        </nuxt-link>
                            <!-- <button 
                            @click="setActive(true)"
                            class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                            >
                            {{ $t("club.button") }}
                            </button> -->
                        
                    </div>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                    <div class="w-auto">
                        <input 
                        v-model="filters.search"
                        class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" 
                        :placeholder="`${$t('placeholder_search')}...`" autocomplete="off">
                    </div>
                    <div class="w-auto gap-2 flex items-center justify-between">
                        <div class="flex gap-2 w-auto rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500  h-8 ">
                            <div class="w-auto px-1 block border-r border-gray-300 ">{{ $t('filter_page') }}</div>
                            <div class="w-auto flex items-center justify-center h-full">
                                <select v-model="filters.limit" class="w-full h-full bg-transparent border-none outline-none">
                                    <option 
                                    v-for="(item, index) in storeClub?.clubs.page" :key="index"
                                    :value="item?.label">{{ item?.label }}</option>
                                    <!-- <option value="all">Tout</option> -->
                                </select>
                            </div>
                        </div>
                        <GlobaleUploadCsv
                        :data="storeClub?.clubs.data"
                            :colunm="columns"
                            lang
                        />
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
                <ClubTableComponent :loading="loading" :columns="columns" :data="storeClub?.clubs.data" :setUpdate="setUpdate"/>
            </div>
           <ClubAddClubComponent
           :new-club="storeClub.newClub"
           :create-club="createClub"
           :set-active="setActive"
           :is-active="isActive"
           :is-loading="storeClub.isLoading"
           />

           <ClubUpdateClubComponent
           :update="storeClub.updateClub"
           :update-club="updateClub"
           :set-active="setActiveUpdate"
           :is-active="isActiveUpdate"
           :is-loading="storeClub.isLoading"
           />
        </div>
    </div>
    
</NuxtLayout>
    </div>
</template>


<style scoped>

</style>