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
    const items = ref<CartItem[]>(JSON.parse(localStorage.getItem('cartItems') || '[]'));

    const totalItems = ref(JSON.parse(localStorage.getItem('cartItemsCount') || '0'));
    const totalCost = ref(JSON.parse(localStorage.getItem('cartTotalAmt') || '0'));

    function addToCart(obj: any) {
        if (company.value !== 'WiseBuyers Supermart') {
            alert('You cannot use this app outside of a WiseBuyer store!');
            return;
        } else {
            if(items.value.find(c => c.id === obj.id)) {
            alert('This item is already in your cart!');
        } else {
            items.value.unshift(obj);
            localStorage.setItem('cartItems', JSON.stringify(items.value));
            totalItems.value += 1;
            localStorage.setItem('cartItemsCount', JSON.stringify(totalItems.value));
            totalCost.value += Number(obj.price);
            localStorage.setItem('cartTotalAmt', JSON.stringify(totalCost.value));
        }
        }
    }

    return {addToCart, company, email, items, totalCost, totalItems, username}
})