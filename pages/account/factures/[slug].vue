
<script setup lang="ts">
import { FactureRubriqueComponent } from '#components';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';

const storeFacture = useFactureViewModel()
const storePayment = usePaymentViewModel()
const route = useRoute()
const router = useRouter()
const isActive=ref(false)
const loading = ref(false)

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
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Général</h3>
                        <div class="flex items-center justify-between">
                            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Détail de la facture</p>
                            <template v-if="storeFacture.facture?.status === 'brouillon' && userConnected?.role !== 'club'">
                                <UiButtonSubmit
                                @click="sendFacture(storeFacture.facture?.reference)"
                                type="button"
                                class="max-w-max"
                                label="Envoyer la facture" :isLoading="storeFacture.isLoading"/>
                            </template>
                        </div>
                    </div>
                    <div class="mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    N°Facture
                                </div>
                                <!-- {{ storeFacture.facture }} -->
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.reference }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Total rubrique
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {{ storeFacture.facture?.total_rubrique }}
                                </div>
                            </div>
                            
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Total quantité
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {{ storeFacture.facture?.total_quantity }}
                                </div>
                            </div>

                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Montant total
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {{ storeFacture.facture?.amount }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Montant payé
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {{ storeFacture.facture?.amount_pay }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Reste à payer
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.remaining_amount }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                    Type
                                </dt>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <FactureType :status="storeFacture.facture?.type"/>
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                    Statut
                                </dt>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <FactureStatus :status="storeFacture.facture?.status"/>
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.objet }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Club
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.club?.name }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    Date 
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.date_emission }}
                                </div>
                            </div>
                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div class="text-sm font-medium leading-6 text-gray-900">
                                    date échéance
                                </div>
                                <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ storeFacture.facture?.date_echeance }}
                                </div>
                            </div>
                        </dl>
                    </div>
                </section>

                <div 
                class="inline-flex my-5 cursor-pointer h-10 items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400" tabindex="0" data-orientation="horizontal" style="outline: none;">
                    <button @click="setTabs(1)" type="button" :data-state="isTabs == 1 && 'active'" class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                        Paiements
                    </button>
                    <button @click="setTabs(2)" :data-state="isTabs == 2 && 'active'" type="button"   class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50" tabindex="0" data-orientation="horizontal" data-radix-collection-item="">
                        Rubriques
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