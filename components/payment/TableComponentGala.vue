
<script setup lang="ts">
import { GlobaleUploadCsv } from '#components';


interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()
const response = ref([])
const stats = ref()
const optionState =[
    {label:'total souscription', key:'totalSubscribedGalaMembers'},
    {label:'total souscription Membre', key:'totalAmountSubscribedGalaMembers'},
    {label:'total remboursement', key:'totalRefundAmountSubscribedGalaMembers'},
]
const loading = ref(true);

const columns = [
  { label: 'payment.tab2.colunm.memberType', key: 'memberType' },
  { label: 'payment.tab2.colunm.createdAt', key: 'createdAt' },
  { label: 'payment.tab2.colunm.subscriptionCode', key: 'subscriptionCode' },
  { label: 'payment.tab2.colunm.civility', key: 'civility' },
  { label: 'payment.tab2.colunm.title', key: 'title' },
  { label: 'payment.tab2.colunm.lastName', key: 'lastName' },
  { label: 'payment.tab2.colunm.firstName', key: 'firstName' },
  { label: 'payment.tab2.colunm.country', key: 'country' },
//   { label: 'payment.tab2.colunm.society', key: 'society' },
  { label: 'payment.tab2.colunm.districtFunction', key: 'districtFunction' },
  { label: 'payment.tab2.colunm.contributionLevel', key: 'contributionLevel' },
  { label: 'payment.tab2.colunm.email', key: 'email' },
  { label: 'payment.tab2.colunm.phoneNumber', key: 'phoneNumber' },
  { label: 'payment.tab2.colunm.rotaryClub', key: 'rotaryClub' },
  { label: 'payment.tab2.colunm.districtNumber', key: 'districtNumber' },
  { label: 'payment.tab2.colunm.transactionId', key: 'transactionId' },
  { label: 'payment.tab2.colunm.transRef', key: 'transRef' },
  { label: 'payment.tab2.colunm.paymentDate', key: 'paymentDate' },
  { label: 'payment.tab2.colunm.paymentMethod', key: 'paymentMethod' },
  { label: 'payment.tab2.colunm.amountHT', key: 'amountHT' },
  { label: 'payment.tab2.colunm.paidAmount', key: 'paidAmount' },
  { label: 'payment.tab2.colunm.fees', key: 'fees' },
  { label: 'payment.tab2.colunm.state', key: 'state' },
  { label: 'payment.tab2.colunm.guestNumber', key: 'guestNumber' },


//   { label: 'payment.tab2.colunm.uniqId', key: 'uniqId' },

//   { label: 'payment.tab2.colunm.nameOnBadge', key: 'nameOnBadge' },
//   { label: 'payment.tab2.colunm.classification', key: 'classification' },
//   { label: 'payment.tab2.colunm.rotaryClubFunction', key: 'rotaryClubFunction' },
//   { label: 'payment.tab2.colunm.districtFunction', key: 'districtFunction' },
//   { label: 'payment.tab2.colunm.dietaryPlan', key: 'dietaryPlan' },
 
//   { label: 'payment.tab2.colunm.clientUniqId', key: 'clientUniqId' },
//   { label: 'payment.tab2.colunm.clientEmail', key: 'clientEmail' },
//   { label: 'payment.tab2.colunm.message', key: 'message' },
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
    loading.value = true;
    const queryParams = new URLSearchParams({
        search: params.search || filters.search,
        status: params.status || filters.status,
        dateDebut: params.dateDebut || filters.dateDebut,
        dateFin: params.dateFin || filters.dateFin,
    });
    let data =  await useCustomFetch(`https://api.acd.district9101.org/public/api/v1.0/subscriptions/gala-members/success-payments?${queryParams.toString()}`)
    loading.value = false;
    response.value = data.data.data
    
    // .map((item) => ({
    //     uniqId: item?.uniqId,
    //     civility: item?.civility,
    //     title: item?.title,
    //     firstName: item?.firstName,
    //     lastName: item?.lastName,
    //     nameOnBadge: item?.nameOnBadge,
    //     email: item?.email,
    //     country: item?.country,
    //     phoneNumber: item?.phoneNumber,
    //     classification: item?.classification,
    //     rotaryClub: item?.rotaryClub,
    //     otherRotaryClub: item?.otherRotaryClub,
    //     rotaryClubFunction: item?.rotaryClubFunction,
    //     districtNumber: item?.districtNumber,
    //     otherDistrictNumber: item?.otherDistrictNumber,
    //     districtFunction: item?.districtFunction,
    //     contributionLevel: item?.contributionLevel,
    //     dietaryPlan: item?.dietaryPlan,
    //     guestNumber: item?.guestNumber,
    //     subscription: item?.subscription?.subscriptionCode || null,
    //     clientUniqId: item?.uniqId, // ou une autre valeur si différent
    //     clientEmail: item?.email,   // ou autre si différent
    //     subscriptionCode: item?.subscription?.subscriptionCode || null,
    //     paymentMethod: null, // Pas fourni dans l’API, à compléter si dispo
    //     paymentDate: item?.subscription?.createdAt || null,
    //     message: null, // Pas fourni dans l’API
    //     transactionId: null, // Pas fourni dans l’API
    //     state: null, // Peut-être à extraire de activities ? Sinon à compléter
    //     paidAmount: null, // Idem, à calculer à partir des activités si dispo
    //     paymentStatus: item?.activities?.[0]?.paymentStatus || null,
    //     createdAt: item?.createdAt,
    //     updatedAt: item?.updatedAt,
        
    //     TypeInscription	: item?.TypeInscription || null,
    //     dpo: item?.dpo || null,
    //     fees: item?.fees || null,
    //     amount: item?.amount || null,
    //     }));
    
}


const getStats=async(params={})=>{
    let data =  await useCustomFetch(`https://api.acd.district9101.org/public/api/v1.0/subscriptions/stats`)
    response.value = data.data.data

    stats.value = data.data.data
}


watch(filters, () => {
  let interval = setTimeout(async() => {
    getPayement();
   clearTimeout(interval)
     
  }, 400)
}, { deep: true });

onMounted(async () => {
    Promise.all([
        getPayement(),
        getStats()
    ]);
})
</script>

<template>
    <div>   
            <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-2 mb-5">
                    <template v-for="(item, index) in optionState" :key="index">
                        <div class="box">
                            <span class=" text-xs text-gray-500 font-medium">
                                {{ item.label}}
                            </span>
                            <h2 class="text-lg font-extrabold">{{stats && stats[item?.key]  }}</h2>
                        </div>
                    </template>
            </div>
            <div class="w-full flex items-center justify-between mb-3 ">
           
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
               lang
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