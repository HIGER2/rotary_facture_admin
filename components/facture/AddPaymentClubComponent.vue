
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
                                Effectué un paiement
                            </h2>
                        </div>
                        <form class="space-y-8" @submit.prevent="processPayment">
                            <div class="space-y-2 mb-4">
                                <UiFormInput 
                                required
                                v-model="paymentAmount.amount"
                                min="1"
                                type="number" label="Montant" placeholder="Montant" name="title" />
                            </div>
                            
                            <UiButtonSubmit label="payé maintenant" :isLoading="isLoading"/>
                        </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>