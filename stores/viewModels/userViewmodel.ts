
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '#imports'; 
import { useUserServices } from '../services/userService';

export const useUserViewModel = defineStore('UserViewModel', () => {
   
    const userService = useUserServices();
 
    const rapports = reactive({
        analityc:[],
        club :[]
    })
    const stats = reactive<any>({
        data: "",
        analityc: "",
    });
    
    const users = reactive({
        data:[],
        page: []
    });
    const user = ref();
    const isLoading = ref(false);
    let initial = {
        name: "",
        last_name: "",
        phone:"",
        email:"",
        role:"super_admin",
        password:"",
    }
    const newUser = reactive({ ...initial });
    const updateUser = reactive({ ...initial, id:""});
        
    async function analityc() {
        const data = await userService.analityc();
        stats.data = data?.data?.data
        stats.analityc =data?.data?.analytic
    }

    async function rapport(queryParams) {
        const data = await userService.rapport(queryParams);

        rapports.analityc = data?.data?.data?.analityc
        rapports.club = data?.data?.data?.club
        
    }

    
    async function allByFilter(queryParams ="") {
        const data = await userService.allByFilter(queryParams);
        data.data?.data?.links.shift()
        data.data?.data?.links.pop()
        users.page = data.data?.data?.links
        users.data = [...data.data?.data?.data.map((item:any,index) => (
            {
                id : item?.id,
                // uid : item?.exercice_uid,
                name : item?.name,
                last_name : item?.last_name,
                phone : item?.phone,
                email : item?.email,
                role : item?.role,
            }
        ))]

        return data
    }

    async function all(queryParams ="") {
        const data = await userService.all(queryParams);
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
        const data = await userService.findDetail(params);
        user.value = data?.data?.data
        return data
    }

    async function create() {
        isLoading.value = true
        let items={...newUser}

        
        const data = await userService.create(items);
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
        let items={...updateUser}

        console.log('updateUser',updateUser);
        const data = await userService.update(items);
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
        analityc,
        stats,
        rapport,
        rapports,
        newUser,
        updateUser,
        isLoading,
        all,
        users,
        allByFilter,
        create,
        findDetail,
        user,
        update
    }
})