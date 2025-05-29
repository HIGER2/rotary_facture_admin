
<script setup lang="ts">

interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()
const response = ref([])
const columns = [
    { label: 'payment.tab3.colunm.td1', key: 'firstName' },
    { label: 'payment.tab3.colunm.td2', key: 'lastName' },
    { label: 'payment.tab3.colunm.td3', key: 'nameOnBadge' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'payment.tab3.colunm.td4', key: 'country' },
    { label: 'payment.tab3.colunm.td5', key: 'rotaryClub' },
    { label: 'payment.tab3.colunm.td6', key: 'phoneNumber' },
    { label: 'payment.tab3.colunm.td7', key: 'arrivalDate' },
    { label: 'payment.tab3.colunm.td8', key: 'departureDate' },
    { label: 'payment.tab3.colunm.td9', key: 'transportationMode' },
    { label: 'payment.tab3.colunm.td10', key: 'guestNumber' },
    { label: 'payment.tab3.colunm.td11', key: 'paymentMethod' },
    { label: 'payment.tab3.colunm.td12', key: 'paymentDate' },
    { label: 'payment.tab3.colunm.td13', key: 'state' },
    { label: 'payment.tab3.colunm.td14', key: 'paidAmount' },
]


const filters = reactive({
    // rotaryClubName: '',
    // clientEmail: '',
    // subscriptionCode: '',
    // paymentMethod: '',
    status: '',
    search: '',
    dateDebut:"" ,
    dateFin: "",
});
const getPayement=async(params={})=>{
    const queryParams = new URLSearchParams({
        search: params.search || filters.search,
        status: params.status || filters.status,
        dateDebut: params.dateDebut || filters.dateDebut,
        dateFin: params.dateFin || filters.dateFin,
    });
    let data =  await useCustomFetch(`https://api.acd.district9101.org/public/api/v1.0/subscriptions/acd-members/success-payments?${queryParams.toString()}`)
    response.value = data.data.data
    console.log(response.value);
    
}


watch(filters, () => {
  let interval = setTimeout(async() => {
    getPayement();
   clearTimeout(interval)
     
  }, 400)
}, { deep: true });


onMounted(async () => {
     getPayement()
})
</script>

<template>
    <div>
       <div class="w-full">
        <div class="w-full  gap-2 flex items-center justify-end  mb-4">
            <select 
            v-model="filters.status"
            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                <option value="">{{ $t('payment.tab2.filter.x1') }}</option>
                <option value="PENDING">{{ $t('payment.tab2.filter.x2') }}</option>
                <option value="SUCCESSFUL">{{ $t('payment.tab2.filter.x3') }}</option>
                <option value="FAILED">{{ $t('payment.tab2.filter.x4') }}</option>
            </select>

            <div class="w-auto">
            <input 
            v-model="filters.search"
            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[150px]"
            :placeholder="`${$t('placeholder_search')}...`"
            autocomplete="off">
            </div>

            <div class="flex items-center gap-2">
            <input 
            v-model="filters.dateDebut"
            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[150px]"
            type="date">
            <input 
            v-model="filters.dateFin"
            class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[150px]"
            type="date">
            </div>
            <GlobaleUploadCsv
               :data="response"
                :colunm="columns"
                lang
               />
        </div>
        <UiDynamicTable :loading="loading"  :columns="columns" :data="response">
            <template #fac="{ item }">
                <NuxtLink :to="`/account/factures/${item?.fac}`"
                class="text-blue-500 hover:text-blue-700 hover:underline"
                >{{ item?.fac}}</NuxtLink>
            </template>
            <template #status="{ item }">
               <PaymentStatus :status="item?.status" />
            </template>
        </UiDynamicTable>
       </div>
    </div>
</template>


<style scoped>

</style>