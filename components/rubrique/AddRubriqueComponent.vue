

<script setup lang="ts">

const propos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    newRubrique: any,
    createRubrique: ()=>void,
    isLoading: boolean
}>()

const optionStatus = [
    { label: 'actif', status:"actif"},
    { label: 'inactif', status:"inactif"},
]
</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
        <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                        {{$t('rubrique.form.title_new')}}
                    </h2>
                </div>
                <form class="" @submit.prevent="createRubrique()">
                    <div class=" mb-4 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newRubrique.libele"
                        :label="$t('rubrique.form.label1')" 
                        :placeholder="$t('rubrique.form.label1')" 
                        name="title" 
                        />
                        <UiFormSelect 
                            required
                            v-model="newRubrique.status"
                            :options="optionStatus" 
                            :label="$t('rubrique.form.label2')" 
                            :placeholder="$t('rubrique.form.label2')"
                            name="title" 
                            />
                    </div>
                    <div class="">
                        <UiFormInput 
                        required
                        type="number"
                        v-model="newRubrique.price"
                        :label="$t('rubrique.form.label3')" 
                        :placeholder="$t('rubrique.form.label3')"
                        name="Prix" />
                    </div>
                    <div class="">
                        <UiFormTextArea
                            :label="$t('rubrique.form.label4')" 
                            :placeholder="$t('rubrique.form.label4')"
                            v-model="newRubrique.designation"
                            rows="3"
                            />
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