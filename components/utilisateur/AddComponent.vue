

<script setup lang="ts">

const propos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    newUser: any,
    createUser: ()=>void,
    isLoading: boolean
}>()

const optionStatus = [
    { label: 'admin', value:"admin"},
    { label: 'super admin', value:"super_admin"},
    { label: 'modérateur', value:"modérateur"},
]
</script>

<template>
    <div>
        <UiModal :isActive="isActive" :onClose="()=>setActive(false)">
        <div  class=" grid  w-full max-w-300  gap-4">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">
                        Nouveau utilisateur
                    </h2>
                </div>
                <form class="" @submit.prevent="createUser()">
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.name"
                        :label="'Nom'" 
                        :placeholder="'Nom'"
                        />
                        <UiFormInput 
                        required
                        v-model="newUser.last_name"
                        :label="'Prénoms'" 
                        :placeholder="'Prénoms'"
                        />
                    </div>
                    <div class="mb-2">
                        <UiFormSelect 
                            required
                            v-model="newUser.role"
                            :options="optionStatus" 
                            :label="'Role'" 
                            :placeholder="'Role'"
                            name="title" />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.phone"
                        name="annee" min="2025" max="2099" step="1"
                        :label="'Téléphone'" 
                        :placeholder="'Téléphone'"
                        />
                        <UiFormInput 
                        required
                        v-model="newUser.email"
                        :label="'Email'" 
                        :placeholder="'Email'"
                        />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.password"
                        type="password"
                        name="annee" min="2025" max="2099" step="1"
                        :label="'Mot de passe temporaire'" 
                        :placeholder="'Mot de passe temporaire'"
                        />
                    </div>
                    <div class="w-full mt-3">
                        <UiButtonSubmit :label="$t('exercice.form.button_new')" :isLoading="isLoading"/>    
                    </div>
            </form>
        </div>
            </UiModal>
    </div>
</template>


<style scoped>

</style>