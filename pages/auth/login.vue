
<script setup lang="ts">
import { useAuthViewModel } from '~/stores/viewModels/authViewmodel';
const { authUser,login} = useAuthViewModel()
const {isLoading} = storeToRefs(useAuthViewModel())

</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-[370px] ">
            <a href="https://lygosapp.com">
                <img alt="logo" 
                fetchpriority="high" 
                width="120" height="28.422" decoding="async" data-nimg="1" class="mb-5" src="~/assets/images/logo.svg" 
                style="color: transparent;"></a>
            <div class="rounded-xl shadow w-full">
                    <div class="flex flex-col space-y-1.5 p-6 px-2 sm:px-6">
                        <h3 class="font-semibold tracking-tight text-2xl">Connexion</h3>
                    </div>
                    <div class="p-6 pt-0 px-2 sm:px-6">
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
                            <UiButtonSubmit label="Se connecter" :isLoading="isLoading"/>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>