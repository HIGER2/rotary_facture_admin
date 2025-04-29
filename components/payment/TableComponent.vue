
<script setup lang="ts">

interface TableProps {
  data: any
}
const props = defineProps<TableProps>()

const columns = [
    { label: 'référence', key: 'reference' },
    { label: 'Club', key: 'club' },
    { label: 'N°Facture', key: 'fac' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'montant', key: 'amount' },
    { label: 'statut', key: 'status' },
    { label: 'mode paiement', key: 'mode_paiement' },
    { label: 'date', key: 'date' },
]

</script>

<template>
    <div>
        <UiDynamicTable  :columns="columns" :data="data">
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