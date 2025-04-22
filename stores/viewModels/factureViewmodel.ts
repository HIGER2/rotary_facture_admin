
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useFactureServices } from '../services/factureService';

export const useFactureViewModel = defineStore('FactureViewModel', () => {
   
    const useFacture = useFactureServices();
    
    const factures = ref([]);
    const facture = ref({});
    const isLoading =ref(false)
    let initial = {
        club_id: "",
        amount: "",
        date_echeance: "",
        objet: "",
        status:"",
    }
    const newFacture = reactive({...initial});
  
    async function all(queryParams) {
        const data = await useFacture.all(queryParams);
        factures.value = [...data.data?.data]
    }
    async function create() {
        isLoading.value= true
        let items={...newFacture}
        const data = await useFacture.create(items);
          useToastify("Opération éffectuée", {
             autoClose: 1000,
            type: ToastifyOption.TYPE.SUCCESS,
            // position: ToastifyOption.POSITION.TOP_RIGHT,
            // transition: ToastifyOption.TRANSITIONS.,
            // theme: ToastifyOption.THEME.LIGHT,
        });
        isLoading.value= false
    }

     async function findWithPaiement(reference:string) {
         const data = await useFacture.findWithPaiement(reference);
         facture.value = data?.data?.data
    }

    return {
        all,
        factures,
        facture,
        create,
        findWithPaiement,
        newFacture,
        isLoading
    }
})