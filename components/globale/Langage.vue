
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const changeLanguage = (event) => {
    setLocale(event.target.value); // Change la langue en fonction de la sélection du select
};

</script>

<template>
    <div>
        <div  class="flex items-center gap-2
        cursor-pointer
        rounded-full 
        border-1 border-slate-200 p-1 px-2">
            <span><i class="uil text-xl uil-english-to-chinese cursor-pointer"></i></span>
            <select 
            :value="locale"
            @change="changeLanguage"
            id="lang" class=" outline-0 capitalize">
                <option
                v-for="(item, index) in locales" :key="index"
                :value="item?.code">{{ item?.code }}</option>
            </select>
        </div>
    </div>
</template>


<style scoped>

</style>