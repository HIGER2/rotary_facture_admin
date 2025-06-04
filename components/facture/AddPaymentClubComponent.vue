
<script setup lang="ts">

const props = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    processPayment: (item:any)=>void,
    isLoading: boolean,
    paymentAmount: any,
}>()

function calculerPaiement(montantNetSouhaite, tauxCommission) {
    if (tauxCommission >= 100) {
        return {
            montant_brut: 0,
            montant_frais: 0,
            montant_net: 0,
            status: false,
            message: 'Le taux de commission ne peut pas être supérieur ou égal à 100%',
        };
    }

    const taux = 1 - (tauxCommission / 100);
    const montantBrut = Math.ceil(montantNetSouhaite / taux);
    const montantFrais = montantBrut - montantNetSouhaite;
    const montantNet = montantBrut - montantFrais; // identique à montantNetSouhaite

    return {
        montant_brut: montantBrut,
        montant_frais: montantFrais,
        montant_net: montantNet,
        status: true,
        message: 'Calcul effectué avec succès',
    };
}

const frais = computed(() => {
    let tauxCommission = 0; // taux de commission par défaut
    if (props.paymentAmount.mode_paiement === 'mobile_money') {
        tauxCommission = 2.5; // 5% pour Mobile Money
    } else if (props.paymentAmount.mode_paiement === 'credit_card') {
        tauxCommission = 3.5; // 3% pour Carte de Crédit
    }
    return calculerPaiement(props.paymentAmount.amount,tauxCommission)['montant_frais']; 
});


const paidAmount = computed(() => {
    let tauxCommission = 0; // taux de commission par défaut
    if (props.paymentAmount.mode_paiement === 'mobile_money') {
        tauxCommission = 2.5; // 5% pour Mobile Money
    } else if (props.paymentAmount.mode_paiement === 'credit_card') {
        tauxCommission = 3.5; // 3% pour Carte de Crédit
    }
    return calculerPaiement(props.paymentAmount.amount, tauxCommission)['montant_brut']; 
});

</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
                <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                              {{ $t('facture.detail.payment_form.title_new') }}
                            </h2>
                        </div>
                        <form class="space-y-8" @submit.prevent="processPayment">
                            <div class="space-y-2 mb-4">
                                <UiFormInput 
                                required
                                v-model="paymentAmount.amount"
                                min="100"
                                type="number" 
                                :label="$t('facture.detail.payment_form.label1')" 
                                :placeholder="$t('facture.detail.payment_form.label1')" name="title" />
                            </div>
                            <div class="w-full">
                                <h3 class="mb-3">Moyen de paiement</h3>
                                <div class="w-full flex gap-4 items-center">
                                    <div class="flex items-center cursor-pointer">
                                        <input type="radio" id="mm" name="mode_paiement" 
                                        v-model="paymentAmount.mode_paiement"
                                        value="mobile_money" class="peer checked:bg-primary mr-2 cursor-pointer" checked>
                                        <label for="mm" class="peer-checked:text-primary text-[13px] font-[500] text-zinc-700">Mobile Money</label>
                                    </div>
                                    <div class="flex items-center cursor-pointer">
                                        <input type="radio" 
                                        v-model="paymentAmount.mode_paiement"
                                        id="cb" name="mode_paiement" value="credit_card"
                                         class="peer  checked:bg-primary mr-2 cursor-pointer" >
                                        <label for="cb" class="peer-checked:text-primary text-[13px] font-[500] text-zinc-700">Carte de Crédit</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full mb-3">
                                <h3 class="mb-3">Récapitulatif</h3>
                                <div class="flex justify-between items-center">
                                    <span class="text-[13px] font-[500] text-zinc-700">Frais</span>
                                    <span class="text-[13px] font-[500] text-zinc-700">{{frais }} FCFA</span>
                                </div>
                                <div class="flex justify-between items-center mt-2">
                                    <span class="text-[13px] font-[500] text-zinc-700">Montant à payer</span>
                                    <span class="text-[13px] font-[500] text-zinc-700">{{ paidAmount }} FCFA</span>
                                </div>
                            </div>
                            <UiButtonSubmit :label="$t('facture.detail.payment_form.button_new')+` ( ${paidAmount} )`" :isLoading="isLoading"/>
                        </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>