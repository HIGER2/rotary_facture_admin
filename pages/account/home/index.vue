

<script setup lang="ts">
import { useUserViewModel } from '~/stores/viewModels/userViewmodel'


const  userStore=useUserViewModel()
const handleSats = async() => {
    await userStore.analityc()
}

onMounted(() => {
    handleSats() 
})
</script>

<template>
    <div>
    <NuxtLayout>
    <div class="w-full">
       <div class="p-2">
         <h5 class="text-sm font-semibold uppercase text-neutral-500">Tableau de bord</h5>
       </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
         <template v-for="(item, index) in userStore?.stats?.analityc" :key="index">
            <div class="box">
                <span class="text-black text-xs font-bold">{{ item?.label }}</span>
                <h2 class="text-lg font-extrabold">{{ item?.value }}</h2>
            </div>
         </template>
       </div>
       <div class="w-full p-2">
            <FactureTableComponent :data="userStore?.stats?.data"/>
        </div>
    </div>

        </NuxtLayout>
    </div>
</template>


<style scoped>

</style>