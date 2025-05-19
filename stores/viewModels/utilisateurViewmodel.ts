
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useExercieServices } from '../services/exercieService';

export const useUserViewModel = defineStore('UserViewModel', () => {
    const users = reactive({
        data:[],
        page: []
    });
    const user = ref();
    const isLoading = ref(false);
    const useExercice = useExercieServices();
    let initial = {
        name: "",
        last_name: "",
        phone:"",
        email:"",
        role:"",
        password:"",
    }
    const newUser = reactive({ ...initial });
    const updateUser = reactive({ ...initial, id:""});
    

    async function allByFilter(queryParams ="") {
        const data = await useExercice.allByFilter(queryParams);
        data.data?.data?.links.shift()
        data.data?.data?.links.pop()
        utilisateurs.page = data.data?.data?.links
        utilisateurs.data = [...data.data?.data?.data.map((item:any,index) => (
            {
                id : item?.id,
                uid : item?.exercice_uid,
                annee : item?.annee,
                begin_date : item?.begin_date,
                end_date : item?.end_date,
                status : item?.status,
            }
        ))]
        return data
    }

    async function all(queryParams ="") {
        const data = await useExercice.all(queryParams);
            [...data.data?.data?.map((item:any,index) => (
            {
                id : item?.id,
                uid : item?.exercice_uid,
                annee : item?.annee,
                begin_date : item?.begin_date,
                end_date : item?.end_date,
                status : item?.status,
            }
        ))]

        return data
    }

    async function findDetail(params:any) {
        const data = await useExercice.findDetail(params);
        user.value = data?.data?.data
        return data
    }

    async function create() {
        isLoading.value = true
        let items={...newUser}
        const data = await useExercice.create(items);
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
        let items={...updateExercice}

        console.log('updateExercice',updateExercice);
        const data = await useExercice.update(items);
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
        exercice,
        exercices,
        newExercice,
        create,
        isLoading,
        findDetail,
        allByFilter,
        updateExercice,
        update,
        optionExercice
    }
})