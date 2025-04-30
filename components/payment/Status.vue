

<script setup lang="ts">

const props = defineProps<{
  status: string;
}>();

const statusChange = (status:string)=>{
  return  status == 'en attente' ? "text-yellow-600 bg-yellow-50"  :
  status == 'payé' ? "text-green-600 bg-green-50" :
  status == 'échec' ? "text-red-600 bg-red-50" :
  status == 'annulé' && "text-orange-600 bg-orange-50" 
 };
</script>

<template>
    <div>
      <div aria-label="status" :class="statusChange(status)" class=" text-center font-medium text-md min-w-[80px] max-w-max  px-3 rounded-full">{{ status }}</div>
    </div>
</template>


<style scoped>

</style>