

<script setup lang="ts">

const props = defineProps<{
  status: string;
}>();

const statusChange = (status:string)=>{
  return  status == 'courante' ? "text-yellow-600 bg-yellow-50"  :
  status == 'arriérée' && "text-orange-500 bg-orange-50"
 };
</script>

<template>
    <div>
      <div aria-label="status" :class="statusChange(status)" class=" text-center  font-medium text-md min-w-[80px] max-w-max  px-3 rounded-md">{{ status }}</div>
    </div>
</template>


<style scoped>

</style>