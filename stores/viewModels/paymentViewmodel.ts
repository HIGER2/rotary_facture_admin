
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { usePaymentServices } from '../services/paymentService';

export const usePaymentViewModel = defineStore('PaymentViewModel', () => {
   
    const usePayment = usePaymentServices();
    
    const payments = ref([]);
    const payment = ref({});
    const analityc = ref([]);
    const isLoading =ref(false)
    let initial = {
        facture_id: "",
        facture_uid: "",
        amount: "",
        status: "",
        mode_paiement:"",
    }
    const newPayment = reactive({...initial});
    const paymentAmount = reactive({
        amount:""
    })
    const updatePayment = reactive({
        amount:null,
        mode_paiement:"",
        status:"",
        id:"",
    });
    
    async function all(queryParams) {
        const data = await usePayment.all(queryParams);
        analityc.value =data?.data?.analytic
        payments.value = [...data.data?.data.map((item:any,index) => (
            {
                reference: item?.reference,
                club : item?.club?.name || "N/A",
                fac : item?.facture?.reference || "N/A",
                amount: item?.amount,
                status: item?.status,
                mode_paiement: item?.mode_paiement,
                date: item?.date,
            }
        ))]
    }

    async function create(item: any) {
        isLoading.value = true
        let items = {
            ...newPayment,
             facture_id:item.id,
            facture_uid:item.facture_uid
        }
        const data = await usePayment.create(items);
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

    async function processePayment(item: any) {
        isLoading.value = true
        let items = {
            ...paymentAmount,
            facture_id:item.id,
            facture_uid:item.facture_uid
        }
        const data = await usePayment.processePayment(items);
        if (!data?.data?.error) {
            navigateTo(data?.data?.data?.url ,{ external: true})
        }
        isLoading.value = false
    }

    async function checkPayment(item: any) {
        isLoading.value = true
        const data = await usePayment.checkPayment(item);
        isLoading.value = false
    }

    async function update() {
        isLoading.value = true
        let items = {
            ...updatePayment,
        }

        const data = await usePayment.update(items);
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

    async function findWithPaiement(reference:string) {
        const data = await usePayment.findWithPaiement(reference);
    }

    return {
        all,
        create,
        findWithPaiement,
        newPayment,
        payments,
        isLoading,
        updatePayment,
        update,
        processePayment,
        paymentAmount,
        checkPayment,
        analityc
    }
})