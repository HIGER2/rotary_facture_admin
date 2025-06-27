
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
const {formatNumber}=Utils()

definePageMeta({
  breadcrumb: [
    {label:'Factures',path:"/account/factures"},
    {label:'Détail facture',path:null}
  ]
})
const handleListe = async () => {
    // loading.value = true
    await storeFacture.findWithPaiement(route?.params?.slug) 
    loading.value = false
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
    { label: "facture.detail.label2", key: "total_rubrique" },
    { label: "facture.detail.label3", key:"total_quantity" },
    { label: "facture.detail.label4", key: "amount" },
    { label: "facture.detail.label5", key: "amount_pay" },
    { label: "facture.detail.label6", key: "remaining_amount" },
    ],
    right:[
 
  { label: "facture.detail.label7", key: "status", isComponent: FactureStatus },
  { label: "facture.detail.label8", key: "status_payment", isComponent: FactureStatusPayment },
  { label: "facture.detail.label9", key: "objet" },
  { label: "facture.detail.label10", key: "club.name" },
  { label: "facture.detail.label11", key: "date_emission" },
  { label: "facture.detail.label12", key:"date_echeance" },
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
                            <template v-if="userConnected?.role !== 'club'">
                                <UiButtonSubmit
                                @click="sendFacture(storeFacture.facture?.reference)"
                                type="button"
                                class="max-w-max"
                                label="Envoyer la facture" :isLoading="storeFacture.isLoading"/>
                            </template>
                        </div>
                    </div>
                    <div class="w-full flex gap-3 ">
                    <div class="w-full mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="divide-y divide-gray-100">
                            <div
                                    v-for="(item, index) in factureDetails.left"
                                    :key="index"
                                    class="px-4 py-[7px] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
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
                    <div class="w-full mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="divide-y divide-gray-100">
                            <div
                                    v-for="(item, index) in factureDetails.right"
                                    :key="index"
                                    class="px-4 py-[7px] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
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
                                        {{ showValue(item.key,storeFacture.facture) || 'N/A' }}
                                        </span>
                                    </div>
                                    </div>
                        </div>
                    </div>
                    </div>
                </section>

                <div 
                class="inline-flex my-5 cursor-pointer h-10 items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 " tabindex="0" data-orientation="horizontal" style="outline: none;">
                    <button @click="setTabs(1)" type="button" :data-state="isTabs == 1 && 'active'" class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow  dark:focus-visible:ring-slate-300 " tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                        {{ $t('facture.detail.tab.tab1') }}
                    </button>
                    <button @click="setTabs(2)" :data-state="isTabs == 2 && 'active'" type="button"   class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow  dark:focus-visible:ring-slate-300 " tabindex="0" data-orientation="horizontal" data-radix-collection-item="">
                        {{ $t('facture.detail.tab.tab2') }}
                    </button>
            </div>
                <template v-if="isTabs == 1 ">
                    <FacturePaymentComponent
                    :user="userConnected"
                    :payments="storeFacture.facture?.payments"
                    :facture="storeFacture.facture"
                    :handleListe="handleListe"
                    />
                </template>
                <template v-else-if="isTabs == 2">
                    <FactureRubriqueComponent
                    :user="userConnected"
                    :rubriques="storeFacture.facture?.rubriques"
                    :facture="storeFacture.facture"
                    />
                </template>
                <FactureCheckPaymentComponent
                    :isActive="isActive"
                /> 
            </div>
            </template>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>