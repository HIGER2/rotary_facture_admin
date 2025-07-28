
<script setup lang="ts">
import { useAuthViewModel } from '~/stores/viewModels/authViewmodel';
import { useAuthStores } from "~/stores/auth";


const storeAuth = useAuthViewModel()
const {router} =useAuthStores()

const isOpen = ref(false)
const setOpen = (state:boolean) => {
    isOpen.value = state
}
const connected = async () => {
    await storeAuth.conntected()
    provide('userConnected', storeAuth.userConnected)
}

onMounted(() => {
    // connected()
})
</script>

<template>
    <div>
        <!-- {{storeAuth.userConnected?.role}} -->
        <main class="w-full h-screen flex overflow-hidden">
            <nav class="w-[240px] h-screen bg-sidebar border-r border-r-gray-200">
                <div class="flex flex-col h-full px-4">
                    <div class="flex p-2">
                        <img src="~/assets/images/logo.svg" alt="Logo" class="w-28  " />
                    </div>
                    <div class="w-full mt-3">
                        <ul class="w-full">
                            <li class="w-full "
                            v-for="(item, index) in router[storeAuth.userConnected?.role]" :key="index"
                            >
                                <NuxtLink :to="item?.path" class="link">
                                    <div v-html="item?.ico"> </div>
                                    <!-- <i class="uil uil-estate text-xl"></i> -->
                                    <span> {{ $t(item?.name) }}</span>
                                </NuxtLink>
                            </li>
                            <!-- 
                            <li>
                                <NuxtLink to="/account/factures" class="link">
                                    <i class="uil uil-invoice text-xl"></i>
                                    <span>Factures</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/account/rubrique" class="link">
                                    <i class="uil uil-wall text-xl"></i>
                                    <span> Rubriques</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/account/payments" class="link">
                                    <i class="uil uil-money-stack text-xl"></i>
                                    <span>Paiements</span>
                                </NuxtLink>
                            </li> -->

                        </ul>

                    </div>
                </div>
            </nav>
            <div class="flex-1 max-w-[calc(100%-240px)] bg-white ">
                <div class="w-full h-full">
                <nav class="w-full bg-white  h-[60px] p-4  flex justify-between items-center border-b border-b-gray-200">
                    <!-- <span>Tableau de bord</span> -->
                     <div>
                        <GlobaleBreadcrumb/>
                     </div>
                    <div class="w-auto flex gap-2 ">
                        <GlobaleLangage />
                        
                        <div class="relative">
                            <button 
                            @click="setOpen(!isOpen)"
                            type="button"
                            class="
                            p-[4px]
                            w-15
                            cursor-pointer 
                            rounded-full 
                            justify-between
                            border-1 text-gray-200 flex  items-center bg-primary  
                            px-2 
                            text-xl
                            ">
                            <i class="uil uil-bars"></i>
                            <i class="uil  uil-user"></i>
                            </button>
                            <div 
                            :class="{'hidden': !isOpen}"
                            class="min-w-45 z-50 rounded-lg p-2 absolute right-0 top-[140%] bg-white shadow-sm min-h-1">
                                <li class="w-full  cursor-pointer " v-if=" storeAuth.userConnected?.role!=='club'">
                                    {{ storeAuth.userConnected?.role }}
                                    <NuxtLink 
                                    to="/account/setting"
                                    class="cursor-pointer flex items-center  gap-2 p-2 hover:bg-gray-100 rounded-md w-full">
                                    <!-- <i class="uil uil-user"></i>  -->
                                    <i class="uil uil-sliders-v-alt"></i>
                                    <span>{{ $t('navbar.btn2.setting') }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="w-full  cursor-pointer ">
                                        <button type="button"
                                            @click="storeAuth.logout()"
                                        class="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100 rounded-md w-full">
                                        <i class="uil uil-signout"></i>
                                        <span>{{ $t('navbar.btn2.logout') }}</span>
                                    </button>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>     
                <div class="w-full h-[calc(100vh-60px)] p-4  overflow-y-auto">
                    <template v-if="storeAuth.userConnected">
                        <slot :userConnected="storeAuth.userConnected" />
                    </template>
                </div> 
                </div>      
            </div>
        </main>
    </div>
</template>


<style scoped>

</style>