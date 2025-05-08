
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useClubServices } from '../services/clubService';

export const useClubViewModel = defineStore('ClubViewModel', () => {
    
    const clubs = reactive({
        data:[],
        page: []
    });
    const club = ref();
    const isLoading = ref(false);
    const useClub = useClubServices();
    let initial = {
        name: "",
        country_id: "",
        status:""
    }
    const newClub = reactive({ ...initial });
    const updateClub = reactive({ ...initial, id:""});
    

    async function allByFilter(queryParams ="") {
        const data = await useClub.allByFilter(queryParams);
      
        data.data?.data?.links.shift()
        data.data?.data?.links.pop()
        clubs.page = data.data?.data?.links
        console.log(data.data?.data?.data);
        clubs.data = [...data.data?.data?.data.map((item:any,index) => (
            {
                id : item?.id,
                uid : item?.club_uid,
                name : item?.name,
                language : item?.country?.langage,
                desc : item?.description,
                country : item?.country?.name,
                country_id : item?.country?.id,
                status : item?.status,
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
        if (data?.error) {
            alert(data?.error?.message)
        }
        if (data?.data) {
            useToastify("Opération éffectuée", {
                autoClose: 1000,
                type: ToastifyOption.TYPE.SUCCESS,
                // position: ToastifyOption.POSITION.TOP_RIGHT,
                // transition: ToastifyOption.TRANSITIONS.,
                // theme: ToastifyOption.THEME.LIGHT,
            });
        }
        isLoading.value = false

    }

    async function update() {
        isLoading.value = true
        let items={...updateClub}

        console.log('updateClub',updateClub);
        const data = await useClub.update(items);
        if (data?.error) {
            alert(data?.error?.message)
        }
        if (data?.data) {
            useToastify("Opération éffectuée", {
                autoClose: 1000,
                type: ToastifyOption.TYPE.SUCCESS,
                // position: ToastifyOption.POSITION.TOP_RIGHT,
                // transition: ToastifyOption.TRANSITIONS.,
                // theme: ToastifyOption.THEME.LIGHT,
            });
        }
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
        allByFilter,
        updateClub,
        update
    }
})