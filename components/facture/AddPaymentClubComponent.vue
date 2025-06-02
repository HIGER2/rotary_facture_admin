
<script setup lang="ts">

const props = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    processPayment: (item:any)=>void,
    isLoading: boolean,
    paymentAmount: any,
}>()

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
                            <UiButtonSubmit :label="$t('facture.detail.payment_form.button_new')" :isLoading="isLoading"/>
                        </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>