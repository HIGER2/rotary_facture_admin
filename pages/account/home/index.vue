

<script setup lang="ts">
import { useUserViewModel } from '~/stores/viewModels/userViewmodel'


const  userStore=useUserViewModel()
const loading=ref(false)
const handleSats = async() => {
    if (userStore?.stats?.data?.length == 0) {
        loading.value = true
    }
    await userStore.analityc()
    loading.value = false
}

const user =inject('userConnected')
onMounted(() => {
    handleSats() 
})
</script>

<template>
    <div>
    <NuxtLayout v-slot="{ userConnected }">
    <div class="w-full">
       <div class="p-2">
         <h5 class="text-sm font-semibold uppercase text-neutral-500">Tableau de bord</h5>
       </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
         <template v-for="(item, index) in userStore?.stats?.analityc" :key="index">
            <div class="box">
                <span class="text-xs text-gray-500 font-medium">{{ item?.label }}</span>
                <h2 class="text-lg font-extrabold">{{ item?.value }}</h2>
            </div>
         </template>
       </div>
       <div class="w-full p-2">
            <FactureTableComponent :loading="loading" :user="userConnected" :data="userStore?.stats?.data"/>
        </div>
    </div>

    </NuxtLayout>
    </div>
</template>


<style scoped>

</style>