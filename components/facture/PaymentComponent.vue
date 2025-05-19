
<script setup lang="ts">
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';

const storePayment = usePaymentViewModel()

const props = defineProps<{
    payments: any,
    facture: any,
    user:any,
    handleListe: ()=>void,
}>()

const isActive = ref(false)
const isActiveUpdate = ref(false)
const isActiveClub = ref(false)


const setActiveUpdate = (state:boolean) => {
    isActiveUpdate.value =state
}
const setActive = (state) => {
    isActive.value =state
}

const setActiveClub = (state) => {
    isActiveClub.value =state
}

const setUpdate = (item) => {
    // Object.assign(storePayment.newPayment, item) 
    storePayment.updatePayment.status = item?.status
    storePayment.updatePayment.mode_paiement = item?.mode_paiement
    storePayment.updatePayment.id = item?.id
    storePayment.updatePayment.amount = item?.amount
    setActiveUpdate(true)
}

const createPayment = async (item) => {
    await  storePayment.create(item),
    props.handleListe()
}



const processPayment = async (item) => {
    await Promise.all([
        storePayment.processePayment(item),
        props.handleListe()
    ])
}


const updatePayment = async () => {
    await Promise.all([
        storePayment.update(),
        props.handleListe()
    ])
}


const columns = {
    "admin":[
    { label: 'référence', key: 'reference' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'montant', key: 'amount' },
    { label: 'statut', key: 'status' },
    { label: 'mode paiement', key: 'mode_paiement' },
    { label: 'date', key: 'date' },
    { label: 'action', key: 'action'},
],
"club":[
    { label: 'référence', key: 'reference' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'montant', key: 'amount' },
    { label: 'statut', key: 'status' },
    { label: 'mode paiement', key: 'mode_paiement' },
    { label: 'date', key: 'date' },
]
}

const optionStatus = [
    { label: 'en attente', status:"en attente"},
    { label: 'payé', status:"payée"},
    { label: 'échec', status:"échec"},
    { label: 'annulé', status:"annulé"},
]


const optionMethode = [
    { label: 'espèces', status:"espèces"},
    { label: 'chèque', status:"chèque"},
    { label: 'mobile money', status:"mobile money"},
    { label: 'virement', status:"virement"},
    { label: 'carte', status:"carte"},
]

</script>

<template>
  <section class="mt-4">
        <div class="px-4 sm:px-0 flex items-center justify-between">
            <h3 class="text-base font-semibold leading-7 text-gray-900">Paiements</h3>
            <template v-if="user?.role=='admin'">
                <!-- <button 
                type="button"
                @click="setActive(true)"
                class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                    Nouveau paiement
                </button> -->
            </template>
            <template v-else>
                <button 
                type="button"
                @click="setActiveClub(true)"
                class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                  Effectué un paiement
                </button>
            </template>
        </div>
        <div class="mt-6 ">
            <UiDynamicTable  :columns="columns[user?.role]" :data="payments">
                <template #status="{ item }">
                    <PaymentStatus :status="item?.status" />
                </template>   
                    <template #action="{ item }">
                        <button 
                            type="button"
                            @click="setUpdate(item)"
                            class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                            flex items-center justify-center text-center 
                            rounded-full
                            border border-gray-200 text-gray-500 hover:text-gray-700
                            shadow
                            ">
                            <!-- <i class="uil uil-eye text-sm"></i> -->
                            <i class="uil uil-pen"></i>
                        </button>
                    </template>    
            </UiDynamicTable>
        </div>
        <FactureAddPaymentComponent
        :is-active="isActive"
        :set-active="setActive"
        :option-status="optionStatus"
        :newPayment="storePayment.newPayment"
        :option-methode="optionMethode"
        :createPayment="()=>createPayment(facture)"
        :is-loading="storePayment.isLoading"
        />

        <FactureAddPaymentClubComponent
        :is-active="isActiveClub"
        :set-active="setActiveClub"
        :paymentAmount="storePayment.paymentAmount"
        :processPayment="()=>processPayment(facture)"
        :is-loading="storePayment.isLoading"
        />

        <FactureUpdatePaymentComponent
        :is-active="isActiveUpdate"
        :set-active="setActiveUpdate"
        :option-status="optionStatus"
        :update="storePayment.updatePayment"
        :option-methode="optionMethode"
        :updatePayment="updatePayment"
        :is-loading="storePayment.isLoading"
        />
    </section>
</template>


<style scoped>

</style>