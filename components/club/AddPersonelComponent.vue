
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
    // { label: 'Vice-Président', value:"vice-Président"},
    { label: 'Trésorier', value:"trésorier"},
    { label: 'Secrétaire', value:"secrétaire"},
    // { label: 'Membre', value:"membre"},
    // { label: 'Autre', value:"autre"},
]
</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
                <div  class=" grid  w-full max-w-lg  gap-4">
                        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                                {{ $t('club.personnel.form.title_new') }}
                            </h2>
                        </div>
                        <form class="" @submit.prevent="handleCreate(data)">
                            <div class=" mb-4 flex gap-2">
                                <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.name"
                                :label="$t('club.personnel.form.label1')" 
                                :placeholder="$t('club.personnel.form.label1')" 
                                
                                name="title" />
                                <!-- <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.last_name"
                                :label="$t('club.personnel.form.label2')" 
                                :placeholder="$t('club.personnel.form.label2')" 
                                name="title" /> -->
                            </div>
                            <div class=" mb-4 flex gap-2">
                                <UiFormInput 
                                required
                                type="email"
                                v-model="store.newClubPersonnel.email"
                                :label="$t('club.personnel.form.label3')" 
                                :placeholder="$t('club.personnel.form.label3')"
                                name="title" />

                                <UiFormInput 
                                required
                                v-model="store.newClubPersonnel.phone"
                                :label="$t('club.personnel.form.label4')" 
                                :placeholder="$t('club.personnel.form.label4')" 
                                name="title" />
                            </div>
                            <UiFormSelect 
                            required
                            :options="optionFonction"
                            v-model="store.newClubPersonnel.function"
                            :label="$t('club.personnel.form.label5')" 
                            :placeholder="$t('club.personnel.form.label5')" 
                            />
                            <div class="w-full mt-4">
                                <UiButtonSubmit :label="$t('club.personnel.form.button_new')" :isLoading="store.isLoading"/>    
                            </div>
                    </form>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>