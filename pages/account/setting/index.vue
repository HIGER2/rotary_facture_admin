

<script setup lang="ts">
import { SettingCurrenryComponent, SettingUserComponent } from '#components'


definePageMeta({
  breadcrumb: 'Paramètres'
})



const isActive=ref(1)
const component = {
    1:SettingUserComponent,
    2:SettingCurrenryComponent
}
const setTabs=(state:number)=>{
    isActive.value =state
}
</script>

<template>
    <div>
        <NuxtLayout v-slot="{userConnected}">
            <!-- <SettingButtonTabsComponent :setTabs="setTabs" :is-active="isActive" /> -->
            <div class="w-full">
                <component :is="component[isActive]"></component>
            </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>