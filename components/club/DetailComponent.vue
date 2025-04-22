

<script setup lang="ts">

const props = defineProps<{
    data:any,
}>()

onMounted(() => {
  
})
</script>


<template>
        <section>
            <!-- {{ data }} -->
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
                            {{ data?.pays }}
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                            Description
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {{ data?.description }}
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div class="text-sm font-medium leading-6 text-gray-900">
                            Statut
                        </div>
                        <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div class="inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 dark:text-slate-50 bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                 {{ data?.status }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>


<style scoped>

</style>