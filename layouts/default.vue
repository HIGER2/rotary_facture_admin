
<script setup lang="ts">
import { useAuthViewModel } from '~/stores/viewModels/authViewmodel';

const storeAuth = useAuthViewModel()
const { locale, locales, setLocale } = useI18n()
const changeLanguage = (event) => {
    setLocale(event.target.value); // Change la langue en fonction de la sélection du select
};
const isOpen = ref(false)
const setOpen = (state:boolean) => {
    isOpen.value = state
}
const connected = async () => {
    await storeAuth.conntected()
    provide('userConnected', storeAuth.userConnected)
}

const router = {
    admin: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/clubs", name: "sidebar.clubs", ico: `<i class="uil uil-cube text-xl"></i>` },
    { path: "/account/factures", name: "sidebar.invoices", ico: `<i class="uil uil-invoice text-xl"></i>` },
    // { path: "/account/exercice", name: "sidebar.exercises", ico: `<i class="uil uil-clipboard-notes text-xl"></i>` },
    { path: "/account/rubrique", name: "sidebar.categories", ico: `<i class="uil uil-wall text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` },
    { path: "/account/rapport", name: "sidebar.reports", ico: `<i class="uil uil-chart text-xl"></i>` }
  ],
  super_admin: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/clubs", name: "sidebar.clubs", ico: `<i class="uil uil-cube text-xl"></i>` },
    { path: "/account/factures", name: "sidebar.invoices", ico: `<i class="uil uil-invoice text-xl"></i>` },
    // { path: "/account/exercice", name: "sidebar.exercises", ico: `<i class="uil uil-clipboard-notes text-xl"></i>` },
    { path: "/account/rubrique", name: "sidebar.categories", ico: `<i class="uil uil-wall text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` },
    { path: "/account/rapport", name: "sidebar.reports", ico: `<i class="uil uil-chart text-xl"></i>` }
  ],
  club: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/factures", name: "sidebar.invoices", ico: `<i class="uil uil-invoice text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` }
  ]
}
onMounted(() => {
    connected()
})
</script>

<template>
    <div>
        <!-- {{storeAuth.userConnected?.role}} -->
        <main class="w-full h-screen flex overflow-hidden">
            <nav class="w-[240px] h-screen bg-black border-r border-r-gray-200">
                <div class="flex flex-col h-full p-4">
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
                <nav class="w-full h-[60px] p-4  flex justify-between items-center border-b border-b-gray-200">
                    <!-- <span>Tableau de bord</span> -->
                     <div>
                        <GlobaleBreadcrumb/>
                     </div>
                    <div class="w-auto flex gap-2 ">
                        <label for="#lang" class="flex items-center gap-2
                        cursor-pointer
                        rounded-full 
                        border-1 border-slate-200 p-1 px-2">
                            <span><i class="uil text-xl uil-english-to-chinese cursor-pointer"></i></span>
                            <select 
                            :value="locale"
                            @change="changeLanguage"
                            id="lang" class=" outline-0 capitalize">
                                <option
                                v-for="(item, index) in locales" :key="index"
                                :value="item?.code">{{ item?.code }}</option>
                            </select>
                        </label>
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
                            border-1 border-slate-200 flex  items-center bg-white  hover:bg-slate-100 hover:text-slate-900 
                            px-2 
                            text-xl
                            ">
                            <i class="uil  uil-user"></i>
                            <i class="uil uil-bars"></i>
                            </button>
                            <div 
                            :class="{'hidden': !isOpen}"
                            class="min-w-45 z-50 rounded-lg p-2 absolute right-0 top-[140%] bg-white shadow-sm min-h-1">
                                <li class="w-full  cursor-pointer ">
                                        <NuxtLink 
                                        to="/account/utilisateur"
                                        class="cursor-pointer lex items-center block gap-2 p-2 hover:bg-gray-100 rounded-md w-full">
                                        <i class="uil uil-user"></i> Utilisateurs
                                        </NuxtLink>
                                </li>
                                <li class="w-full  cursor-pointer ">
                                        <button type="button"
                                            @click="storeAuth.logout()"
                                        class="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100 rounded-md w-full">
                                        <i class="uil uil-signout"></i> {{ $t('logout') }}
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