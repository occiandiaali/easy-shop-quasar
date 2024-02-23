import { defineStore } from 'pinia';
import { ref } from 'vue';

export type CartItem = {
    name: string; 
    price: number, 
    id: string, 
    qty: number
}

export const useCartStore = defineStore('cartStore', () => {
    const company = ref('WiseBuyers Supermart');
    const email = ref('');
    const username = ref('')
    const items = ref<CartItem[]>([]);

    const totalItems = ref(0);
    const totalCost = ref(0);

    function addToCart(obj: any) {
        if (company.value !== 'WiseBuyers Supermart') {
            alert('You cannot use this app outside of a WiseBuyer store!');
        } else {
            if(items.value.find(c => c.id === obj.id)) {
            alert('In cart already!');
        } else {
            items.value.unshift(obj);
          //  localStorage.setItem('cart', JSON.stringify(items.value));
            totalItems.value += 1;
            totalCost.value += parseFloat(obj.price);
        }
        }
    }

    return {addToCart, company, email, items, totalCost, totalItems, username}
})