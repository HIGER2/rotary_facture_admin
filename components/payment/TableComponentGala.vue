
<script setup lang="ts">
import { GlobaleUploadCsv } from '#components';


interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()
const response = ref([])

const columns = [
    { label: 'Nom', key: 'firstName' },
    { label: 'Prénoms', key: 'lastName' },
    { label: 'Nom de badge', key: 'nameOnBadge' },
    { label: 'Téléphone', key: 'phoneNumber' },
    { label: 'Email', key: 'clientEmail' },

    // { label: 'montant à regler', key: 'club' },
    // { label: 'Pays', key: 'country' },
    { label: 'Club', key: 'rotaryClub' },
    // { label: 'Date arrivé', key: 'arrivalDate' },
    // { label: 'Date départ', key: 'departureDate' },
    // { label: 'Mode transport', key: 'transportationMode' },
    { label: 'Invité', key: 'guestNumber' },
    { label: 'Methode de paiement', key: 'paymentMethod' },
    { label: 'Date Paiement', key: 'paymentDate' },
    { label: 'Status', key: 'state' },
    { label: 'Amount', key: 'paidAmount' },
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
    let data =  await useCustomFetch(`https://api.acd.district9101.org/public/api/v1.0/subscriptions/gala-members/success-payments?${queryParams.toString()}`)
    response.value = data.data.data
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
        <div class="w-full flex items-center justify-between mb-3 ">
            <div class="w-full  gap-2 flex items-center justify-end  mb-4">
                <select 
                v-model="filters.status"
                class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                    <option value="">Tout</option>
                    <option value="PENDING">En attente</option>
                    <option value="SUCCESSFUL">Succès</option>
                    <option value="FAILED">Échoué</option>
                </select>

                <div class="w-auto">
                <input 
                v-model="filters.search"
                class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[150px]"
                placeholder="Recherche paiement..." autocomplete="off">
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
               />
            </div>
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
</template>


<style scoped>

</style>