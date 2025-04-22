<template>
    <div>
        <NuxtLayout>
        <div class="w-full">
            <div class="w-full p-2 mb-3">
                <h5 class="text-sm font-semibold uppercase text-neutral-500">Créer une facture</h5>
            </div>
            <div class="w-full p-2">
                <div class="max-w-3xl">
                    <div class="w-full">
                        <div class="space-y-2 mb-4">
                            <UiFormInput label="Nom produit" placeholder="Entrez le nom du produit" name="title" />
                        </div>
                         <div class="space-y-2 mb-4">
                            <UiFormInput label="Nom produit" placeholder="Entrez le nom du produit" name="title" />
                        </div>
                         <div class="space-y-2 mb-4">
                            <UiFormInput label="Nom produit" placeholder="Entrez le nom du produit" name="title" />
                        </div>
                         <div class="space-y-2 mb-4">
                            <UiFormInput label="Nom produit" placeholder="Entrez le nom du produit" name="title" />
                        </div>
                       
                    </div>
                    <div class="flex justify-between">
                        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-11 px-4 py-2" type="button">
                            Annuler
                        </button>
                        <button class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34] h-11 px-4 py-2" type="submit">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>

        </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>