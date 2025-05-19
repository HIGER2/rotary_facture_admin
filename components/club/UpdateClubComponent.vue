
<script setup lang="ts">
import { useSettingViewModel } from '~/stores/viewModels/settingViewmodel';
const storeStting = useSettingViewModel()
const country =ref([])

const prpos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    update: any,
    updateClub: ()=>void,
    isLoading: boolean
}>()
const getCountry=async()=>{
    let data=  await storeStting.allCoutry()
    country.value = [...data.map((item)=>({
        label : item?.name,
        value : item?.id,
    }))]
}
const optionStatus = [
    { label: 'actif', status:"actif"},
    { label: 'inactif', status:"inactif"},
]

onMounted(() => {
    getCountry()
})

</script>


<template>
    <div>   
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
            <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                    <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                        <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                          {{ $t('club.form.title_update') }}
                        </h2>
                    </div>
                    <form class="" @submit.prevent="updateClub()">
                            <div class=" mb-4">
                            <UiFormInput 
                            required
                            v-model="update.name"
                            :label="$t('club.form.label1')" 
                            :placeholder="$t('club.form.label1')"
                            name="title" />
                        </div>
                        <div class="">
                        <UiFormSelect 
                            required
                            :options="country"
                            v-model="update.country_id"
                            :label="$t('club.form.label2')" 
                            :placeholder="$t('club.form.label2')"
                            />
                            <UiFormSelect 
                            required
                            :options="optionStatus"
                            v-model="update.status"
                            :label="$t('club.form.label3')" 
                            :placeholder="$t('club.form.label3')"
                            />
                            
                        </div>
                        <div class="w-full mt-4">
                            <UiButtonSubmit :label="$t('club.form.button_update')" :isLoading="isLoading"/>    
                        </div>
                </form>
            </div>
        </UiModal>

    </div>
</template>

<style scoped>

</style>