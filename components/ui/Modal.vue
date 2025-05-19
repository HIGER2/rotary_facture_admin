
<script setup lang="ts">

const props = defineProps<{
    isActive: boolean,
    onClose: () => void | null | undefined
}>()

</script>


<template>
    <div v-if="isActive" @click="onClose" data-state="open" class="fixed flex items-center justify-center overflow-y-auto h-screen cursor-pointer inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" >
        <div @click.stop="" 
        class=" z-50 grid relative bg-white w-full   gap-4 border border-slate-200 h-auto p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg sm:max-w-[425px]" tabindex="-1" style="pointer-events: auto;">
            <button @click="onClose" type="button" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="24" height="24" focusable="-1" fill="currentColor" aria-hidden="false" aria-label="cross" role="img" class="h-4 w-4">
                <path fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clip-rule="evenodd">
                </path></svg><span class="sr-only">
                    Close
                </span>
            </button>
            <div class="min-w-auto">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>