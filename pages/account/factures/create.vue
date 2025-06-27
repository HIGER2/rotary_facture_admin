

<script setup lang="ts">
import { UiFormInput } from '#components';
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import { useExerciceViewModel } from '~/stores/viewModels/exerciceViewmodel';
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';
import { useRubriqueViewModel } from '~/stores/viewModels/rubriqueViewmodel';

const { newFacture,removeRubrique, create,addRubrique,newRubrique,cancel} = useFactureViewModel()
const {isLoading,total_rubrique,total_quantity,total_amount} = storeToRefs(useFactureViewModel())
const storeClub =useClubViewModel()

const storeRubrique =useRubriqueViewModel()
const storeExerice =useExerciceViewModel()
const {formatNumber}=Utils()

const optionClub=ref([])
const optionRubrique=ref([])
const optionExercice=ref([])

definePageMeta({
  breadcrumb: [
    {label:'Factures',path:"/account/factures"},
    {label:'Créer une facture',path:null}
  ]
})
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

const handleAdd=()=>{
    if (newFacture.club_id=="") {
        alert("Veuillez selectionner un club")
        return
    }
    let club = optionClub.value.find((item:any) => item.id == newFacture.club_id)

    console.log(club,newFacture.club_id);
    
    if (club) {
        addRubrique(club.effectif)
    }
    
}

const handleCulb = async () => {
    let response =await storeClub.all()
    optionClub.value = [...response.data?.data.map((item:any,index) => (
            {
                label : item?.name,
                id : item?.id,
                effectif: item?.effectif,
            }
        ))]
}


const handRubrique = async () => {
    let response =await storeRubrique.all()
    optionRubrique.value = [...response.data?.data.map((item:any,index) => (
            {
                label : item?.libele,
                id : item?.id,
                price:item?.price
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
    handRubrique(),
    // handExercice()
  ])
})

const today = new Date().toISOString().split('T')[0]

</script>


<template>
    <div>
        <NuxtLayout v-slot="{ userConnected }">
            <div class="w-full">
                <div class="w-full m-auto">
                    <div class="w-full p-2 mb-3">
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">
                            {{ $t('facture.form.title_new') }}
                        </h5>
                    </div>
                    <div class="w-full p-2 ">
                        <div class="w-full flex items-start gap-2">
                            <form class="flex-1"  @submit.prevent="handleSubmit">
                                <div class="w-full bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                                    <div class="space-y-2 mb-4">
                                        <div class="mt-4 flex w-full  justify-start gap-2">
                                            <UiFormInput
                                            type="date"
                                            :max="today"
                                            required
                                            v-model="newFacture.date_emission"
                                            :placeholder="$t('facture.form.dateEmsion')"
                                            :label="$t('facture.form.dateEmsion')"
                                            rows="4"
                                            />
                                            <UiFormInput
                                            type="date"
                                            required
                                            v-model="newFacture.date_echeance"
                                            :placeholder="$t('facture.form.dateEcheance')"
                                            :label="$t('facture.form.dateEcheance')"
                                            rows="4"
                                            />
                                        </div>
                                    </div>
                                    <div class="space-y-2 mb-4 flex gap-2">
                                        <div class="space-y-2 flex flex-col w-full ">
                                            <label for="" class="text-[13px] font-[500] text-zinc-700">{{
                                                $t('facture.form.label1')
                                                }}</label>
                                            <USelectMenu 
                                            placeholder="Sélectionner un club"
                                            class=" h-11 w-full  rounded-lg  bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                                            v-model="newFacture.club_id"  
                                            value-key="id"
                                            :items="optionClub" 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div class="space-y-2 mb-4">
                                        <div class="mt-4 flex w-full flex-col justify-start gap-1">
                                            <label  class="text-[13px] font-[500] text-zinc-700">
                                            </label>
                                            <UiFormTextArea
                                            required
                                            v-model="newFacture.objet"
                                            :placeholder="$t('facture.form.label2')"
                                            :label="$t('facture.form.label2')"
                                            rows="4"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h5 class="text-sm  my-4 font-semibold uppercase text-neutral-500">
                                    {{ $t('facture.form.rubrique_title') }}
                                </h5>
                                <div class="w-full  bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                                    <FactureItemRubriqueComponent
                                    :newRubrique="newRubrique"
                                    :removeRubrique="removeRubrique"
                                    :rubrique="optionRubrique"
                                    />
                                    <div class="w-full grid items-center mt-3">
                                        <button 
                                        @click="handleAdd"
                                        type="button"
                                        class="
                                        mx-auto cursor-pointer
                                        text-[13px] 
                                        rounded-lg border border-slate-200 bg-transparent p-2
                                        shadow-xs transition-colors file:border-0 file:bg-transparent
                                        ">
                                        {{ $t('facture.form.add_rubrique') }}
                                        </button>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-4">
                                    <button type="button" 
                                    @click="cancel"
                                    class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-11 px-4 py-2">
                                        {{ $t('facture.form.cancel') }}
                                    </button>
                                    <div class="inline-flex gap-2">
                                        <UiButtonSubmit
                                        value="draft"
                                        class="!bg-gray-100 !text-black  
                                        border border-slate-200
                                        "
                                        type="submit"
                                        name="action"
                                        :label="$t('facture.form.button_b')" 
                                        :isLoading="isLoading && isLoading=='draft'"/>
                                        <UiButtonSubmit
                                        name="action"
                                        type="submit"
                                        value="send"
                                        :label="$t('facture.form.button_new')"
                                        :isLoading="isLoading && isLoading=='send'"/>
                                    </div>   
                                </div>
                            </form>
                            <div class="
                            sticky top-[20px]
                            w-[350px] min-h-20 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                                <div class="w-full flex mb-2 p-2 items-center justify-between">
                                    <span>
                                        {{ $t('facture.form.rubrique') }}
                                    </span>
                                    <span>{{ formatNumber(total_rubrique) }}</span>
                                </div>
                                <div class="w-full flex p-2 mb-2 items-center justify-between">
                                    <span>
                                        {{ $t('facture.form.quantity') }}
                                    </span>
                                    <span>{{ formatNumber(total_quantity) }}</span>
                                </div>
                                <div class="w-full flex p-2 mb-2 items-center justify-between">
                                    <span>
                                        {{ $t('facture.form.amount') }}
                                    </span>
                                    <span>{{ formatNumber(total_amount) }}</span>
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