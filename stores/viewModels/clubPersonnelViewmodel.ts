
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useClubPersonnelServices } from '../services/clubPersonnelService';

export const useClubPersonnelViewModel = defineStore('ClubPersonnelViewModel', () => {
    
    const isLoading = ref(false);
    const useClubPersonnel = useClubPersonnelServices();
    let initial = {
        name: "",
        last_name: "",
        function:"",
        phone:"",
        email: "",
    }
    const newClubPersonnel = reactive({ ...initial });
    

    async function create(item: any) {
        isLoading.value = true
        let items = {
            ...newClubPersonnel,
            club_id: item.id,
            club_uid: item.club_uid
        }
        const data = await useClubPersonnel.create(items);
        reset();
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

    function reset() {
        Object.assign(newClubPersonnel,initial);
    }



    return {
        newClubPersonnel,
        create,
        isLoading,
    }
})