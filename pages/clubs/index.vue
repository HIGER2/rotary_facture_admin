

<script setup lang="ts">

const columns = [
    { label: 'N°Facture', key: 'n' },
    { label: 'Club', key: 'club' },
    { label: 'Montant', key: 'amount' },
    { label: 'restet à payer', key: 'amount_rest' },
    { label: 'statut', key: 'status' },
    { label: 'date émission', key: 'date' },
]
const data = [
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
    {n:"16545646",club:"16545646",amount:"10000",amount_rest:"1000",status:"16545646",date:"16545646" },
]
</script>

<template>
    <div>
    <NuxtLayout>
    <div class="w-full">
        <div class="w-full p-2">
            <div class="w-full">
                <div class="w-full flex items-center justify-between mb-10">
                    <h5 class="text-sm font-semibold uppercase text-neutral-500">Clubs</h5>
                    <div class="w-auto">
                        <NuxtLink 
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                        to="clubs/create"
                        >
                            Ajouter un club
                        </NuxtLink>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between mb-3 ">
                    <div class="w-auto">
                        <input 
                        class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]" placeholder="Recherche transactions..." value="" autocomplete="off">
                    </div>
                    <div class="w-auto gap-2 flex items-center justify-between">
                        <select class="flex rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[120px]">
                            <option value="">Tous</option>
                            <option value="">Clubs</option>
                            <option value="">Partenaires</option>
                        </select>
                        <button class="inline-flex items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 rounded-full px-3 text-xs h-8 w-full justify-start">
                            <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8.5v6"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.5l3 3 3-3"></path>
                            </svg>
                            Télécharger
                        </button>
                    </div>
                </div>
            </div>
            <UiDynamicTable :rowClick="()=>navigateTo('/clubs/2')" :columns="columns" :data="data"/>
        </div>
    </div>
    <div data-state="open" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" data-aria-hidden="true" aria-hidden="true" style="pointer-events: auto;">
        <div role="dialog" id="radix-:r6v:" aria-describedby="radix-:r71:" aria-labelledby="radix-:r70:" data-state="open" class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg sm:max-w-[425px]" tabindex="-1" style="pointer-events: auto;"><div class="flex flex-col space-y-1.5 text-center sm:text-left"><h2 id="radix-:r70:" class="text-lg font-semibold leading-none tracking-tight">Créer une clé API</h2><p id="radix-:r71:" class="text-sm text-slate-500 dark:text-slate-400">Entrez le nom de la clé pour la créer.</p></div><form class="space-y-8"><div class="space-y-2"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":r7k:-form-item">Nom</label><input class="flex h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 col-span-3" id="name" placeholder="my-api-key" aria-describedby=":r7k:-form-item-description" aria-invalid="false" value="" name="name" autocomplete="off"></div><button class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34] h-11 px-4 py-2 w-full" type="submit" aria-disabled="false">Créer</button></form><button type="button" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="24" height="24" focusable="-1" fill="currentColor" aria-hidden="false" aria-label="cross" role="img" class="h-4 w-4"><path fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clip-rule="evenodd"></path></svg><span class="sr-only">Close</span></button></div>
    </div>
</NuxtLayout>
    </div>
</template>


<style scoped>

</style>