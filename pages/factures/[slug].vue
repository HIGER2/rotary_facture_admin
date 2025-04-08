<template>
    <div>
        <NuxtLayout>
            <div class="w-full">
                    <section>
                        <div class="px-4 sm:px-0">
                            <h3 class="text-base font-semibold leading-7 text-gray-900">Général</h3>
                            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Détail de la facture</p>
                        </div>
                        <div class="mt-6 border-t border-gray-100">
                            <dl class="divide-y divide-gray-100">
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">
                                        Statut
                                    </dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div class="inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 dark:text-slate-50 bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                            Actif
                                        </div>
                                    </dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">
                                        Montant du produit
                                    </dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        10 000 XOF
                                    </dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        ZEFZEFZEFE
                                    </dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">
                                        Date de création
                                    </dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        03/04/2025, 08:16
                                    </dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">
                                        Mis à jour le
                                    </dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        03/04/2025, 08:16
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                    <section>
                        <div class="px-4 sm:px-0 flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-7 text-gray-900">Paiement</h3>
                            <button 
                            class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none text-xs disabled:opacity-50 bg-[#1F2923] text-slate-50 shadow hover:bg-[#2f3a34]  px-4 py-3 self-start"
                            >
                                Nouveau paiement
                            </button>
                        </div>
                        <div class="mt-6 border-t border-gray-100">
                            <UiDynamicTable :rowClick="()=>navigateTo('/factures/2')" :columns="columns" :data="data"/>
                        </div>
                    </section>
                    <!-- <section>
                        <div class="px-4 sm:px-0">
                            <h3 class="text-base font-semibold leading-7 text-gray-900">Paiemtn</h3>
                        </div>
                        <div class="mt-6 border-t border-gray-100">
                            <UiDynamicTable :rowClick="()=>navigateTo('/factures/2')" :columns="columns" :data="data"/>
                        </div>
                    </section> -->
            </div>
        </NuxtLayout>
    </div>
</template>

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

<style scoped>

</style>