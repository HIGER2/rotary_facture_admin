

<script setup lang="ts">
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import { useExerciceViewModel } from '~/stores/viewModels/exerciceViewmodel';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { useRubriqueViewModel } from '~/stores/viewModels/rubriqueViewmodel';

const storeFacture = useFactureViewModel()
const {isLoading} = storeToRefs(useFactureViewModel())
const storeClub =useClubViewModel()
const storeRubrique =useRubriqueViewModel()
const storeExerice =useExerciceViewModel()
const optionClub=ref([])
const optionExercice=ref([])
const optionRubrique=ref([])

const optionStatus = [
{ label: 'en cours', value:"en_cours"},
    { label: 'payée', value:"payée"},
    { label: 'annulée', value:"annulée"},
    { label: 'partiellement payé', value:"partiellement_payé"},
    { label: 'arriérée', value:"arriérée"},
]

const handleClub = async () => {
    let response =await storeClub.all()
    optionClub.value = [...response.data?.data.map((item:any,index) => (
            {
                label : item?.name,
                value : item?.id,
            }
        ))]
}


const handleFactre = async () => {
    let route = useRoute();
    let response =await storeFacture.find(route?.query?.ref)
   
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


const handExercice = async () => {
    let response =await storeExerice.all()
    optionExercice.value = [...response.data?.data.map((item:any,index) => (
            {
                label : `${item?.annee} : (du ${item?.begin_date} au ${item?.end_date})`,
                value : item?.id,
            }
        ))]
}
onMounted(async () => {
    await Promise.all([
    handleFactre(),
    handleClub(),
    handRubrique(),
    handExercice()
  ])
});
</script>


<template>
    <div>
        <NuxtLayout>
        <div class="w-full">
            <!-- <pre>{{ storeFacture.updateFacture }}</pre> -->
            <div class="w-[600px] m-auto">
                <div class="w-full p-2 mb-3">
                <h5 class="text-sm font-semibold uppercase text-neutral-500">Modifier la facture</h5>
            </div>
            <div class="w-full p-2 ">
                <form class="max-w-3xl" @submit.prevent="storeFacture.update()">
                    <div class="w-full bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="space-y-2 mb-4 flex gap-2">
                            <UiFormSelect 
                            v-model="storeFacture.updateFacture.exercice_id"
                            :options="optionExercice" label="Exercice" 
                            required
                            placeholder="Selectionner un Exercice" name="Exercice" />
                            <UiFormSelect 
                            v-model="storeFacture.updateFacture.club_id"
                            :options="optionClub" label="Club" 
                            required
                            placeholder="Selectionner un club" name="title" />
                            
                        </div>
                        <div class="space-y-2 mb-4 flex gap-1.5">
                            <UiFormSelect 
                            required
                            v-model="storeFacture.updateFacture.rubrique_id"
                            :options="optionRubrique" 
                            label="Rubrique" 
                            placeholder="Selectionner une rubrique" name="title" />
                            <UiFormSelect 
                            required
                            v-model="storeFacture.updateFacture.status"
                            :options="optionStatus" label="Statut" 
                            placeholder="Statut" name="title" />
                        </div>
                        <!-- <div class="space-y-2 mb-4">
                            <UiFormInput 
                            required
                            v-model="newFacture.date_echeance"
                            type="date" label="Date échéance" placeholder="Date échéance" name="title" />
                        </div> -->
                        <div class="space-y-2 mb-4">
                            <UiFormInput 
                            required
                            v-model="storeFacture.updateFacture.amount"
                            type="number" label="Montant" placeholder="Montant" name="title" />
                        </div>
                     
                        <div class="space-y-2 mb-4">
                             <div class="mt-4 flex w-full flex-col justify-start gap-1">
                                <label  class="text-[13px] font-[500] text-zinc-700">
                                </label>
                                <UiFormTextArea
                                required
                                v-model="storeFacture.updateFacture.objet"
                                placeholder="Objet"
                                rows="4"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <button class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-11 px-4 py-2" type="button">
                            Annuler
                        </button>
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