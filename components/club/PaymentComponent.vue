

<script setup lang="ts">

const props = defineProps<{
    data:any,
}>()

const columns = [
    { label: 'référence', key: 'reference' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'montant', key: 'amount' },
    { label: 'statut', key: 'status' },
    { label: 'mode paiement', key: 'mode_paiement' },
    { label: 'date', key: 'date' },
]

</script>


<template>
    <div class="w-full">
            <div class="px-4 sm:px-0 flex items-center justify-between">
                <h3 class="text-base font-semibold leading-7 text-gray-900">Paiements</h3>
                <!-- <button 
                class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                    Nouveau paiement
                </button> -->
            </div>
            <div class="mt-6 border-t border-gray-100">
                <UiDynamicTable :rowClick="()=>navigateTo('/factures/2')" :columns="columns" :data="data?.paiements"/>
            </div>
    </div>
</template>

<style scoped>

</style>