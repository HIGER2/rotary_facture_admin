
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
                            
                            <UiButtonSubmit :label="$t('facture.detail.payment_form.button_new')" :isLoading="isLoading"/>
                        </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>