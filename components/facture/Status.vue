

<script setup lang="ts">

const props = defineProps<{
  status: string;
}>();

const statusChange = (status:string)=>{
  return  status == 'brouillon' ? "text-blue-600 bg-blue-50" :
  status == 'courante' ? "text-yellow-600 bg-yellow-50"  :
  status == 'arriere' && "text-orange-500 bg-orange-50"
 };

 const text = (status:string)=>{
  return status == 'brouillon'? 'brouillon': status == 'courante' ? "courante" :
  status == 'arriere'  && "arriérée";
  }
</script>

<template>
    <div>
      <div aria-label="status" :class="statusChange(status)" class=" text-center  font-medium text-md min-w-[80px] max-w-max  px-3 rounded-md">{{ text(status) }}</div>
    </div>
</template>


<style scoped>

</style>