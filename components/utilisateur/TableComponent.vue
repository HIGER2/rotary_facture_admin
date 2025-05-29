
<script setup lang="ts">

interface TableProps {
  data: any,
  setUpdate: (item:any) => void,
  loading:boolean
}
const props = defineProps<TableProps>()

const columns = [
    { label: 'user.colunm.td1', key: 'id' },
    { label: 'user.colunm.td2', key: 'name' },
    { label: 'user.colunm.td3', key: 'last_name' },
    { label: 'user.colunm.td4', key: 'role' },
    { label: 'user.colunm.td5', key: 'phone' },
    { label: 'user.colunm.td6', key: 'email' },
    { label: 'user.colunm.td7', key: 'action' },
]


</script>

<template>
    <div>
        <!-- {{ data }} -->
        <UiDynamicTable :loading="loading" :columns="columns" :data="props.data">
            <template #action="{ item }">
                  <!-- <NuxtLink to="" class="text-blue-600">ouvrir</NuxtLink> -->
                <div class="flex items-center gap-1  text-[12px]">
                <button 
                        type="button"
                        @click="props.setUpdate(item)"
                        class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                        flex items-center justify-center text-center 
                        rounded-full
                        border border-gray-200 text-gray-500 hover:text-gray-700
                        shadow
                        ">
                        <!-- <i class="uil uil-eye text-sm"></i> -->
                        <i class="uil uil-pen"></i>
                    </button>
                </div>
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>