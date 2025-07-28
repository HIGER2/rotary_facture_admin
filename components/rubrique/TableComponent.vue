
<script setup lang="ts">

interface TableProps {
  data: any,
  setUpdate: (item:any) => void,
  loading:boolean
}
const props = defineProps<TableProps>()

const columns = [
    { label: 'rubrique.colunm.code', key: 'code' },
    { label: 'rubrique.colunm.libele', key: 'libele' },
    { label: 'rubrique.colunm.status', key: 'status' },
    { label: 'rubrique.colunm.price', key: 'price' },
    { label: 'rubrique.colunm.priority', key: 'priority' },
    // { label: 'rubrique.colunm.td5', key: 'designation' },
    { label: 'rubrique.colunm.action', key: 'action' },
]

const getPriority=(item)=>{
    return item.priority == 'low' ? 'faible' :
            item.priority == 'medium' ? 'moyenne' :
            item.priority == 'high' && 'élevé' 
}

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
            <template #priority="{ item }">
             <span>{{ getPriority(item) }}</span>
            </template>
        </UiDynamicTable>
    </div>
</template>


<style scoped>

</style>