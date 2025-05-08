
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useFactureServices } from '../services/factureService';

export const useFactureViewModel = defineStore('FactureViewModel', () => {
   
    const useFacture = useFactureServices();
    
    const factures = ref([]);
    const analityc = ref([]);
    const facture = ref({});
    const isLoading =ref(false)
    let initial = {
        club_id: "",
        rubrique_id: "",
        amount: "",
        date_echeance: "",
        objet: "",
        status:"en attente",
    }
    const newFacture = reactive({...initial});
    const updateFacture = reactive({...initial,id:null});
  
    async function all(queryParams) {
        const data = await useFacture.all(queryParams);
        analityc.value =data?.data?.analytic
        factures.value = [...data.data?.data?.data]
    }
    async function create() {
        isLoading.value= true
        let items={...newFacture}
        const data = await useFacture.create(items);
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
        isLoading.value= false
    }

    async function update() {
        isLoading.value= true
        let items={...updateFacture}
        const data = await useFacture.update(items);
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
        isLoading.value= false
    }

    async function findWithPaiement(reference:string) {
         const data = await useFacture.findWithPaiement(reference);
         facture.value = data?.data?.data
    }

    async function find(reference:string) {
        const data = await useFacture.find(reference);
        Object.assign(updateFacture,data?.data?.data)
    }

    return {
        all,
        factures,
        facture,
        create,
        findWithPaiement,
        newFacture,
        isLoading,
        find,
        updateFacture,
        update,
        analityc
    }
})