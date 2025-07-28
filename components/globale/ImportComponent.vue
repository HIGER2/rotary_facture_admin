
<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';


const props = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    loading?:boolean,
    payload: {file:any},
    action:()=>Promise<any>
    callback?:()=>Promise<any>
}>()

    const close = () => {
        props.payload.file = null; // Reset the file in the store
        props.setActive(false);
    };
    let isLoading=ref(false)

    const handleSubmit =async () => {
        isLoading.value =true
        await props.action();
        if (props.callback) {
            await props.callback()
            props.setActive(false);
        }
        isLoading.value =false
    };
</script>

<template>
    <div>
        <div>
                <UiModal :isActive="isActive" :onClose="close">
                    <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                            <!-- <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                                <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                                    Importer
                                </h2>
                            </div> -->
                    <form action="" @submit.prevent="handleSubmit">

                        <UiFileFile v-slot="{onOpen}" 
                            v-model:file="payload.file"
                            accept=".xls,.xlsx,csv">
                                <div 
                                @click="onOpen"
                                class="w-full cursor-pointer mb-4 flex items-center flex-col justify-center h-40 border border-dashed rounded-md border-gray-400">
                                    <span class="text-[14px]">Cliquez ici pour importer votre fichier.</span>
                                    <span
                                    class="w-20 h-20 leading-20 bg-gray-100 rounded-full block text-center mt-2"
                                    :class="{'text-green-800 bg-green-100': payload.file}"
                                    >
                                    <i class="uil uil-file-alt text-4xl mt-4"></i></span>
                                   <span v-if="payload.file" class="mt-2">Ficher importé</span>
                                </div>
                                <UiButtonSubmit
                                :isLoading="isLoading"
                                name="action"
                                type="submit"
                                value="send"
                                label="Soumettre"
                                :disabled="!payload.file"
                                />
                            </UiFileFile>
                          </form>
                    </div>
                </UiModal>
            </div>
    </div>
</template>


<style scoped>

</style>