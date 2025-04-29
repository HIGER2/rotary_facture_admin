
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useClubServices } from '../services/clubService';

export const useClubViewModel = defineStore('ClubViewModel', () => {
    
    const clubs = ref([]);
    const club = ref();
    const isLoading = ref(false);
    const useClub = useClubServices();
    let initial = {
        name: "",
        pays: "",
        status:""
    }
    const newClub = reactive({ ...initial });
    

    async function allByFilter(queryParams ="") {
        const data = await useClub.allByFilter(queryParams);
        clubs.value = [...data.data?.data?.data.map((item:any,index) => (
            {
                id : item?.id,
                uid : item?.club_uid,
                name : item?.name,
                language : item?.language,
                desc : item?.description,
                country : item?.country,
            }
        ))]

        return data
    }

    async function all(queryParams ="") {
        const data = await useClub.all(queryParams);
            [...data.data?.data?.map((item:any,index) => (
            {
                id : item?.id,
                uid : item?.club_uid,
                name : item?.name,
                language : item?.language,
                desc : item?.description,
                country : item?.country,
            }
        ))]

        return data
    }

     async function findDetail(params:any) {
        const data = await useClub.findDetail(params);
        club.value = data?.data?.data
        return data
    }

    async function create() {
        isLoading.value = true
        let items={...newClub}
        const data = await useClub.create(items);
          useToastify("Opération éffectuée", {
             autoClose: 1000,
            type: ToastifyOption.TYPE.SUCCESS,
            // position: ToastifyOption.POSITION.TOP_RIGHT,
            // transition: ToastifyOption.TRANSITIONS.,
            // theme: ToastifyOption.THEME.LIGHT,
        });
        isLoading.value = false

    }
    return {
        all,
        club,
        clubs,
        newClub,
        create,
        isLoading,
        findDetail,
        allByFilter
    }
})