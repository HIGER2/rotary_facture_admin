import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '~/composables';

export const useAuthStores = defineStore('authStore', () => {
    
  const { setCookie, getCookie } = useCookies()

  const Auth = ref(null)
  
const router = {
  admin: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/clubs", name: "sidebar.clubs", ico: `<i class="uil uil-cube text-xl"></i>` },
    { path: "/account/rubrique", name: "sidebar.categories", ico: `<i class="uil uil-wall text-xl"></i>` },
    { path: "/account/factures", name: "sidebar.invoices", ico: `<i class="uil uil-invoice text-xl"></i>` },
    // { path: "/account/exercice", name: "sidebar.exercises", ico: `<i class="uil uil-clipboard-notes text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` },
    { path: "/account/rapport", name: "sidebar.reports", ico: `<i class="uil uil-chart text-xl"></i>` }
  ],
  super_admin: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/clubs", name: "sidebar.clubs", ico: `<i class="uil uil-cube text-xl"></i>` },
    { path: "/account/rubrique", name: "sidebar.categories", ico: `<i class="uil uil-wall text-xl"></i>` },
    { path: "/account/factures", name: "sidebar.invoices", ico: `<i class="uil uil-invoice text-xl"></i>` },
    // { path: "/account/exercice", name: "sidebar.exercises", ico: `<i class="uil uil-clipboard-notes text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` },
    { path: "/account/rapport", name: "sidebar.reports", ico: `<i class="uil uil-chart text-xl"></i>` }
  ],
  club: [
    { path: "/account/home", name: "sidebar.dashboard", ico: `<i class="uil uil-estate text-xl"></i>` },
    { path: "/account/factures/club/invoice-unpaid", name: "sidebar.invoicesUnPaid", ico: `<i class="uil uil-invoice text-xl"></i>` },
    { path: "/account/factures/club/invoice-paid", name: "sidebar.invoicesPaid", ico: `<i class="uil uil-invoice text-xl"></i>` },
    { path: "/account/payments", name: "sidebar.payments", ico: `<i class="uil uil-money-stack text-xl"></i>` }
  ]
}
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
      Auth,
      router
  }
})