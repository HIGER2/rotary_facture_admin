
<script setup lang="ts">
import { useAuthViewModel } from '~/stores/viewModels/authViewmodel';
const {login,authUser,loginWithToken} = useAuthViewModel()
const {isLoading} = storeToRefs(useAuthViewModel())
const route = useRoute()

onMounted(() => {
    if (route?.query?.token) {
        loginWithToken(route?.query?.token)
    }
})
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="min-w-[370px] w-auto ">
            <a href="#" class="flex items-center justify-center">
                <img alt="logo" 
                fetchpriority="high" 
                width="120" height="28.422" decoding="async" data-nimg="1" class="mb-5" 
                src="~/assets/images/logo.svg" 
                style="color: transparent;">
            </a>
            <div class="rounded-xl shadow w-full min-h-auto">
                <div class="flex flex-col space-y-1.5 p-6 px-2 sm:px-6">
                    <h3 class="font-semibold text-center tracking-tight text-2xl">
                        Vérification
                    </h3>
                    <div class="flex items-center justify-center">
                        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>