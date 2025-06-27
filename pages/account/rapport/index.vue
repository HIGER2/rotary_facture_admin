

<script setup lang="ts">
import { useExerciceViewModel } from '~/stores/viewModels/exerciceViewmodel';
import { useUserViewModel } from '~/stores/viewModels/userViewmodel';

const  userStore=useUserViewModel()
const storeExerice =useExerciceViewModel()

const filters = reactive({
  search: "",
  status: "",
});


definePageMeta({
  breadcrumb: 'navbar.bread.reports'
})
const columns = [
    { label: 'rapport.colunm.td1', key: 'name' },
    { label: 'rapport.colunm.td2', key: 'total_facture' },
    { label: 'rapport.colunm.td3', key: 'total_montant' },
    { label: 'rapport.colunm.td4', key: 'total_paye' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'rapport.colunm.td5', key: 'total_impaye' },
    { label: 'rapport.colunm.td6', key: 'total_en_cours' },
]


// const handExercice = async () => {
//     let response =await storeExerice.all()
//     storeExerice.optionExercice = [...response.data?.data.map((item:any,index) => (
//             {
//                 label : `${item?.begin_date} - ${item?.end_date}`,
//                 // label : `${item?.annee} : (du ${item?.begin_date} au ${item?.end_date})`,
//                 value : item?.id,
//             }
//         ))]
// }

const {formatNumber}=Utils()

const handleRapport =async (params:any={}) => {
const queryParams = new URLSearchParams({
    search: filters.search || '',
    status: filters.status || '',
});
await userStore.rapport(queryParams) 
const enCours = userStore?.rapports?.exercice?.find(e => e.status === 'en_cours');

console.log('enCours', enCours)
  if (enCours && !filters.status) {
    filters.status = enCours.value;
  }
}


watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
        await handleRapport(value);
        clearTimeout(interval);
        }, 400);
    },
    { deep: true }
);
onBeforeMount(async() => {
    handleRapport()
})
</script>

<template>
    <div>
        <NuxtLayout v-slot="{ userConnected }">
            <div class="w-full">
                    <div class="p-2">
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">
                            {{ $t('rapport.title') }}
                        </h5>
                    </div>
                    <!-- <pre>{{ userStore?.rapports?.exercice }}</pre> -->

                    <div class="w-auto gap-2 flex items-center justify-between my-4">
                        <div class="flex gap-2 w-auto rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500  h-8 ">
                            <div class="w-auto px-1 block border-r border-gray-300 ">
                                {{ $t('rapport.title_filter') }}
                            </div>
                            <div class="w-auto flex items-center justify-center h-full">
                                <select v-model="filters.status" class="w-full h-full bg-transparent border-none outline-none">
                                    <option 
                                    v-for="(item, index) in userStore?.rapports?.exercice" :key="index"
                                    :value="item?.value" :selected="item?.status=='en_cours'">{{ item?.label }}</option>
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
                    <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2 my-3">
                        <template v-for="(item, index) in userStore?.rapports?.analityc" :key="index">
                            <div class="box">
                                <span class="text-xs text-gray-500 font-medium">{{$t(item?.label) }}</span>
                                <h2 class="text-lg font-extrabold">{{formatNumber(item?.value) }}</h2>
                            </div>
                        </template>
                    </div>
                    <div class="w-full p-2">
                    <UiDynamicTable  :columns="columns" :data="userStore?.rapports.club">
                        <!-- <template #fac="{ item }">
                            <NuxtLink :to="`/account/factures/${item?.fac}`"
                            class="text-blue-500 hover:text-blue-700 hover:underline"
                            >{{ item?.fac}}</NuxtLink>
                        </template> -->
                    </UiDynamicTable>
            </div>
                </div>
        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>