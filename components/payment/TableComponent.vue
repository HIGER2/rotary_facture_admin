
<script setup lang="ts">

interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()

const columns = [
    { label: 'payment.tab1.colunm.td1', key: 'reference' },
    { label: 'payment.tab1.colunm.td2', key: 'club' },
    { label: 'payment.tab1.colunm.td3', key: 'fac' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'payment.tab1.colunm.td4', key: 'amount' },
    { label: 'payment.tab1.colunm.td5', key: 'status' },
    { label: 'payment.tab1.colunm.td6', key: 'mode_paiement' },
    { label: 'payment.tab1.colunm.td7', key: 'date' },
]

</script>

<template>
    <div>
        <UiDynamicTable :loading="loading"  :columns="columns" :data="data">
            <template #fac="{ item }">
                <NuxtLink :to="`/account/factures/${item?.fac}`"
                class="text-blue-500 hover:text-blue-700 hover:underline"
                >{{ item?.fac}}</NuxtLink>
            </template>
            <template #status="{ item }">
               <PaymentStatus :status="item?.status" />
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>