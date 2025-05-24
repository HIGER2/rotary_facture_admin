
<script setup lang="ts">

 interface typeProps{
    label?: string;
    isLoading?: boolean;
}
const props = defineProps<typeProps>();
const attrs = useAttrs()

</script>

<template>
    <button
        v-bind="$attrs"
        :disabled="isLoading"
        class=" gap-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1  bg-[#1F2923] text-slate-50   h-11 px-4 py-2 w-full" 
        >
        <span v-if="props.isLoading" class="loading loading-spinner text-white w-5"></span>
        <span v-else>
            {{ props.label }}
        </span>
    </button>

</template>


<style scoped>

</style>