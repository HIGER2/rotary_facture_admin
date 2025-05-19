

<script setup lang="ts">

const props = defineProps<{
    data:any,
}>()
const isActive = ref(false)
const setActive = (state: boolean) => {
    isActive.value = state
}
const columns = [
    { label: '#', key: 'id' },
    { label: 'club.personnel.colunm.td1', key: 'name' },
    // { label: 'club.personnel.colunm.td2', key: 'last_name' },
    { label: 'club.personnel.colunm.td3', key: 'function' },
    { label: 'club.personnel.colunm.td4', key: 'email' },
    { label: 'club.personnel.colunm.td5', key: 'phone' },
]


</script>


<template>
    <div class="w-full">
                <!-- <pre>
                    {{ data?.personels }}
                </pre> -->
            <div class="px-4 sm:px-0 flex items-center justify-between">
                <h3 class="text-base font-semibold leading-7 text-gray-900">
                    {{ $t('club.personnel.title') }}
                </h3>
                <button 
                @click="setActive(true)"
                class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                >
                {{ $t('club.personnel.button') }}
                </button>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <UiDynamicTable  :columns="columns" :data="data?.personels"/>
            </div>
            <ClubAddPersonelComponent :data="data" :setActive="setActive" :isActive="isActive"/>
    </div>
</template>

<style scoped>

</style>