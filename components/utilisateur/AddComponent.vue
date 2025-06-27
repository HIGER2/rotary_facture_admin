

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
                        {{ $t('user.form.title_new') }}
                    </h2>
                </div>
                <form class="" @submit.prevent="createUser()">
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.name"
                        :label="$t('user.form.label1')" 
                        :placeholder="$t('user.form.label1')"
                        />
                        <UiFormInput 
                        required
                        v-model="newUser.last_name"
                        :label="$t('user.form.label2')" 
                        :placeholder="$t('user.form.label2')"
                        />
                    </div>
                    <div class="mb-2">
                        <UiFormSelect 
                            required
                            v-model="newUser.role"
                            :options="optionStatus" 
                            :label="$t('user.form.label3')" 
                            :placeholder="$t('user.form.label3')"
                            name="title" />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.phone"
                        name="annee" min="2025" max="2099" step="1"
                        :label="$t('user.form.label4')" 
                        :placeholder="$t('user.form.label4')"
                        />
                        <UiFormInput 
                        required
                        v-model="newUser.email"
                        :label="$t('user.form.label5')" 
                        :placeholder="$t('user.form.label5')"
                        />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="newUser.password"
                        type="password"
                        name="annee" min="2025" max="2099" step="1"
                        :label="$t('user.form.label6')" 
                        :placeholder="$t('user.form.label6')"
                        />
                    </div>
                    <div class="w-full mt-3">
                        <UiButtonSubmit :label="$t('user.form.button_new')" :isLoading="isLoading"/>    
                    </div>
            </form>
        </div>
            </UiModal>
    </div>
</template>


<style scoped>

</style>