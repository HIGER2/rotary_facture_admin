<template>
    <div>
        <main class="w-full h-screen flex overflow-hidden">
            <nav class="w-[240px] h-screen bg-sidebar border-r border-r-gray-200">
                <div class="flex flex-col h-full p-4">
                    <div class="flex p-2">
                        <img src="~/assets/images/logo.svg" alt="Logo" class="w-25" />
                    </div>
                    <div class="w-full mt-3">
                        <ul class="w-full">
                            <li class="w-full ">
                                <NuxtLink to="/" class="link">
                                    <i class="uil uil-estate"></i>
                                   <span> Tableau de bord</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/clubs" class="link">
                                    <i class="uil uil-cube"></i>
                                    <span>Clubs</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/factures" class="link">
                                    <i class="uil uil-invoice"></i>
                                    <span>Factures</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="" class="link">
                                    <i class="uil uil-wall"></i>
                                    <span> Rubriques</span>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/payments" class="link">
                                    <i class="uil uil-money-stack"></i>
                                     <span>Paiements</span>
                                </NuxtLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
            <div class="flex-1  bg-white ">
                <div class="w-full h-full">
                <nav class="w-full h-[60px] p-4 border-b border-b-gray-200">
                    <span>Tableau de bord</span>
                </nav>     
                <div class="w-full h-[calc(100vh-60px)] p-4 overflow-y-auto">
                    <slot />
                </div> 
                </div>      
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>