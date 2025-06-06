
<script setup lang="ts">
import { useSettingViewModel } from '~/stores/viewModels/settingViewmodel';
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel';
import { title } from 'process';

const storeStting = useSettingViewModel()

interface TableProps {
  payload: any,
  action: () => void,
  loading:boolean,
  title:string
}
const props = defineProps<TableProps>()

const handleAction=async()=>{
    await props.action()
}
const country =ref([])
const getCountry=async()=>{
    let data=  await storeStting.allCoutry()
    country.value = [...data.map((item)=>({
        label : item?.name,
        value : item?.id,
    }))]
}
const optionStatus = [
    { label: 'actif', status:"Actif"},
    { label: 'radié', status:"Radié"},
]

const club_personel = [
    {name: "Nom du Président",
     email: "Email du Président",
     phone: "Téléphone du Président",
    },
    {name: "Nom du Secrétire",
     email: "Email du Secrétire",
     phone: "Téléphone du Secrétire",
    },
    {name: "Nom du Trésorier",
     email: "Email du Trésorier",
     phone: "Téléphone du Trésorier",
    },
]

onMounted(() => {
    getCountry()
})

</script>


<template>
    <div>
        <NuxtLayout>
        <div class="w-full">
            <div class="w-full p-2 flex m-auto justify-center">
                    <div  class=" grid mt-4 w-full max-w-xl  gap-4">
                            <div class="w-full p-2 mb-3">
                        <h5 class="text-sm font-semibold uppercase text-neutral-500">
                            {{ props.title }}
                        </h5>
                    </div>
                    <form class="" @submit.prevent="handleAction">
                        <div class="w-full p-4 border overflow-hidden  border-gray-200 rounded-lg">
                            <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                                <h2 id="radix-:r70:" class="text-md mb-3 font-semibold leading-none tracking-tight">
                                    {{ $t('club.form.title_new') }}
                                </h2>
                            </div>
                            <div class="mb-4 flex gap-2">
                                <UiFormInput 
                                    required
                                    v-model="payload.name"
                                    :label="$t('club.form.label1')" 
                                    :placeholder="$t('club.form.label1')" 
                                    name="title" />
                                    <UiFormInput 
                                    required
                                    v-model="payload.effectif"
                                    :label="$t('club.form.label4')" 
                                    :placeholder="$t('club.form.label4')" 
                                    type="number"
                                    min="0"
                                    name="title" />
                                </div>
                                <div class="mb-4 flex gap-2">
                                <UiFormSelect 
                                    required
                                    :options="country"
                                    v-model="payload.country_id"
                                    :label="$t('club.form.label2')" 
                                    :placeholder="$t('club.form.label2')" 
                                    />
                                    <UiFormSelect 
                                    required
                                    :options="optionStatus"
                                    v-model="payload.status"
                                    :label="$t('club.form.label3')" 
                                    :placeholder="$t('club.form.label3')"
                                    />
                                    
                                </div>
                            </div>

                            <div class="w-full mt-3  p-4 border overflow-hidden  border-gray-200 rounded-lg">
                            <h2 id="radix-:r70:" class="text-md mb-3 font-semibold leading-none tracking-tight">
                                {{ $t('club.form.title_member') }}
                            </h2>
                            <!-- {{ newClub.club_personel }} -->
                                <div class=" mb-4 flex gap-2"
                                v-for="(item, index) in club_personel" :key="index"
                                >
                                <!-- <UiFormInput 
                                    required
                                    v-model="newClub.club_personel[index].name"
                                    :label="$t(item.name)" 
                                    :placeholder="$t(item.name)" 
                                    name="title" /> -->
                                    
                                    <!-- <UiFormInput 
                                    required
                                    v-model="item?.email"
                                    :label="$t(item?.email)" 
                                    :placeholder="$t(item?.email)" 
                                    name="title" /> -->
                                    <UiFormInput 
                                    :required="index==0"
                                    v-model="payload.club_personel[index].name"
                                    :label="$t(item?.name)" 
                                    :placeholder="$t(item?.name)" 
                                    name="title" />
                                    <UiFormInput 
                                    :required="index==0"
                                    v-model="payload.club_personel[index].email"
                                    :label="$t(item?.email)" 
                                    :placeholder="$t(item?.email)" 
                                    name="title" />
                                    <UiFormInput 
                                    :required="index==0"
                                    v-model="payload.club_personel[index].phone"
                                    :label="$t(item?.phone)" 
                                    :placeholder="$t(item?.phone)" 
                                    name="title" />
                                </div>
                            </div>
                            <div class="w-full mt-4">
                                <div class="max-w-max min-w-50 ms-auto ">
                                    <UiButtonSubmit label="Modifier" :isLoading="loading"/> 
                                </div>   
                                <!-- <UiButtonSubmit :label="$t('club.form.button_new')" :isLoading="loading"/>     -->
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