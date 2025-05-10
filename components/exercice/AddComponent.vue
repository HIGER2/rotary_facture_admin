

<script setup lang="ts">

const propos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    newExercice: any,
    createExercice: ()=>void,
    isLoading: boolean
}>()

const optionStatus = [
    { label: 'en cours', value:"en_cours"},
    { label: 'inactif', value:"inactif"},
]
</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
        <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                        Nouveau exercice
                    </h2>
                </div>
                <form class="" @submit.prevent="createExercice()">
                    <div class=" mb-4 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newExercice.annee"
                        type="number" name="annee" min="2025" max="2099" step="1"
                        label="Année" placeholder="Année" />
                        <UiFormSelect 
                            required
                            v-model="newExercice.status"
                            :options="optionStatus" label="Statut" 
                            placeholder="Statut" name="title" />
                    </div>
                    <div class=" mb-4 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newExercice.begin_date"
                        type="date"
                        label="Date début" placeholder="Date début" name="Date début" />
                        <UiFormInput 
                        required
                        v-model="newExercice.end_date"
                         type="date"
                        label="Date fin" placeholder="Date fin" name="Date fin" />
                    </div>
                    <div class="w-full mt-4">
                        <UiButtonSubmit label="Créer" :isLoading="isLoading"/>    
                    </div>
            </form>
        </div>
            </UiModal>
    </div>
</template>


<style scoped>

</style>