
<script setup lang="ts">

interface TableProps {
  data: any,
  loading: boolean
}
const props = defineProps<TableProps>()
const response = ref([])
const columns = [
    { label: 'Nom', key: 'firstName' },
    { label: 'Prénoms', key: 'lastName' },
    { label: 'Nom de badge', key: 'nameOnBadge' },
    // { label: 'montant à regler', key: 'club' },
    { label: 'Pays', key: 'country' },
    { label: 'Club', key: 'rotaryClub' },
    { label: 'Téléphone', key: 'phoneNumber' },
    { label: 'Date arrivé', key: 'arrivalDate' },
    { label: 'Date départ', key: 'departureDate' },
    { label: 'Mode transport', key: 'transportationMode' },
    { label: 'Invité', key: 'guestNumber' },
    { label: 'Methode de paiement', key: 'paymentMethod' },
    { label: 'Date Paiement', key: 'paymentDate' },
    { label: 'Status', key: 'state' },
    { label: 'Amount', key: 'paidAmount' },
]
const getPayement=async()=>{
    let data =  await useCustomFetch('https://api.acd.district9101.org/public/api/v1.0/subscriptions/acd-members/success-payments')
    response.value = data.data.data
    console.log(response.value);
    
}

onMounted(async () => {
     getPayement()
})
</script>

<template>
    <div>
        <UiDynamicTable :loading="loading"  :columns="columns" :data="response">
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