

<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel'


const storeFacture = useFactureViewModel()
const loading=ref(false)
const {formatNumber}=Utils()
const factures = ref([])
definePageMeta({
  breadcrumb: 'navbar.bread.invoices_paid'
})
const filters = reactive({
  search: "",
  status: "",
});



const handleListe =async (params:any={}) => {

    if (factures.value.length == 0) {
        loading.value = true
    }
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        status: params.status || '',
        statusPayment: JSON.stringify(['payeé']),
    });
    factures.value = await storeFacture.all(queryParams) 
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
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">
                            {{ $t('facture.title') }}
                        </h5>
                        <template v-if="userConnected?.role !== 'club'">
                            <div class="w-auto">
                                <NuxtLink 
                                class="inline-flex items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none text-xs disabled:opacity-50 bg-primary text-slate-50 shadow  px-4 py-3 self-start"
                                to="/account/factures/create"
                                >
                                {{ $t('facture.button') }}
                                </NuxtLink>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2 mb-5">
                    <template v-for="(item, index) in storeFacture?.analityc" :key="index">
                        <div class="box">
                            <span class=" text-xs text-gray-500 font-medium">
                                {{$t(item?.label) }}
                            </span>
                            <h2 class="text-lg font-extrabold">{{formatNumber(item?.value) }}</h2>
                        </div>
                    </template>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                        <div class="w-auto">
                            <input 
                            v-model="filters.search"
                            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" 
                            :placeholder="$t('placeholder_search')"  autocomplete="off">
                        </div>
                        <div class="w-auto gap-2 flex items-center justify-between">
                            <select v-model="filters.status" class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                                <option value="" >{{ $t('facture.filter.x1') }}</option>
                                <option value="brouillon">{{ $t('facture.filter.x3') }}</option>
                                <option value="courante">{{ $t('facture.filter.x2') }}</option>
                                <option value="arriere">{{ $t('facture.filter.x4') }}</option>
                                <!-- <option value="annulée">{{ $t('facture.filter.x5') }}</option> -->
                                <!-- <option value="partiellement_payé">{{ $t('facture.filter.x6') }}</option> -->
                                <!-- <option value="arriérée">{{ $t('facture.filter.x7') }}</option> -->
                            </select>
                            <GlobaleUploadCsv
                            :data="storeFacture?.factures"
                            :colunm="storeFacture.columns[userConnected?.role]"
                            lang
                            />
                        </div>
                </div>
                <div class="w-full">
                   
                    <FactureTableComponent type="invoice_paid" :columns="storeFacture.columns" :loading="loading" :user="userConnected" :data="factures"/>
                </div>
            </div>
        </div>
        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>