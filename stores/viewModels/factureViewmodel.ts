
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useFactureServices } from '../services/factureService';

export const useFactureViewModel = defineStore('FactureViewModel', () => {
   
    const useFacture = useFactureServices();
    
    const factures = ref([]);
    const analityc = ref([]);
    const facture = ref({});
    const isLoading =ref<any>(false)
    
    const sharedAdminColumns = [
        { label: 'facture.colunm.td1', key: 'reference' },
        { label: 'facture.colunm.total_amount_usd', key: 'total_amount_usd' },
        { label: 'facture.colunm.td2', key: 'amount' },
        { label: 'facture.colunm.td3', key: 'amount_pay' },
        { label: 'facture.colunm.td4', key: 'remaining_amount' },
        { label: 'facture.colunm.td5', key: 'type' },
        { label: 'facture.colunm.td6', key: 'status' },
        { label: 'facture.colunm.td7', key: 'date_emission' },
        { label: 'facture.colunm.td8', key: 'date_echeance' },
        { label: 'facture.colunm.td9', key: 'action' },
        ];
    
    
    const columns = {
        "admin":sharedAdminColumns,
        "super_admin":sharedAdminColumns,
    "club":[
    { label: 'facture.colunm.td1', key: 'reference' },
        // { label: 'Club', key: 'club' },
        { label: 'facture.colunm.td2', key: 'amount' },
        { label: 'facture.colunm.total_amount_usd', key: 'total_amount_usd' },
        { label: 'facture.colunm.td3', key: 'amount_pay' },
        { label: 'facture.colunm.td3', key: 'remaining_amount' },
        { label: 'facture.colunm.td5', key: 'type' },
    
        { label: 'facture.colunm.td6', key: 'status' },
    
        { label: 'facture.colunm.td7', key: 'date_emission' },
        { label: 'facture.colunm.td8', key: 'date_echeance' },
    ]
    }
    // let initial = {
    //     club_id: "",
    //     rubrique_id: "",
    //     exercice_id:"",
    //     amount: "",
    //     objet: "",
    //     status:"en_cours",
    // }
    let initiaRubrique={
        libele:"",
        amount:"",
        quantity:"",
        comment:""
    }
    let initial = {
        club_id: "",
        objet: "",
    }
    const newFacture = reactive({...initial});
    const newRubrique = reactive([]);
    const updateFacture = reactive({...initial,id:null});
    const total_rubrique =computed(()=>{
        return newRubrique.length
    })
    const total_quantity =computed(()=>{
        return newRubrique.reduce((total,item)=>{
            return  total +=Number(item.quantity)
        },0)
    })
    const total_amount =computed(()=>{
        return newRubrique.reduce((total,item)=>{
            return  total += Number(item.quantity) * Number(item.amount)
        },0)
    })
    async function all(queryParams) {
        const data = await useFacture.all(queryParams);
        analityc.value =data?.data?.analytic
        factures.value = [...data.data?.data?.data]
    }
    async function create(send='send') {
        if (newRubrique.length==0) {
            alert('Merci de bien vouloir saisir au moins une rubrique')
            return
        }
        if (!confirm('Voulez-vous éffectuer cette action ?')) {
            return
        }
        isLoading.value= send
        let items={
            facture :{
            ...newFacture,
            total_rubrique:total_rubrique.value,
            amount:total_amount.value,
            total_quantity:total_quantity.value,
            },
            rubrique :[...newRubrique]
        }

        const data = await useFacture.create(items,send);
        if (data?.error) {
            alert(data?.error?.message)
        }
        resetNewFacture()
        resetNewRubrique()
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

    async function sendFacture(item:string) {
        if (!confirm('Voulez-vous vraiment envoyer la facture ?')) {
            return
        }
        isLoading.value= true
        const data = await useFacture.sendFacture({reference:item});
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

    async function find(reference:string) {
        const data = await useFacture.find(reference);
        Object.assign(updateFacture,data?.data?.data)
    }

    const addRubrique =(quantity=0)=>{
        newRubrique.push({...initiaRubrique,quantity:quantity ? quantity : ""})
    }

    const removeRubrique =(index:number)=>{
        newRubrique.splice(index, 1)
    }

    function resetNewFacture() {
        Object.assign(newFacture, {
            club_id: "",
            objet: ""
        });
    }
    function resetNewRubrique() {
        newRubrique.splice(0, newRubrique.length);
    }
    function resetNewRubriqueWithEmptyLine() {
        newRubrique.splice(0, newRubrique.length, {
            libele: "",
            amount: "",
            quantity: "",
            comment: ""
        });
    }
    function resetUpdateFacture() {
        Object.assign(updateFacture, {
            club_id: "",
            objet: "",
            id: null
        });
    }
    return {
        all,
        factures,
        facture,
        create,
        findWithPaiement,
        newFacture,
        newRubrique,
        isLoading,
        find,
        updateFacture,
        update,
        analityc,
        addRubrique,
        removeRubrique,
        total_rubrique,
        total_quantity,
        total_amount,
        sendFacture,
        columns
    }
})