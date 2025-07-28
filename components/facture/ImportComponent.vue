
<script setup lang="ts">
import { useFactureViewModel } from '~/stores/viewModels/factureViewmodel';


const props = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    callback?:()=>Promise<any>
}>()

    const store = useFactureViewModel()
    let loading =ref(false);
    const close = () => {
        store.file = null; // Reset the file in the store
        props.setActive(false);
    };

    const handleSubmit =async () => {
        loading.value =true
        await store.createFactureFromFile();
        if (props.callback) {
            await props.callback()
        }
        loading.value =false
        close()
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
                            v-model:file="store.file"
                            accept=".xls,.xlsx,csv">
                                <div 
                                @click="onOpen"
                                class="w-full cursor-pointer mb-4 flex items-center flex-col justify-center h-40 border border-dashed rounded-md border-gray-400">
                                    <span class="text-[14px]">Cliquez ici pour importer votre fichier</span>
                                    <span
                                    class="w-20 h-20 leading-20 bg-gray-100 rounded-full block text-center mt-2"
                                    :class="{'text-green-800 bg-green-100': store.file}"
                                    >
                                    <i class="uil uil-file-alt text-4xl mt-4"></i></span>
                                        <span v-if="store.file" class="mt-2">Ficher importé</span>
                                </div>
                                <UiButtonSubmit
                                :isLoading="loading"
                                name="action"
                                type="submit"
                                value="send"
                                label="Soumettre"
                                :disabled="!store.file"
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