
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
        class=" gap-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34] h-11 px-4 py-2 w-full" 
        >
        <span v-if="props.isLoading" class="loading loading-spinner text-white w-5"></span>
        <span v-else>
            {{ props.label }}
        </span>
    </button>

</template>


<style scoped>

</style>