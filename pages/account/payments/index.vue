

<script setup lang="ts">
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';


const storePayments = usePaymentViewModel()
const loading=ref(false)


definePageMeta({
  breadcrumb: 'navbar.bread.payments'
})

const columns = [
    { label: 'payment.tab1.colunm.td1', key: 'reference' },
    { label: 'payment.tab1.colunm.td2', key: 'club' },
    { label: 'payment.tab1.colunm.td3', key: 'fac' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'payment.tab1.colunm.td4', key: 'amount' },
    { label: 'payment.tab1.colunm.td5', key: 'status' },
    { label: 'payment.tab1.colunm.td6', key: 'mode_paiement' },
    { label: 'payment.tab1.colunm.td7', key: 'date' },
]

const isActive=ref(1)

const filters = reactive({
    search: "",
    status: "",
});
const {formatNumber}=Utils()

const setTabs=(state:number)=>{
    isActive.value =state
}
const handleListe =async (params:any={}) => {

    if (storePayments?.payments?.length == 0) {
        loading.value = true
    }
    const queryParams = new URLSearchParams({
        search: filters.search || '',
        status: params.status || '',
    });

    await storePayments.all(queryParams) 
    loading.value = false
}

watch(
  filters,
    (value:any) => {
        let interval = setTimeout(async () => {
        loading.value = true
        storePayments.payments = []
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
            <!-- {{ storePayments?.payments[0] }} -->
            <div class="w-full p-2">
                <div class="w-full">
                    <div class="w-full flex items-center justify-between mb-5">
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">
                            {{ $t('payment.title') }}
                        </h5>
                        <!-- <div class="w-auto">
                            <NuxtLink 
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                            to="factures/create"
                            >
                                Nouveau paiement
                            </NuxtLink>
                        </div> -->
                    </div>
                </div>
                <template v-if="userConnected?.role !=='club'">
                    <PaymentButtonTabsComponent :setTabs="setTabs" :is-active="isActive"/>
                </template>

                <template v-if="isActive ==1">
                    
                    <div class="w-full grid grid-cols-1 md:grid-cols-5 gap-4 p-2 mb-5">
                        <template v-for="(item, index) in storePayments?.analityc" :key="index">
                            <div class="box">
                                <span class=" text-xs text-gray-500 font-medium">
                                    {{ $t(item.label) }}
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
                            :placeholder="`${$t('placeholder_search')}...`" autocomplete="off">
                        </div>
                        <div class="w-auto gap-2 flex items-center justify-between">
                            <select 
                            v-model="filters.status"
                            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                                <option value="">{{$t('payment.tab1.filter.x1') }}</option>
                                <option value="1">{{$t('payment.tab1.filter.x2') }}</option>
                                <option value="2">{{$t('payment.tab1.filter.x3') }}</option>
                                <option value="3">{{$t('payment.tab1.filter.x4') }}</option>
                            </select>
                            <GlobaleUploadCsv
                            :data="storePayments?.payments"
                            :colunm="columns"
                            lang
                            />
                        </div>
                    </div>
                    <div class="w-full p-2">
                        <PaymentTableComponent :loading="loading" :data="storePayments?.payments"/>
                        <!-- <UiDynamicTable  :columns="columns" :data="storePayments?.payments">
                            <template #fac="{ item }">
                                <NuxtLink :to="`/account/factures/${item?.fac}`"
                                class="text-blue-500 hover:text-blue-700 hover:underline"
                                >{{ item?.fac}}</NuxtLink>
                            </template>
                        </UiDynamicTable> -->
                    </div>  
                </template>
                <template v-else-if="isActive ==2">
                    <PaymentTableComponentGala :loading="loading" :data="storePayments?.payments"/>
                </template>
                <template v-else> 
                    <PaymentTableComponentAcd :loading="loading" :data="storePayments?.payments"/>
                </template>
            </div>
        </div>
        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>