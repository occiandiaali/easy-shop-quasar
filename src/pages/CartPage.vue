<template>
    <q-page>
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md justify-center">
            <h3>Cart Page</h3>
        <div v-if="cartItems.length < 1">
            <h4>Your cart is sooo empty!</h4>
            <p>Go scan some items to get started</p>
        </div>
        <div v-else>
            <q-list>
                <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
            </q-list>
            <p>Total: NGN {{ cartStore.totalCost }}</p>
        </div>
        </div>
    </q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useCartStore} from '../stores/cartStore'
import { ref } from 'vue';

const router = useRouter();
const cartStore = useCartStore()

const cartItems = ref(cartStore.items)


function back() {
    router.back();
}
</script>