
<script setup lang="ts">
import { ClubFactureComponent, ClubPaymentComponent, ClubPersonelComponent } from '#components'
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel'

definePageMeta({
  breadcrumb: 'Détail du club'
})
const storeClub = useClubViewModel()
const isActive = ref(1)

const setTabs = (state:number) => {
    isActive.value = state
}
const handleDetails =async () => {
    const route = useRoute()
    await storeClub.findDetail(route?.query) 
}

const tabs = {
    1: ClubPersonelComponent,
    2: ClubFactureComponent,
    3: ClubPaymentComponent,
}

provide('handleDetails', handleDetails)

onMounted(() => {
    handleDetails()
})
</script>


<template>
    <div>
        <NuxtLayout v-slot="{userConnected}">
            <div class="w-full p-2">
                <ClubDetailComponent :data="storeClub?.club" />
                <ClubButtonTabsComponent :isActive="isActive" :setTabs="setTabs" />

                <keep-alive>
                 <component :is="tabs[isActive]" :user="userConnected" :data="storeClub?.club" />
                </keep-alive>
            </div>
        </NuxtLayout>
    </div>
</template>

<style scoped>

</style>