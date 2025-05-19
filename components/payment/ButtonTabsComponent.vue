

<script setup lang="ts">
const props = defineProps<{
    isActive: number,
    setTabs: (state:number) => void
}>()

const buttons=[
    {libele:"Paiement Facture Per capita",index:1},
    {libele:"Paiement gala",index:2},
    {libele:"Paiement particiaption ACD",index:3},
]
</script>


<template>
<div 
class="inline-flex  mb-6  w-full cursor-pointer  items-center justify-between  bg-slate-00  text-slate-500 dark:bg-slate-800 dark:text-slate-400" style="outline: none;">
    <button 
    v-for="(item, index) in buttons" :key="index"
    @click="setTabs(item.index)" type="button" :data-state="isActive == item.index && 'active'" 
    class="
    w-full hover:bg-sidebar hover:border  border-b border-gray-200 hover:border-white cursor-pointer items-center justify-center whitespace-nowrap  px-3 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-sidebar data-[state=active]:text-slate-950 data-[state=active]:border data-[state=active]:border-b-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
       {{ item.libele }}
    </button>
   
</div>
</template>

<style scoped>

</style>