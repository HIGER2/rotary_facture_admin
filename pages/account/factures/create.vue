

<script setup lang="ts">
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { useRubriqueViewModel } from '~/stores/viewModels/rubriqueViewmodel';

const { newFacture, create } = useFactureViewModel()
const {isLoading} = storeToRefs(useFactureViewModel())
const storeClub =useClubViewModel()
const storeRubrique =useRubriqueViewModel()
const optionClub=ref([])
const optionRubrique=ref([])

const optionStatus = [
    { label: 'en attente', status:"en attente"},
    { label: 'payée', status:"payée"},
    { label: 'annulée', status:"annulée"},
    { label: 'échelonnée', status:"échelonnée"},
    { label: 'arriérée', status:"arriérée"},
]

const handleCulb = async () => {
    let response =await storeClub.all()
    optionClub.value = [...response.data?.data.map((item:any,index) => (
            {
                label : item?.name,
                value : item?.id,
            }
        ))]
}


const handRubrique = async () => {
    let response =await storeRubrique.all()
    optionRubrique.value = [...response.data?.data.map((item:any,index) => (
            {
                label : item?.libele,
                value : item?.id,
            }
        ))]
}
onMounted(async () => {
  await Promise.all([
    handleCulb(),
    handRubrique()
  ])
})
</script>


<template>
    <div>
        <NuxtLayout>
        <div class="w-full">
            <div class="w-[550px] m-auto">
                <div class="w-full p-2 mb-3">
                <h5 class="text-sm font-semibold uppercase text-neutral-500">Créer une facture</h5>
            </div>
            <div class="w-full p-2 ">
                <form class="max-w-3xl" @submit.prevent="create()">
                    <div class="w-full bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="space-y-2 mb-4 flex gap-2">
                            <UiFormSelect 
                            v-model="newFacture.club_id"
                            :options="optionClub" label="Club" 
                            required
                            placeholder="Selectionner un club" name="title" />
                            <UiFormSelect 
                            required
                            v-model="newFacture.rubrique_id"
                            :options="optionRubrique" 
                            label="Rubrique" 
                            placeholder="Selectionner une rubrique" name="title" />
                        </div>
                        <div class="space-y-2 mb-4 flex gap-1.5">
                            <UiFormSelect 
                            required
                            v-model="newFacture.status"
                            :options="optionStatus" label="Statut" 
                            placeholder="Statut" name="title" />
                            <UiFormInput 
                            required
                            v-model="newFacture.date_echeance"
                            type="date" label="Date échéance" placeholder="Date échéance" name="title" />
                        </div>
                        <div class="space-y-2 mb-4">
                            <UiFormInput 
                            required
                            v-model="newFacture.amount"
                            type="number" label="Montant" placeholder="Montant" name="title" />
                        </div>
                     
                        <div class="space-y-2 mb-4">
                             <div class="mt-4 flex w-full flex-col justify-start gap-1">
                                <label  class="text-[13px] font-[500] text-zinc-700">
                                </label>
                                <UiFormTextArea
                                required
                                v-model="newFacture.objet"
                                placeholder="Objet"
                                rows="4"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <NuxtLink to="/account/factures" class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-11 px-4 py-2">
                            Annuler
                        </NuxtLink>
                        <div class="inline-flex">
                            <UiButtonSubmit label="Enregistrer" :isLoading="isLoading"/>
                        </div>    
                    </div>
                </form>
            </div>
            </div>

        </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>