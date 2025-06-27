
<script setup lang="ts">

interface TableProps {
  data: any,
  user:any,
  loading?:boolean,
  columns: any,
  type?: string,
}
const props = withDefaults(defineProps<TableProps>(),{
    loading: false
})
const {formatNumber}=Utils()

const handleclick = (item) => {
    navigateTo(`/account/factures/${item?.reference}`)
}
const path = (type,item) => {
    if (type === 'invoice_unpaid') {
        return `/account/factures/club/invoice-unpaid/${item?.reference}`
    }
    if (type === 'invoice_paid') {
        return `/account/factures/club/invoice-paid/${item?.reference}`
    }
    return `/account/factures/${item?.reference}`

}

</script>

<template>
    <div>
        <UiDynamicTable :loading="loading" :columns="columns[user?.role]" :data="props.data">

            <template #amount="{ item }">
                <span>{{ formatNumber(item?.amount) }}</span>
            </template>
            <template #amount_pay="{ item }">
               <span>{{ formatNumber(item?.amount_pay) }}</span>
            </template>
            <template #remaining_amount="{ item }">
               <span>{{ formatNumber(item?.remaining_amount) }}</span>
            </template>

            <template #reference="{ item }">
                <NuxtLink :to="path(type,item)"
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
            <template #status="{ item }">
                <FactureStatus :status="item?.status"/>
            </template>
            <template #status_payment="{ item }">
                <FactureStatusPayment :status="item?.status_payment"/>
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>