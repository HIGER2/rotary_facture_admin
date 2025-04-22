// import type { NewOrderProducType } from "~/composable/types/model";
import { defineStore } from "pinia";
import { NewCartType } from '../../types';
import { computed, ref } from "vue";
import { getStorage, setStorage } from "~/composables/utils";



export const useCartManager = defineStore('manager', () => {

  let cart = ref<Array<NewCartType>>([]);
  let loadingCart = ref<Boolean>(true);

  let iniValue = {
    customer: {
      name: "",
      phone:"",
    },
    delivery_addresses: {
      recipient_name: "",
      phone_number: "",
      adresse: "",
      city: "",
      street:"",
    },
    paymentMethode:"",
  }
  let payload = reactive({...iniValue})
  let total_quantity = computed(() => {
    return cart.value.reduce((total: number, item: NewCartType) => {
        return total += item.quantity_product
        }, 0)
  });

  let total_amount = computed(() => {
      return cart.value.reduce((total: number, item: NewCartType) => total + (Number(item.price) * Number(item.quantity_product) ), 0)
  });
  
  const persisteCart = async(items: any) => {
    await setStorage('cart', items)
    // const storedCart = LocalStorage.getItem("cart");
    // if (!storedCart) {
    //   return (cartMarket.value = []);
    // }
    // return (cartMarket.value = storedCart);
  };

  const initCart = async () => {
    const storedCart  = await getStorage('cart')
    if (storedCart) {
          cart.value = storedCart;
    }
    loadingCart.value = false;
  };  

  const addToCart = (item: NewCartType) => {
    // verifie que le produit existe dejà dans le panier
    const itemInCart = cart.value.find(
      (i) => i.products_id === item.products_id
    );

    // if (
    //   itemInCart &&
    //   itemInCart.quantity + item.quantity > itemInCart.attributes.stock
    // ) {
    //   alert(
    //     "Vous ne pouvez pas renseigner un quantité au-delà de quantité disponible"
    //   );
    // } else
    if (itemInCart) {
      itemInCart.quantity_product += item.quantity_product;
      itemInCart.total_amount = Number(itemInCart.price ) * Number(itemInCart.quantity_product);
      persisteCart(cart.value);
    } else {
      item.total_amount = Number(item.price) * Number(item.quantity_product);
      cart.value.push(item);
      persisteCart(cart.value);
    }
  };
    
  const removeItem = (products_id :NewCartType) => {
      cart.value = cart.value.filter(
        (item) => item.products_id !== products_id
      );
      persisteCart(cart.value);
    };
    
  const incrementQuantity = (productId: number) => {
    
    const items : NewCartType = cart.value.find(
      (item) => item.products_id == productId
    );

    let newQuantity:number = items.quantity_product + 1

    // if (newQuantity > items.attributes.stock) {
    //   alert(
    //     "Vous ne pouvez pas renseigner un quantité au-delà de quantité disponible"
    //   );
    //   return;
    // }

    // on met à jour la quantité du product existant dans le panier
    items.quantity_product = newQuantity;
    // on recalcule le prix total du product dans le panier
    items.total_amount = items.price * newQuantity;

    persisteCart(cart.value);
  };

  const decrementQuantity = (productId :number) => {
    const item :NewCartType  = cart.value.find(
      (item) => item.products_id == productId
    );

    if (item.quantity_product ==1) {
      item.quantity_product = 1;
      item.total_amount = Number(item.price) * Number(item.quantity_product);
      return;
    } else {
      // on decrement le quantité dans le cas ou celle-ci est supérieur à 1
      item.quantity_product -= 1;
      // on met a jour le prix total du produit
      item.total_amount = Number(item.price) * Number(item.quantity_product);
    }

    persisteCart(cart.value);
  };
    
  const clear = () => {
    cart.value = []
    payload = { ...iniValue }
    persisteCart(cart.value)
  }

    return {
        persisteCart,
        addToCart,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        total_quantity,
      total_amount,
      cart,
      payload,
      clear,
      initCart,
      loadingCart
    }
})