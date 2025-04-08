
<script setup lang="ts">
 interface typeProps{
    label?: string;
    isLoading?: boolean;
}
const props = defineProps<typeProps>();
</script>

<template>
     <button
     :disabled="isLoading"
        type="submit"
        class="w-full p-3 px-4 flex justify-center relative border border-transparent  my-3 disabled:shadow-none  disabled:border-transparent items-center text-xs font-semibold gap-1 transition-all shadow-sm active:scale-95 disabled:select-none rounded-md bg-green-500 text-zinc-50 hover:bg-green-600"
        >
        <svg v-if="props.isLoading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="3"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>
         <span v-else>
            {{ props.label }}
        </span>
    </button>

</template>


<style scoped>

</style>