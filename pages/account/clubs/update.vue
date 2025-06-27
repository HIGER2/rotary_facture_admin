
<script setup>
import { useClubViewModel } from '~/stores/viewModels/clubViewmodel'

const useStore  = useClubViewModel()
const {isLoading} = storeToRefs(useClubViewModel())
const route = useRoute()

definePageMeta({
  breadcrumb: [
    {label:'Clubs',path:"/account/clubs"},
    {label:'Modifier le club',path:null}
  ]
})
const updateClub = async () => {
    let validate = useStore.updateClub.club_personel[0]
    if (validate.name =="" && validate.email == "" && validate.phone =="") {
        alert('Veuillez rensseignez au moin un membre avant de continuer')
        return
    }

    if (!confirm('Voullez vous confirmer cette opération')) {
        return
    }
    await useStore.update()
}

const getClub = async()=>{
    console.log(route.query);
    const response  = await useStore.findByMember(route.query)

    console.log(response);
    
    
}

onBeforeMount(() => {
    getClub()
})
</script>

<template>
    <div>
        <ClubCreateOrUpdate 
        :payload="useStore.updateClub" 
        :loading="isLoading"
        :action="updateClub" 
        :title="'Modifier le club'"
        />
    </div>
</template>

<style lang="scss" scoped>

</style>