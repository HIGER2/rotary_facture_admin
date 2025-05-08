
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useRubirqueServices } from '../services/rubriqueService';

export const useRubriqueViewModel = defineStore('RubriqueViewModel', () => {
    
    const rubriques = reactive({
        data:[],
        page: []
    });
    const rubrique = ref();
    const isLoading = ref(false);
    const useRubrique = useRubirqueServices();

    let initial = {
        libele: "",
        price:"",
        designation:'',
        status:'actif'
    }
    const newRubrique = reactive({ ...initial });
    const updateRubrique = reactive({ ...initial, id:""});
    
    async function allByFilter(queryParams ="") {
        const data = await useRubrique.allByFilter(queryParams);
        data.data?.data?.links.shift()
        data.data?.data?.links.pop()
        rubriques.page = data.data?.data?.links
        rubriques.data = [...data.data?.data?.data.map((item:any,index) => (
            {
                code : item?.code,
                id : item?.id,
                uid : item?.rubrique_uid,
                libele : item?.libele,
                designation : item?.designation,
                price : item?.price,
                status : item?.status,
            }
        ))]
        return data
    }

    async function all(queryParams ="") {
        const data = await useRubrique.all(queryParams);
            [...data.data?.data?.map((item:any,index) => (
            {
                code : item?.code,
                id : item?.id,
                uid : item?.rubrique_uid,
                libele : item?.libele,
                designation : item?.designation,
                price : item?.price,
                status : item?.status,
            }
        ))]

        return data
    }

    async function findDetail(params:any) {
        const data = await useRubrique.findDetail(params);
        rubrique.value = data?.data?.data
        return data
    }

    async function create() {
        isLoading.value = true
        let items={...newRubrique}
        const data = await useRubrique.create(items);
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
        let items={...updateRubrique}

        const data = await useRubrique.update(items);
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
        rubrique,
        rubriques,
        newRubrique,
        create,
        isLoading,
        findDetail,
        allByFilter,
        updateRubrique,
        update
    }
})