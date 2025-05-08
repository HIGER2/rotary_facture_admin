
<script setup lang="ts">

const props = defineProps<{
    isActive:boolean,
}>()

</script>

<template>
    <div>
        <UiModal :isActive="isActive" >
                <div  class=" grid mt-4 w-full max-w-lg  gap-4">
                    <div class="min-w-[370px] w-auto ">
                        <a href="#" class="flex items-center justify-center">
                            <img alt="logo" 
                            fetchpriority="high" 
                            width="120" height="28.422"  class="mb-5" 
                            src="~/assets/images/logo.svg" 
                            style="color: transparent;">
                        </a>
                        <div class="rounded-xl  w-full ">
                            <div class="flex flex-col space-y-1.5 p-6 px-2 sm:px-6">
                                <h3 class="font-semibold text-center tracking-tight text-xl">
                                    Vérification du paiement
                                </h3>
                                <div class="flex items-center justify-center">
                                    <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </UiModal>
    </div>
</template>


<style scoped>

</style>