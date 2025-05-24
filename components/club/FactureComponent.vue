

<script setup lang="ts">

const props = defineProps<{
    data:any,
    user:any
}>()


const sharedAdminColumns = [
    { label: 'colunm_facture.td1', key: 'reference' },
    { label: 'colunm_facture.td2', key: 'amount' },
    { label: 'colunm_facture.td9', key: 'amount_pay' },
    { label: 'colunm_facture.td3', key: 'remaining_amount' },
    { label: 'colunm_facture.td8', key: 'type' },
    { label: 'colunm_facture.td4', key: 'status' },
    { label: 'colunm_facture.td5', key: 'date_emission' },
    { label: 'colunm_facture.td6', key: 'date_echeance' },
    { label: 'colunm_facture.td7', key: 'action' }
    ];


const columns = {
    "admin":sharedAdminColumns,
    "super_admin":sharedAdminColumns,
"club":[
{ label: 'colunm_facture.td1', key: 'reference' },
    // { label: 'Club', key: 'club' },
    { label: 'colunm_facture.td2', key: 'amount' },
    // { label: 'type', key: 'type' },
    { label: 'colunm_facture.td3', key: 'remaining_amount' },
    { label: 'colunm_facture.td8', key: 'type' },

    { label: 'colunm_facture.td4', key: 'status' },

    { label: 'colunm_facture.td5', key: 'date_emission' },
    { label: 'colunm_facture.td6', key: 'date_echeance' },
]
}

</script>


<template>
    <div class="w-full">
            <div class="px-4 sm:px-0 flex items-center justify-between">
                <h3 class="text-base font-semibold leading-7 text-gray-900">
                    {{ $t('club.title_facture') }}
                </h3>
                <!-- {{ data?.factures }} -->
                <!-- <button 
                class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                    Nouveau paiement
                </button> -->
            </div>
            <div class="mt-6 border-t border-gray-100">
                <FactureTableComponent  :user="user" :columns="columns" :data="data?.factures"/>
            </div>
    </div>
</template>

<style scoped>

</style>