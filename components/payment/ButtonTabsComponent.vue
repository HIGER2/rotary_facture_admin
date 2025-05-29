

<script setup lang="ts">
const props = defineProps<{
    isActive: number,
    setTabs: (state:number) => void
}>()

const buttons=[
    {libele:"payment.tab.tab1",index:1},
    {libele:"payment.tab.tab2",index:2},
    {libele:"payment.tab.tab3",index:3},
]
</script>


<template>
<div 
class="inline-flex  mb-6  w-full cursor-pointer  items-center justify-between  bg-slate-00  text-slate-500  " style="outline: none;">
    <button 
    v-for="(item, index) in buttons" :key="index"
    @click="setTabs(item.index)" type="button" :data-state="isActive == item.index && 'active'" 
    class="
    w-full hover:bg-sidebar hover:border  border-b border-gray-200 hover:border-white cursor-pointer items-center justify-center whitespace-nowrap  px-3 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-sidebar  data-[state=active]:border data-[state=active]:border-b-0  dark:focus-visible:ring-slate-300 " tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
    {{ $t(item.libele) }}
    </button>
   
</div>
</template>

<style scoped>

</style>