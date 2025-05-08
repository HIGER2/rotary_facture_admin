

<script setup lang="ts">
defineProps<{
    message: string | null
}>()
</script>


<template>
    <div v-if="message">
        <div class="w-full p-2 py-3 font-semibold text-center rounded-md text-red-600 text-[13px] bg-red-50">
            <p>{{ message }}</p>
        </div>
    </div>
</template>


<style scoped>

</style>