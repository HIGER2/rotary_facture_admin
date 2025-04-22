
<script setup lang="ts">
import { useClubPersonnelViewModel } from '~/stores/viewModels/clubPersonnelViewmodel';

const props = defineProps<{
    data: any,
    isActive: boolean,
    setActive:(state:boolean)=>void
}>()

const store = useClubPersonnelViewModel()
const handleDetails = inject('handleDetails')

const handleCreate = async(item:any) => {
    await store.create(item)
    await handleDetails()
}
const optionFonction = [
    { label: 'Président', value:"président"},
    { label: 'Vice-Président', value:"vice-Président"},
    { label: 'Trésorier', value:"trésorier"},
    { label: 'Secrétaire', value:"secrétaire"},
    { label: 'Membre', value:"membre"},
    { label: 'Autre', value:"autre"},
]
</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
                <div  class=" grid  w-full max-w-lg  gap-4">
                        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                                Nouveau membre
                            </h2>
                        </div>
                        <form class="" @submit.prevent="handleCreate(data)">
                            <div class=" mb-4 flex gap-2">
                                <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.name"
                                label="Nom" placeholder="Nom" name="title" />
                                <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.last_name"
                                label="Prénoms" placeholder="Prénoms" name="title" />
                            </div>
                            <div class=" mb-4 flex gap-2">
                                <UiFormInput 
                                required
                                type="email"
                                v-model="store.newClubPersonnel.email"
                                label="Email" placeholder="Email" name="title" />

                                <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.phone"
                                label="Téléphone" placeholder="Téléphone" name="title" />
                            </div>
                            <UiFormSelect 
                            required
                            :options="optionFonction"
                            v-model="store.newClubPersonnel.function"
                            placeholder="Fonction" 
                            label="Fonction"
                            />
                            <div class="w-full mt-4">
                                <UiButtonSubmit label="Créer" :isLoading="store.isLoading"/>    
                            </div>
                    </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>