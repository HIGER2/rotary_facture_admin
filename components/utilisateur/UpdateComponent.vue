

<script setup lang="ts">

const propos = defineProps<{
    isActive:boolean,
    setActive: (state:boolean)=>void,
    update: any,
    updateUser: ()=>void,
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
                       {{ $t('user.form.title_update') }}
                    </h2>
                </div>
                <form class="" @submit.prevent="updateUser()">
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="update.name"
                        :label="$t('user.form.label1')" 
                        :placeholder="$t('user.form.label1')"
                        />
                        <UiFormInput 
                        required
                        v-model="update.last_name"
                        :label="$t('user.form.label2')" 
                        :placeholder="$t('user.form.label2')"
                        />
                    </div>
                    <div class="mb-2">
                        <UiFormSelect 
                            required
                            v-model="update.role"
                            :options="optionStatus" 
                            :label="$t('user.form.label3')" 
                            :placeholder="$t('user.form.label3')"
                            name="title" />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        required
                        v-model="update.phone"
                        name="annee" min="2025" max="2099" step="1"
                        :label="$t('user.form.label4')" 
                        :placeholder="$t('user.form.label4')"
                        />
                        <UiFormInput 
                        required
                        v-model="update.email"
                        :label="$t('user.form.label5')" 
                        :placeholder="$t('user.form.label5')"
                        />
                    </div>
                    <div class=" mb-2 flex gap-1.5">
                        <UiFormInput 
                        v-model="update.password"
                        type="password"
                        name="annee" min="2025" max="2099" step="1"
                        :label="$t('user.form.label6')" 
                        :placeholder="$t('user.form.label6')"
                        />
                    </div>
                    <div class="w-full mt-3">
                        <UiButtonSubmit :label="$t('user.form.button_update')" :isLoading="isLoading"/>    
                    </div>
            </form>
        </div>
            </UiModal>
    </div>
</template>


<style scoped>

</style>