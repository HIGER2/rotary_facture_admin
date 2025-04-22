import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '~/composables';

export const useAuthStores = defineStore('authStore', () => {
    
  const { setCookie, getCookie } = useCookies()

  const Auth = ref(null)
  
    function getToken() {
      let token = getCookie('token')
      return token
    }
    
  function isAuthenticate() {
    let token = getToken()
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  return {
      getToken,
    isAuthenticate,
      Auth
  }
})