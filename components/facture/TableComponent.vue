
<script setup lang="ts">

interface TableProps {
  data: any
}
const props = defineProps<TableProps>()

const columns = [
    { label: 'N°Facture', key: 'reference' },
    // { label: 'Club', key: 'club' },
    { label: 'Montant', key: 'amount' },
    { label: 'restet à payer', key: 'remaining_amount' },
    { label: 'statut', key: 'status' },
    { label: 'date émission', key: 'date_emission' },
    { label: 'date échéance', key: 'date_echeance' },
    
    { label: 'Action', key: 'action' } 
]

const handleclick = (item) => {
    navigateTo(`/account/factures/${item?.reference}`)
}
const editUser = (user) => {
  console.log('Modifier :', user)
}

</script>

<template>
    <div>
        <UiDynamicTable  :columns="columns" :data="props.data">
            <template #reference="{ item }">
                <NuxtLink :to="`/account/factures/${item?.reference}`"
                class="text-blue-500 hover:text-blue-700 hover:underline"
                >{{ item?.reference}}</NuxtLink>
            </template>
            <template #action="{ item }">
                  <!-- <NuxtLink to="" class="text-blue-600">ouvrir</NuxtLink> -->
                <div class="flex items-center gap-1  text-[12px]">
                     <NuxtLink :to="`/account/factures/${item?.reference}`"
                    class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                    flex items-center justify-center text-center rounded-full  px-2 py-1 
                     border border-gray-200 text-gray-500 hover:text-gray-700
                     shadow
                    ">
                    <i class="uil uil-eye "></i>
                        <!-- <i class="uil uil-info-circle"></i> -->
                </NuxtLink>
                    <NuxtLink to="#"  
                        class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                        flex items-center justify-center text-center 
                        rounded-full
                        border border-gray-200 text-gray-500 hover:text-gray-700
                        shadow
                        ">
                        <!-- <i class="uil uil-eye text-sm"></i> -->
                        <i class="uil uil-pen"></i>
                    </NuxtLink>
                   
                </div>
            </template>
            <template #status="{ item }">
                <!-- <div class="inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 dark:text-slate-50 bg-green-50 text-green-700 ring-1 ring-green-600/20">
                    payée
                </div> -->
                <span class="font-medium  inline-flex items-center text-xs px-2 py-1 gap-1 rounded-md bg-(--ui-success)/10 text-(--ui-success) ring ring-inset ring-(--ui-success)/25  lowercase">
                    {{ item?.status }}
                </span>
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>