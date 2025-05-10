

<script setup lang="ts">

const props = defineProps<{
  status: string;
}>();

const statusChange = (status:string)=>{
  return  status == 'en_cours' ? "text-yellow-600 bg-yellow-50"  :
  status == 'payée' ? "text-green-600 bg-green-50" :
  status == 'annulée'  ? "text-red-600 bg-red-50" :
  status == 'partiellement_payé' ? "text-blue-600 bg-blue-50" :
  status == 'arriérée' && "text-orange-500 bg-orange-50"
 };
</script>

<template>
    <div>
      <div aria-label="status" :class="statusChange(status)" class=" text-center font-medium text-md min-w-[80px] max-w-max  px-3 rounded-md">{{ status }}</div>
    </div>
</template>


<style scoped>

</style>