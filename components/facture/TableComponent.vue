
<script setup lang="ts">

interface TableProps {
  data: any,
  user:any,
  loading:boolean | null | undefined
}
const props = withDefaults(defineProps<TableProps>(),{
    loading: false
})

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

const handleclick = (item) => {
    navigateTo(`/account/factures/${item?.reference}`)
}
const editUser = (user) => {
  console.log('Modifier :', user)
}

</script>

<template>
    <div>
        <UiDynamicTable :loading="loading" :columns="columns[user?.role]" :data="props.data">
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
                    <!-- <NuxtLink :to="`/account/factures/update?ref=${item?.reference}`"  
                            class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                            flex items-center justify-center text-center 
                            rounded-full
                            border border-gray-200 text-gray-500 hover:text-gray-700
                            shadow
                            ">
                            <i class="uil uil-eye text-sm"></i>
                            <i class="uil uil-pen"></i>
                    </NuxtLink> -->
                </div>
            </template>
            <template #type="{ item }">
                <FactureType :status="item?.type"/>
            </template>
            <template #status="{ item }">
                <FactureStatus :status="item?.status"/>
            </template>
          
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>