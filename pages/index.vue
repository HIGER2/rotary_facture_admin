

<script setup lang="ts">

const columns = [
    { label: 'N°Facture', key: 'n' },
    { label: 'Club', key: 'club' },
    { label: 'Montant', key: 'amount' },
    { label: 'restet à payer', key: 'amount_rest' },
    { label: 'statut', key: 'status' },
    { label: 'date émission', key: 'date' },
]
const data = [
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
]
</script>

<template>
    <div>
        <NuxtLayout>
    <div class="w-full">
       <div class="p-2 mb-3">
         <h5 class="text-sm font-semibold uppercase text-neutral-500">Tableau de bord</h5>
       </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
            <div class="box">
                <span class="text-black text-xs font-bold">Total Factures</span>
                <h2 class="text-lg font-extrabold">0</h2>
            </div>
            <div class="box ">
                <div class="flex justify-between items-center">
                    <span class="text-black text-xs font-bold">Total à payer</span>
                </div>
                <h2 class="text-lg font-extrabold">0</h2>
            </div>
            <div class="box">
                <span class="text-black text-xs font-bold">Montant Encaissé</span>
                <h2 class="text-lg font-extrabold">0</h2>
            </div>
            <div class="box">
                <span class="text-black text-xs font-bold">Factures Impayées</span>
                <h2 class="text-lg font-extrabold">0</h2>
            </div>
       </div>
       <div class="w-full p-2">
            <UiDynamicTable :columns="columns" :data="data"/>
       </div>
    </div>

        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>