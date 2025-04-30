
<script setup lang="ts">

const prpos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    updatePayment: ()=>void,
    isLoading: boolean,
    update: any,
    optionMethode: any,
    optionStatus: any,
}>()

</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
                <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                                Modifier paiement
                            </h2>
                        </div>
                        <form class="space-y-8" @submit.prevent="updatePayment">
                        <div class="space-y-2 mb-4 flex gap-2">
                            <UiFormSelect 
                                required
                                label="Statut"
                                v-model="update.status"
                                :options="optionStatus" 
                                placeholder="Statut" name="title" />

                                <UiFormSelect 
                                required
                                v-model="update.mode_paiement"
                                :options="optionMethode" label="Mode de paiement" 
                                placeholder="mode paiement" name="title" />
                            </div>
                            <div class="space-y-2 mb-4">
                                <UiFormInput 
                                required
                                v-model="update.amount"
                                min="1"
                                type="number" label="Montant" placeholder="Montant" name="title" />
                            </div>
                            
                            <UiButtonSubmit label="Enregistrer" :isLoading="isLoading"/>
                        </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>