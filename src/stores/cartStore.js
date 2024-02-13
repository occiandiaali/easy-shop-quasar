import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
    const items = ref([]);
    const totalItems = ref(0);
    const totalCost = ref(0);

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

    return {addItem, items, removeItem, totalCost, totalItems}
})