import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
    const company = ref('');
    const email = ref('');
    const username = ref('')
    const items = ref([]);

    const totalItems = ref(0);
    const totalCost = ref(0);
    const cartTotalAmt = ref(0);

    const addToCart = (item) => {
        if (items.value != null && !items.value.includes(item)) {
            items.value.push(item);
            localStorage.setItem('cart', JSON.stringify(items));
            totalItems.value += 1;
            cartTotalAmt.value += parseFloat(item.pr);
            
            localStorage.setItem('cartTotalAmt', JSON.stringify(cartTotalAmt.value))
            localStorage.setItem('totalItems', JSON.stringify(totalItems.value))
        } else {
            alert('Item already in cart.');
            return;
        }
    }

    const addItem = (item) => {
        let targetItem = items.value.filter( currItem => currItem.id === item.id )[0];

        if(targetItem) targetItem.count += 1;
        else items.value = [...items.value, {...item, count: 1}];

        totalItems.value += 1;
        totalCost.value += item.price;
    };

    const removeItem = (item) => {
        let targetItem = items.value.filter( currItem => currItem.id === item.id )[0];

        if(targetItem.count === 1) items.value = items.value.filter( currItem => currItem.id !== item.id );
        else targetItem.count -= 1;

        totalItems.value -= 1;
        totalCost.value -= item.price;
    };

    return {addItem, addToCart, company, email, items, removeItem, totalCost, totalItems, username}
})