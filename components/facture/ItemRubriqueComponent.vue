
<script setup lang="ts">

const props = defineProps({
    newRubrique: {
        type: Array,
        required: true
    },
    rubrique: {
        type: Array,
        required: true
    },
    removeRubrique: {
        type: Function,
        required: true
    }
})


function onCreate(item: string,index) {
    console.log(item,index);
    let exist = props.newRubrique.find((i)=>i.rubrique_id ==item.id)
    if (exist) {
        alert('Vous avez deja selectionnee cette rubrique')
        return;
    }
    props.newRubrique[index].rubrique_id = item?.id
    props.newRubrique[index].price = item?.price
    props.newRubrique[index].libele = item?.label
    props.newRubrique[index].priority = item?.priority
}


</script>



<template>
    <div class="w-full border-b border-b-gray-200" 
            v-for="(item, index) in newRubrique" :key="index">
            <!-- {{ rubrique }} -->
            <button 
                @click="removeRubrique(index)"
                type="button"
                class="
                mt-2
                mx-auto cursor-pointer
                text-[13px] 
                rounded-lg border border-slate-200 bg-transparent p-2
                shadow-xs transition-colors file:border-0 file:bg-transparent
                ">
                {{ $t('facture.form.delete') }}
                </button>
            <div class=" flex justify-end items-end gap-1.5">
                <div class="space-y-2 ">
                    <!-- {{item.libele}} -->
                    <label for="" class="text-[13px] font-[500] text-zinc-700">{{$t('facture.form.label3')}}</label>
                    <USelectMenu 
                    required
                    @update:model-value="(item)=>onCreate(item,index)"
                    placeholder="Rechercher..."
                    class=" h-11 w-60 !mb-0 rounded-lg  bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                    :items="rubrique" 
                    />
                    <!-- <UiFormInput 
                    required
                    v-model="item.libele"
                    :label="$t('facture.form.label3')" 
                    :placeholder="$t('facture.form.label3')" 
                    name="title" /> -->
                </div>
                <div class="space-y-2">
                    <UiFormInput 
                    required
                    v-model="item.quantity"
                    type="number" 
                    :label="$t('facture.form.label4')"
                    :placeholder="$t('facture.form.label4')" name="title" />
                </div>
                <div class="space-y-2 ">
                    <UiFormInput 
                    required
                    readonly
                    v-model="item.price"
                    type="number" 
                    :label="$t('facture.form.label5')"
                    :placeholder="$t('facture.form.label5')" 
                    name="title" />
                </div>
            </div>
            <div class="space-y-2 mb-4">
                    <div class="flex w-full flex-col justify-start gap-1">
                        <label  class="text-[13px] font-[500] text-zinc-700">
                        </label>
                        <UiFormTextArea
                        v-model="item.designation"
                        :label="$t('facture.form.label6')"
                        :placeholder="$t('facture.form.label6')" 
                        rows="3"
                        />
                    </div>
                </div>
            </div>
</template>

<style scoped>

</style>