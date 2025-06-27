
<script setup lang="ts">
import { FactureRubriqueComponent } from '#components';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';
import { FactureStatus ,FactureStatusPayment} from '#components';

const storeFacture = useFactureViewModel()
const storePayment = usePaymentViewModel()
const route = useRoute()
const router = useRouter()
const isActive=ref(false)
const loading = ref(false)
const openPayment = ref(false)

const {formatNumber}=Utils()

definePageMeta({
  breadcrumb: [
    {label:'Factures à payer',path:"/account/factures/club/invoice-unpaid"},
    {label:'Détail facture',path:null}
  ]
})
const handleListe = async () => {
    loading.value = true
    await storeFacture.findWithPaiement(route?.params?.slug) 
    loading.value = false
}


const setActiveClub = (state) => {
    if (!state) {
        storePayment.resetPaymentAmount()
    }
    openPayment.value =state
}
const sendFacture = async (reference) => {
    await storeFacture.sendFacture(reference) 
    await handleListe() 
}
const isTabs = ref(1)

const setTabs= (state)=>{
    isTabs.value= state
}

const checkPayment = async (token) => {
    isActive.value=true
    await storePayment.checkPayment({TransactionToken:token}) 
    await handleListe() 
    router.replace({ query: {} })
    isActive.value=false
}

const factureDetails ={
    left :[
    { label: "facture.detail.label1", key: "reference" },
    { label: "facture.detail.label9", key: "objet" },
    { label: "facture.detail.label2", key: "total_rubrique" },
    { label: "facture.detail.label3", key:"total_quantity" },
    { label: "facture.detail.label4", key: "amount" },
    { label: "facture.detail.label5", key: "amount_pay" },
    { label: "facture.detail.label6", key: "remaining_amount" },
    { label: "facture.detail.label12", key:"date_echeance" },

    ],
    right:[
 
  { label: "facture.detail.label7", key: "status", isComponent: FactureStatus },
  { label: "facture.detail.label8", key: "status_payment", isComponent: FactureStatusPayment },
  { label: "facture.detail.label9", key: "objet" },
  { label: "facture.detail.label10", key: "club.name" },
  { label: "facture.detail.label11", key: "date_emission" },
]
}


function getNestedValue(obj: any, path: string): any {
    // console.log(obj);
    // console.log(path.split('.').reduce((acc, part) => acc?.[part], obj));
    
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const showValue = (key: any,data) => {
    switch (key) {
        case 'date_emission':
        case 'date_echeance':
            return formatDate(getNestedValue(data, key));
        case 'amount':
        case 'amount_pay':
        case 'remaining_amount':
        case 'total_quantity':
            return formatNumber(getNestedValue(data, key));
        default:
            return getNestedValue(data, key) || 'N/A';
    }

}

const processPayment = async (item) => {
    await  storePayment.processePayment(item)
}

// const FacturePaymentComponent = defineAsyncComponent(() => import('#components/facture/FacturePaymentComponent.vue'))

onMounted(() => {
    handleListe() 
    if (Object.keys(route.query).length > 0 && route.query?.TransactionToken) {
        checkPayment(route.query?.TransactionToken) 
    }
})



</script>



<template>
    <div>
        <NuxtLayout v-slot="{ userConnected }">
            <!-- <pre>{{ storeFacture.facture?.payments }}</pre> -->
            <template v-if="loading">
                <UiLoader/>
            </template>
            <template v-else>
                <div class="w-full p-2">
                <section class="w-full ">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-base font-semibold leading-7 text-gray-900">
                            {{ $t('facture.detail.title') }}
                        </h3>
                        <div class="flex items-center justify-between">
                            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                {{ $t('facture.detail.desc') }}
                            </p>
                            <!-- {{ userConnected?.role }} -->
                            <button 
                                type="button"
                                @click="setActiveClub(true)"
                                class=" cursor-pointer items-center bg-primary justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none text-xs disabled:opacity-50 bg-pri text-slate-50 shadow  px-4 py-3 self-start"
                                >
                                    {{ $t('facture.detail.btn_payment') }}
                                </button>
                        </div>
                    </div>
                    <div class="w-full flex gap-3 items-center">
                    <div class="w-full mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="divide-y divide-gray-100">
                            <div
                                    v-for="(item, index) in factureDetails.left"
                                    :key="index"
                                    class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                    >
                                    <div class="text-sm font-medium leading-6 text-gray-900">
                                        {{ $t(item.label) }}
                                    </div>
                                    <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <component
                                        v-if="item.isComponent"
                                        :is="item.isComponent"
                                        :status="getNestedValue(storeFacture.facture, item.key) || 'N/A'"
                                        />
                                        <span v-else>
                                            {{ 
                                            showValue(item.key,storeFacture.facture) || 'N/A'
                                            }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

              
              <div class="w-full">
                     <FactureRubriqueComponent
                    :user="userConnected"
                    :rubriques="storeFacture.facture?.rubriques"
                    :facture="storeFacture.facture"
                    />
              </div>
            </div>
            </template>
            <FactureAddPaymentClubComponent
            :is-active="openPayment"
            :set-active="setActiveClub"
            :paymentAmount="storePayment.paymentAmount"
            :processPayment="()=>processPayment(storeFacture.facture)"
            :is-loading="storePayment.isLoading"
            />
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>