
<script setup lang="ts">

interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()
const {formatNumber}=Utils()

const columns = [
    { label: 'payment.tab1.colunm.td1', key: 'reference' },
    { label: 'payment.tab1.colunm.provider_reference', key: 'provider_reference' },

    { label: 'payment.tab1.colunm.td2', key: 'club' },
    { label: 'payment.tab1.colunm.td3', key: 'fac' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'payment.tab1.colunm.td4', key: 'amount' },
    { label: 'payment.tab1.colunm.fees', key: 'fee' },
    { label: 'payment.tab1.colunm.total_amount', key: 'total_amount' },
    { label: 'payment.tab1.colunm.td5', key: 'status' },
    { label: 'payment.tab1.colunm.td6', key: 'mode_paiement' },
    { label: 'payment.tab1.colunm.td7', key: 'date' },

    // { label: 'facture.detail.payment_colunm.td1', key: 'reference' },
    // // { label: 'montant à regler', key: 'club' },
    // { label: 'facture.detail.payment_colunm.td2', key: 'amount' },
    // { label: 'facture.detail.payment_colunm.fees', key: 'fee' },
    // { label: 'facture.detail.payment_colunm.total_amount', key: 'total_amount' },
    // { label: 'facture.detail.payment_colunm.td3', key: 'status' },
    // { label: 'facture.detail.payment_colunm.td6', key: 'provider_reference' },
    // { label: 'facture.detail.payment_colunm.td4', key: 'mode_paiement' },
    // { label: 'facture.detail.payment_colunm.td5', key: 'date' },
]

</script>

<template>
    <div>
        <!-- <pre>{{ data }}</pre> -->
        <UiDynamicTable :loading="loading"  :columns="columns" :data="data">
            <template #fac="{ item }">
                <NuxtLink :to="`/account/factures/${item?.fac}`"
                class="text-blue-500 hover:text-blue-700 hover:underline"
                >{{ item?.fac}}</NuxtLink>
            </template>
             <template #fee="{ item }">
                    <span>{{ formatNumber(item.fee) }}</span>
                </template>  
                 <template #amount="{ item }">
                    <span>{{ formatNumber(item.amount) }}</span>
                </template>  
                <template #total_amount="{ item }">
                    <span>{{ formatNumber(item.total_amount) }}</span>
                </template>  
            <template #status="{ item }">
               <PaymentStatus :status="item?.status" />
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>