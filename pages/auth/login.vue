
<script setup lang="ts">
import { useAuthViewModel } from '~/stores/viewModels/authViewmodel';
const {login,authUser} = useAuthViewModel()
const {isLoading,messageError} = storeToRefs(useAuthViewModel())
const isActive = ref(1)
const route = useRoute()
const setTabs = (state:string) => {
    authUser.type = state
}
const isSuccess = ref(true)
const setSuccess = (state:boolean) => {
    isSuccess.value = state
}
watch(
  () => route.query.success,
  (newVal, oldVal) => {
    if (newVal === 'true') {
        setSuccess(true)
    }else {
        setSuccess(false)
    }
  },
  { immediate: true })
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center bg-white">
        <div class="w-[380px]  ">
            <a href="#">
                <img alt="logo" 
                fetchpriority="high" 
                width="120" height="28.422" decoding="async" data-nimg="1" class="mb-5" 
                src="~/assets/images/logo.svg" 
                style="color: transparent;">
            </a>
          
            <template v-if="isSuccess">
                <div class="rounded-xl shadow w-full min-h-auto">
                        <div class="flex flex-col space-y-1.5 p-6 px-2 sm:px-6">
                            <h3 class="font-semibold text-center tracking-tight text-2xl">
                                Veuillez vérifier votre e-mail
                            </h3>
                        </div>
                        <div class="p-6 pt-0 px-2 sm:px-6 w-full text-[13px]">
                            <div class="w-full my-5 cursor-pointer h-auto items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400"  style="outline: none;">
                                <p class="text-center">
                                    Nous avons envoyé un lien de connexion
                                </p>
                            </div>
                            <div class="w-full text-center">
                                <h3>Vous ne le trouvez pas ?</h3>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-5">
                                    Vérifiez votre dossier spam ou
                                    <NuxtLink to="/auth/login" class="text-blue-800 underline">réessayez.</NuxtLink>
                                </p>
                            </div>
                        </div>
                </div>
            </template>
            <template v-else>
            <div class="rounded-xl shadow w-full min-h-[400px]">
                    <div class="flex flex-col space-y-1.5 p-6 px-2 sm:px-6">
                        <h3 class="font-semibold tracking-tight text-2xl">Connexion</h3>
                    </div>
                    
                    <div class="p-6 pt-0 px-2 sm:px-6 w-full text-[13px]">
                        <UiAlertError :message="messageError"/>
                        <div class=" w-full my-5 cursor-pointer h-auto items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 "  style="outline: none;">
                                <button @click="setTabs('member')" :data-state="authUser.type == 'member' && 'active'" type="button"   
                                    class="w-[50%]  cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-2  font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                    data-[state=active]:bg-white data-[state=active]:shadow  ">
                                    club
                                </button>
                                <button @click="setTabs('admin')" type="button" :data-state="authUser.type == 'admin' && 'active'" 
                                    class=" w-[50%] text-center cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-2  font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white  data-[state=active]:shadow  " tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
                                    District
                                </button>
                        </div>
                        <div class="grid gap-10">
                            <form class="space-y-8" @submit.prevent="login">
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":r6:-form-item">
                                            Email 
                                        </label>
                                        <input 
                                        v-model="authUser.identifiant"
                                        class="flex h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1
                                        focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50" 
                                        placeholder="Entrez votre email "
                                        id=":r6:-form-item" aria-describedby=":r6:-form-item-description" aria-invalid="false" autocomplete="off">
                                        <!-- <p id=":r6:-form-item-description" class="text-[0.8rem] text-slate-500">
                                            Ajouter l'indicatif du pays si numéro
                                        </p> -->
                                    </div>
                                    <template v-if="authUser.type == 'admin'">
                                        <div class="space-y-2"><div class="flex items-center">
                                                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":r7:-form-item">
                                                    Mot de passe
                                                </label>
                                                <!-- <a class="ml-auto inline-block text-xs underline sm:text-sm" href="/reset-password">
                                                    Mot de passe oublié?
                                                </a> -->
                                            </div>
                                            <input 
                                            v-model="authUser.password"
                                            class="flex h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="Entrez votre mot de passe" id=":r7:-form-item" aria-describedby=":r7:-form-item-description" aria-invalid="false" type="password"  name="password">
                                        </div>
                                    </template>
                                <UiButtonSubmit label="Se connecter" :isLoading="isLoading"/>
                            </form>
                    </div>
                        
                    </div>
            </div>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>