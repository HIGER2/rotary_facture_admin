
<script setup lang="ts">
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';

const storePayment = usePaymentViewModel()

const props = defineProps<{
    rubriques: any,
    facture: any,
    user:any,
}>()

const {formatNumber}=Utils()

const getPriority=(item)=>{
    return item.priority == 'low' ? 'faible' :
            item.priority == 'medium' ? 'moyenne' :
            item.priority == 'high' && 'élevé' 
}
const columns = {
    "admin":[
    { label: 'libélé', key: 'libele' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'prix', key: 'price' },
    { label: 'quantité', key: 'quantity' },
    { label: 'montant total', key: 'total_amount' },
    { label: 'Montant payé', key: 'amount_pay' },
    { label: 'Reste à payer', key: 'remaining_amount' },
    { label: 'Reste à payer', key: 'remaining_amount' },
    { label: 'priorité', key: 'priority' },

    
    // { label: 'mode paiement', key: 'mode_paiement' },
    // { label: 'date', key: 'date' },
    // { label: 'action', key: 'action'},
],
"super_admin":[
    { label: 'libélé', key: 'libele' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'prix', key: 'price' },
    { label: 'quantité', key: 'quantity' },
    { label: 'montant total', key: 'total_amount' },
    { label: 'Montant payé', key: 'amount_pay' },
    { label: 'Reste à payer', key: 'remaining_amount' },
    { label: 'priorité', key: 'priority' },

    
],
"club":[
    { label: 'libélé', key: 'libele' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'prix', key: 'price' },
    { label: 'quantité', key: 'quantity' },
    { label: 'montant total', key: 'total_amount' },
]
}


</script>

<template>
  <section class="mt-4">
        <div class="px-4 sm:px-0 flex items-center justify-between">
            <!-- <pre>{{ rubriques }}</pre> -->
            <h3 class="text-base font-semibold leading-7 text-gray-900">Rubriques</h3>
            <!-- <template v-if="user?.role=='admin'">
                <button 
                type="button"
                @click="setActive(true)"
                class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                    Nouveau paiement
                </button>
            </template>
            <template v-else>
                <button 
                type="button"
                @click="setActiveClub(true)"
                class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                  Effectué un paiement
                </button>
            </template> -->
        </div>
        <div class="mt-6 ">
            <UiDynamicTable  :columns="columns[user?.role]" :data="rubriques">
                    <template #price="{ item }">
                       <span>{{ formatNumber(item.price) }}</span>
                    </template>  
                      <template #quantity="{ item }">
                       <span>{{ formatNumber(item.quantity) }}</span>
                    </template>  
                      <template #total_amount="{ item }">
                       <span>{{ formatNumber(item.total_amount) }}</span>
                    </template>   
                     <template #amount_pay="{ item }">
                       <span>{{ formatNumber(item.amount_pay) }}</span>
                    </template>   
                    <template #remaining_amount="{ item }">
                       <span>{{ formatNumber(item.amount_pay) }}</span>
                    </template>   
                     <template #priority="{ item }">
                       <span>{{ getPriority(item) }}</span>
                    </template>   
                    <!-- <template #action="{ item }">
                        <button 
                            type="button"
                            @click="setUpdate(item)"
                            class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                            flex items-center justify-center text-center 
                            rounded-full
                            border border-gray-200 text-gray-500 hover:text-gray-700
                            shadow
                            ">
                            <i class="uil uil-eye text-sm"></i>
                            <i class="uil uil-pen"></i>
                        </button>
                    </template>     -->


            </UiDynamicTable>
        </div>
        <!-- <FactureAddPaymentComponent
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
        /> -->
    </section>
</template>


<style scoped>

</style>