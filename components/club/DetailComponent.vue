

<script setup lang="ts">

const props = defineProps<{
    data:any,
}>()

onMounted(() => {
  
})
</script>


<template>
        <section>
            <!-- <pre>  {{ data }}</pre> -->
            <div class="px-4 sm:px-0">
                <h3 class="text-base font-semibold leading-7 text-gray-900">Général</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Détail du club</p>
            </div>
            <div class="mt-6 bg-white p-4 border overflow-hidden  border-gray-200 rounded-lg">
                <div class="divide-y divide-gray-100">
                 
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                          Nom du club
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {{ data?.name }}
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                            Pays
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {{ data?.country?.name }}
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                            Langue
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {{ data?.country?.langage }}
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                            Statut
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {{ data?.status }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>


<style scoped>

</style>