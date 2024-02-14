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
            <q-list v-for="(item,i) in cartItems" :key="i">
                
                    <q-card class="my-card" >
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ item.it }}</div>
        <!-- <div class="text-subtitle2">NGN {{ item.pr }}</div> -->
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>
        <q-icon name="add" size="24px" @click="cartStore.addItem(item)"/>
        </q-btn>
        <div class="text-subtitle2">NGN {{ new Intl.NumberFormat('en-NG').format(item.pr) }}</div>
        <q-btn flat>
        <q-icon name="remove" size="24px" @click="cartStore.removeItem(item)"/>
        </q-btn>
      </q-card-actions>
    </q-card>
               
            </q-list>
            <div style="margin-top: 16px;margin-left: 48px;">
            <p style="font-size: 24px;"><strong>Total:</strong> NGN {{ new Intl.NumberFormat('en-NG').format(cartStore.totalCost) }}</p>
            </div>
            <q-btn style="margin-left: 60px;" color="grey-4" text-color="purple" glossy unelevated icon="credit_card" label="Pay with Paystack" />
        </div>
        </div>
    </q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useCartStore} from '../stores/cartStore'
import { onMounted, ref } from 'vue';

const router = useRouter();
const cartStore = useCartStore()

const cartItems = ref(cartStore.items)


function back() {
    router.back();
}

onMounted(() => console.log(`totalItems: ${cartStore.totalItems} - totalCost: ${cartStore.totalCost}`))
</script>