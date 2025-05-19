

<script setup lang="ts">
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import { useExerciceViewModel } from '~/stores/viewModels/exerciceViewmodel';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { useRubriqueViewModel } from '~/stores/viewModels/rubriqueViewmodel';

const { newFacture,removeRubrique, create,addRubrique,newRubrique} = useFactureViewModel()
const {isLoading,total_rubrique,total_quantity,total_amount} = storeToRefs(useFactureViewModel())
const storeClub =useClubViewModel()

const storeRubrique =useRubriqueViewModel()
const storeExerice =useExerciceViewModel()
const optionClub=ref([])
const optionRubrique=ref([])
const optionExercice=ref([])

const optionStatus = [
    { label: 'en cours', value:"en_cours"},
    { label: 'payée', value:"payée"},
    { label: 'annulée', value:"annulée"},
    { label: 'partiellement payé', value:"partiellement_payé"},
    { label: 'arriérée', value:"arriérée"},
]

const handleSubmit = async (event) => {
    let send = event.submitter.value ==='send' ? 'send':'draft'
    let response =await create(send)
}


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
    handleCulb(),
    // handRubrique(),
    // handExercice()
  ])
})
</script>


<template>
    <div>
        <NuxtLayout>
        <div class="w-full">
            <div class="w-full m-auto">
                <div class="w-full p-2 mb-3">
                    <h5 class="text-sm font-semibold uppercase text-neutral-500">Créer une facture</h5>
                </div>
                <div class="w-full p-2 ">
                <div class="w-full flex items-start gap-2">
                    <form class="flex-1"  @submit.prevent="handleSubmit">
                        <div class="w-full bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                            <div class="space-y-2 mb-4 flex gap-2">
                                <!-- <UiFormSelect 
                                v-model="newFacture.exercice_id"
                                :options="optionExercice" label="Exercice" 
                                required
                                placeholder="Selectionner un Exercice" name="Exercice" /> -->
                                <UiFormSelect 
                                v-model="newFacture.club_id"
                                :options="optionClub" label="Club" 
                                required
                                placeholder="Selectionner un club" name="title" />
                                
                            </div>
                            <div class="space-y-2 mb-4 flex gap-1.5">
                                <!-- <div class="space-y-2 mb-4">
                                    <UiFormInput 
                                    required
                                    v-model="newFacture.amount"
                                    type="number" label="Montant" placeholder="Montant" name="title" />
                                </div> -->
                                <!-- <UiFormSelect 
                                required
                                v-model="newFacture.rubrique_id"
                                :options="optionRubrique" 
                                label="Rubrique" 
                                placeholder="Selectionner une rubrique" name="title" /> -->
                                <!-- <UiFormSelect 
                                required
                                v-model="newFacture.status"
                                :options="optionStatus" label="Statut" 
                                placeholder="Statut" name="title" /> -->
                            </div>
                            <!-- <div class="space-y-2 mb-4">
                                <UiFormInput 
                                required
                                v-model="newFacture.date_echeance"
                                type="date" label="Date échéance" placeholder="Date échéance" name="title" />
                            </div> -->
                            <!-- <div class="space-y-2 mb-4">
                                <UiFormInput 
                                required
                                v-model="newFacture.amount"
                                type="number" label="Montant" placeholder="Montant" name="title" />
                            </div> -->
                        
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
                        <h5 class="text-sm  my-4 font-semibold uppercase text-neutral-500">Rubriques</h5>
                        <div class="w-full  bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                            <div class="w-full border-b border-b-gray-200" 
                            v-for="(item, index) in newRubrique" :key="index">
                            <button 
                                @click="removeRubrique(index)"
                                type="button"
                                class="
                                mx-auto cursor-pointer
                                text-[13px] 
                                rounded-lg border border-slate-200 bg-transparent p-2
                                shadow-xs transition-colors file:border-0 file:bg-transparent
                                ">Rétirer</button>
                            <div class="space-y-2  flex gap-1.5">
                                <div class="space-y-2 ">
                                    <UiFormInput 
                                    required
                                    v-model="item.libele"
                                    label="libélé" placeholder="libélé" name="title" />
                                </div>
                                <div class="space-y-2 ">
                                    <UiFormInput 
                                    required
                                    v-model="item.quantity"
                                    type="number" label="Quantité" placeholder="Quantité" name="title" />
                                </div>
                                <div class="space-y-2 ">
                                    <UiFormInput 
                                    required
                                    v-model="item.amount"
                                    type="number" label="Tarif" placeholder="Tarif" name="title" />
                                </div>
                            </div>
                            <div class="space-y-2 mb-4">
                                    <div class="flex w-full flex-col justify-start gap-1">
                                        <label  class="text-[13px] font-[500] text-zinc-700">
                                        </label>
                                        <UiFormTextArea
                                        required
                                        v-model="item.comment"
                                        placeholder="Commentaire"
                                        rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="w-full grid items-center mt-3">
                                <button 
                                @click="addRubrique"
                                type="button"
                                class="
                                mx-auto cursor-pointer
                                text-[13px] 
                                rounded-lg border border-slate-200 bg-transparent p-2
                                shadow-xs transition-colors file:border-0 file:bg-transparent
                                ">Ajouter une rubrique</button>
                            </div>
                        </div>
                        <div class="flex justify-between mt-4">
                            <NuxtLink to="/account/factures" class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-11 px-4 py-2">
                                Annuler
                            </NuxtLink>
                            <div class="inline-flex gap-2">
                                <UiButtonSubmit 
                                value="draft"
                                class="!bg-gray-100 !text-black  
                                border border-slate-200
                                "
                                type="submit"
                                name="action"
                                label="Enregistrer au brouillon" :isLoading="isLoading && isLoading=='draft'"/>
                                <UiButtonSubmit
                                name="action"
                                type="submit"
                                value="send"
                                label="Enregistrer et envoyer" :isLoading="isLoading && isLoading=='send'"/>
                            </div>   
                        </div>
                    </form>
                    <div class="
                    sticky top-[20px]
                    w-[350px] min-h-20 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                        <div class="w-full flex mb-2 p-2 items-center justify-between">
                            <span>Nombre de rubrique</span>
                            <span>{{ total_rubrique }}</span>
                        </div>
                        <div class="w-full flex p-2 mb-2 items-center justify-between">
                            <span>Quantité total</span>
                            <span>{{ total_quantity }}</span>
                        </div>
                        <div class="w-full flex p-2 mb-2 items-center justify-between">
                            <span>Montant total facture</span>
                            <span>{{ total_amount }}</span>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>

        </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>