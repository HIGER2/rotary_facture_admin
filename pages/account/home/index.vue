

<script setup lang="ts">
import { useUserViewModel } from '~/stores/viewModels/userViewmodel'

const  userStore=useUserViewModel()
const loading=ref(false)
const handleSats = async() => {
    if (userStore?.stats?.data?.length == 0) {
        loading.value = true
    }
    await userStore.analityc()
    loading.value = false
}


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


const user =inject('userConnected')
onMounted(() => {
    handleSats() 
})
</script>

<template>
    <div>
    <NuxtLayout v-slot="{ userConnected }">
    <div class="w-full">
       <div class="p-2">
         <h5 class="text-sm font-semibold  text-neutral-500">
            {{ $t("tableau.title")  }}
        </h5>
       </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
         <template v-for="(item, index) in userStore?.stats?.analityc" :key="index">
            <div class="box">
                <span class="text-xs text-gray-500 font-medium">{{$t(item?.label) }}</span>
                <h2 class="text-lg font-extrabold">{{ item?.value }}</h2>
            </div>
         </template>
       </div>
       <div class="w-full p-2">
            <FactureTableComponent :columns="columns" :loading="loading" :user="userConnected" :data="userStore?.stats?.data"/>
        </div>
    </div>

    </NuxtLayout>
    </div>
</template>


<style scoped>

</style>