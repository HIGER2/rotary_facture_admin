
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
    const payload = reactive({file:null});
    let initial = {
        name: "",
        country_id: "",
        status:"",
        effectif:"",
        club_personel:[
            {
                name: "",
                last_name: "",
                function:"président",
                phone:"",
                email: "",
            },
            {
                name: "",
                last_name: "",
                function:"secrétaire",
                phone:"",
                email: "",
            },
            {
                name: "",
                last_name: "",
                function:"trésorier",
                phone:"",
                email: "",
            }
        ]
    }
    const newClub = reactive({ ...initial });
    const updateClub = reactive({ ...initial, id:""});
    
    async function createFromFile() {
        if (!payload.file) {
            alert('Merci de bien vouloir selectionner un fichier')
            return
        }
        const formData = new FormData();
        
        formData.append('file', payload.file);

        isLoading.value= true
        const data = await useClub.createFromFile(formData);
        if (data?.error) {
            alert(data?.error?.message)
        }
        if (data?.data) {
            payload.file= null
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

    async function allByFilter(queryParams ="") {

        
        const data = await useClub.allByFilter(queryParams);
        let response = [];
        if (queryParams.get('page') =='all') {
            response = data.data?.data
        }else{
            data.data?.data?.links.shift()
            data.data?.data?.links.pop()
            clubs.page = data.data?.data?.links
            response = data.data?.data?.data
        }
      
        clubs.data = [...response.map((item:any,index) => (
            {
                id : item?.id,
                code : item?.code,
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

    async function findByMember(params:any) {
        resetUpdateClub()
        const data = await useClub.findByMember(params);
        let response  = data?.data?.data
        updateClub.id = response.id
        updateClub.name = response.name
        updateClub.country_id =response.country_id
        updateClub.status =response.status
        updateClub.effectif =response.effectif
        data?.data?.data?.personels.map((item:any,index)=>(
            updateClub.club_personel[index] =  {
                id:item?.id ?? "",
                name:item?.name ?? "",
                email:item?.email ?? "",
                phone: item?.phone ?? ""
            }
           ))
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
            resetNewClub()
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

    function resetNewClub() {
        Object.assign(newClub, {
            name: "",
            country_id: "",
            status: "",
            effectif: "",
            club_personel: [
                {
                    name: "",
                    last_name: "",
                    function: "président",
                    phone: "",
                    email: "",
                },
                {
                    name: "",
                    last_name: "",
                    function: "secrétaire",
                    phone: "",
                    email: "",
                },
                {
                    name: "",
                    last_name: "",
                    function: "trésorier",
                    phone: "",
                    email: "",
                }
            ]
        });
    }
    
    function resetUpdateClub() {
        Object.assign(updateClub, {
            name: "",
            country_id: "",
            status: "",
            effectif: "",
            club_personel: [
                {
                    name: "",
                    last_name: "",
                    function: "président",
                    phone: "",
                    email: "",
                },
                {
                    name: "",
                    last_name: "",
                    function: "secrétaire",
                    phone: "",
                    email: "",
                },
                {
                    name: "",
                    last_name: "",
                    function: "trésorier",
                    phone: "",
                    email: "",
                }
            ]
        });
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
        update,
        findByMember,
        resetUpdateClub,
        payload,
        createFromFile,
    }
})