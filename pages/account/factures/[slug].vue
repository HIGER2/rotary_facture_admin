
<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { usePaymentViewModel } from '~/stores/viewModels/paymentViewmodel';

const storeFacture = useFactureViewModel()

const handleListe = async () => {
    const route = useRoute()
    await storeFacture.findWithPaiement(route?.params?.slug) 
}


onMounted(() => {
    handleListe()
})



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
                    <FacturePaymentComponent
                    :payments="storeFacture.facture?.payments"
                    :facture="storeFacture.facture"
                    :handleListe="handleListe"
                    />
                   
            </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>