
<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';

const storeFacture = useFactureViewModel()
const storePayment = usePaymentViewModel()

const isActive = ref(false)
const setActive = (state) => {
    isActive.value =state
}

const handleListe =async () => {
    const route = useRoute()
    await storeFacture.findWithPaiement(route?.params?.slug) 
}

const createPayment = async (item) => {
    await storePayment.create(item) 
    await handleListe()
}

onMounted(() => {
    handleListe()
})

const columns = [
    { label: 'référence', key: 'reference' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'montant', key: 'amount' },
    { label: 'statut', key: 'status' },
    { label: 'mode paiement', key: 'mode_paiement' },
    { label: 'date', key: 'date' },
]

const optionStatus = [
    { label: 'en attente', status:"en attente"},
    { label: 'payée', status:"payée"},
    { label: 'annulée', status:"annulée"},
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
    <div>
        <NuxtLayout>
            <!-- <pre>{{ storeFacture.facture?.payments }}</pre> -->
            <div class="w-full p-2">
                    <section class="w-full ">
                        <div class="px-4 sm:px-0">
                            <h3 class="text-base font-semibold leading-7 text-gray-900">Général</h3>
                            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Détail de la facture</p>
                        </div>
                        <div class="mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                            <dl class="divide-y divide-gray-100">
                                <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <div class="text-sm font-medium leading-6 text-gray-900">
                                        N°Facture
                                    </div>
                                    <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {{ storeFacture.facture?.reference }}
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
                                        Montant
                                    </div>
                                    <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                         {{ storeFacture.facture?.amount }}
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
                                        Statut
                                    </dt>
                                    <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div class="inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 dark:text-slate-50 bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                            {{ storeFacture.facture?.status }}
                                        </div>
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
                                       	Date émission
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
                    <section class="mt-4">
                        <div class="px-4 sm:px-0 flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-7 text-gray-900">Paiements</h3>
                            <button 
                            type="button"
                            @click="setActive(true)"
                            class=" cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                            >
                                Nouveau paiement
                            </button>
                        </div>
                        <div class="mt-6 ">
                            <UiDynamicTable :rowClick="()=>navigateTo('/factures/2')" :columns="columns" :data="storeFacture.facture?.payments"/>
                        </div>
                    </section>
                    <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
                            <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                                    <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                                        <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                                            Nouveau paiement
                                        </h2>
                                    </div>
                                    <form class="space-y-8" @submit.prevent="createPayment(storeFacture.facture)">
                                    <div class="space-y-2 mb-4 flex gap-2">
                                        <UiFormSelect 
                                            required
                                            label="Statut"
                                            v-model="storePayment.newPayment.status"
                                            :options="optionStatus" 
                                            placeholder="Statut" name="title" />

                                            <UiFormSelect 
                                            required
                                            v-model="storePayment.newPayment.mode_paiement"
                                            :options="optionMethode" label="Mode de paiement" 
                                            placeholder="mode paiement" name="title" />
                                        </div>
                                        <div class="space-y-2 mb-4">
                                            <UiFormInput 
                                            required
                                            v-model="storePayment.newPayment.amount"
                                            min="1"
                                            type="number" label="Montant" placeholder="Montant" name="title" />
                                        </div>
                                        
                                        <UiButtonSubmit label="Créer" :isLoading="storePayment.isLoading"/>
                                    </form>
                            </div>
                      
                    </UiModal>
            </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>