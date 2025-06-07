
<script setup lang="ts">
import { useSettingViewModel } from '~/stores/viewModels/settingViewmodel';

const store =useSettingViewModel()


onBeforeMount(() => {
    store.allCurrency()
})
</script>



<template>
    <div>
        <div class="w-full ">
                    <form class="w-120 mx-auto" @submit.prevent="store.createOrUpdateCurrency">
                            <div v-if="store.currency" class="w-full mt-3  p-4 border overflow-hidden  border-gray-200 rounded-lg">
                                <div class=" mb-4 flex gap-2"
                                v-for="(item, index) in store.currency" :key="index"
                                >
                                    <UiFormInput 
                                    v-model="item.name"
                                    label="Code" 
                                    placeholder="code"
                                    readonly 
                                    name="title" />

                                    <UiFormInput 
                                    :required="index==0"
                                    v-model.number="item.taux"
                                    label="Taux" 
                                    type="number"
                                    placeholder="Taux" 
                                    name="title" />
                                </div>
                            </div>
                            <div class="w-full mt-4">
                                <div class="w-full">
                                    <UiButtonSubmit label="Enregistrer" :isLoading="store.isLoading"/> 
                                </div>   
                            </div>
                    </form>
        </div>
    </div>
</template>

<style scoped>

</style>