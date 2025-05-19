
<script setup lang="ts">

interface TableProps {
  data: any,
  setUpdate: (item:any) => void,
  loading:boolean
}
const props = defineProps<TableProps>()

const columns = [
    { label: '#', key: 'id' },
    { label: 'colunm_club.td1', key: 'name' },
    { label: 'colunm_club.td2', key: 'country' },
    { label: 'colunm_club.td3', key: 'language' },
    { label: 'colunm_club.td4', key: 'action' },
]

const editUser = (user) => {
  console.log('Modifier :', user)
}

</script>

<template>
    <div>
        <!-- {{ data }} -->
        <UiDynamicTable :loading="loading" :columns="columns" :data="props.data">
            <template #action="{ item }">
                  <!-- <NuxtLink to="" class="text-blue-600">ouvrir</NuxtLink> -->
                <div class="flex items-center gap-1  text-[12px]">
                     <NuxtLink :to="`/account/clubs/detail?id=${item?.id}&uid=${item?.uid}`"
                    class=" h-7 w-7 cursor-pointer hover:bg-gray-200  
                    flex items-center justify-center text-center rounded-full  px-2 py-1 
                     border border-gray-200 text-gray-500 hover:text-gray-700
                     shadow
                    ">
                    <i class="uil uil-eye "></i>
                        <!-- <i class="uil uil-info-circle"></i> -->
                </NuxtLink>
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