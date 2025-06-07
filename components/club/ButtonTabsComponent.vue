

<script setup lang="ts">

const props = defineProps<{
    isActive: number,
    setTabs: (state:number) => void
}>()

</script>


<template>
<div 
class="inline-flex my-5 cursor-pointer h-10 items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500  " tabindex="0" data-orientation="horizontal" style="outline: none;">
        <!-- <button @click="setTabs(1)" type="button" :data-state="isActive == 1 && 'active'" class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white  data-[state=active]:shadow  " tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
            {{$t('club.tab.tab1')}}
        </button> -->
    <button @click="setTabs(2)" :data-state="isActive == 2 && 'active'" type="button"   
    class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
        data-[state=active]:bg-white  data-[state=active]:shadow  d" tabindex="0" data-orientation="horizontal" data-radix-collection-item="">
        {{$t('club.tab.tab2')}}
    </button>
    <button @click="setTabs(3)" :data-state="isActive == 3 && 'active'" type="button" class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white  data-[state=active]:shadow  " tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
        {{$t('club.tab.tab3')}}
    </button>
</div>
</template>

<style scoped>

</style>