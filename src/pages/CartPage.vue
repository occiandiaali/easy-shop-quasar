<template>
    <q-page style="background-color: lightgrey;">
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md justify-center">
            <span style="font-size: 24px;margin: 10px;font-weight: 600;">My Cart</span>
        <div v-if="cart.length < 1">
            <h4>Your cart is sooo empty!</h4>
            <p>Go scan some items to get started</p>
        </div>
                <!-- <div v-else>
            <q-list v-for="(item,i) in cartItems" :key="i">
                
                    <q-card class="my-card" >
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ item.it }}</div>
        <div class="text-subtitle2">NGN {{ item.pr }}</div>
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
        </div> -->
        <div v-else style="margin-top: 24px;">

            <q-list>
                
                    <q-card class="my-card" style="margin-bottom: 16px;" v-for="(item,i) in cart" :key="i">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ item.it }}</div>
        
        <!-- <div style="display: flex;flex-direction: row;justify-content: space-around;">
                <q-btn flat>
        <q-icon name="add" size="24px" @click="cartStore.addItem(item)"/>
        </q-btn>
        <div class="text-subtitle2">NGN {{ new Intl.NumberFormat('en-NG').format(item.pr) }}</div>
        <q-btn flat>
        <q-icon name="remove" size="24px" @click="cartStore.removeItem(item)"/>
        </q-btn>
        </div> -->
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>
        <q-icon name="add" size="18px" @click="incrementItem(item)"/>
        </q-btn>
        <div class="text-subtitle1">NGN {{ new Intl.NumberFormat('en-NG').format(item.pr) }}</div>
        <q-btn flat>
        <q-icon name="remove" size="18px" @click="decrementItem(item)"/>
        </q-btn>
      </q-card-actions>
    </q-card>
               
            </q-list>
            <div style="margin-top: 16px;margin-left: 48px;">
            <p style="font-size: 18px;"><strong>VAT</strong>: 0.0</p>
            <p style="font-size: 24px;"><strong>Total:</strong> <span style="font-size: small;">NGN</span> {{ new Intl.NumberFormat('en-NG').format(cartTotal) }}</p>
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

const cart = ref(cartStore.items);
//const cartTotal = ref(cartStore.totalCost);
const cartTotal = ref(0);
//let arr = ref([]);


function back() {
    router.back();
}

const incrementItem = (item) => {
let target = cart.value.filter(curr => curr.id === item.id)[0];
console.log('before up: ', target.pr);
if (target) {
  item.pr *= 2;
  cartTotal.value += item.pr;
}
console.log('after up: ', target.pr)
}

const decrementItem = (item) => {
let target = cart.value.filter(curr => curr.id === item.id)[0];
console.log('before down: ', target.pr);
if (target) {
  item.pr /= 2;
  cartTotal.value -= item.pr;
}
console.log('after down: ', target.pr)
}

onMounted(() => {
  const cTotalStr = localStorage.getItem('cartTotalAmt');
  let cTotal = JSON.parse(cTotalStr);
  cartTotal.value = cTotal;
})

// onMounted(() => {
//     const storeStr = localStorage.getItem('cartItems');
//     let items = JSON.parse(storeStr);
//     cartStore.items = items;
//     cartItems = cartStore.items;

//       const strCartTotal = localStorage.getItem('totalCost');
//   let total = JSON.parse(strCartTotal || '0');
//   cartStore.totalCost = total;

//     console.log('arr: ', cartItems);
//     console.log(`totalItems: ${cartStore.totalItems} - totalCost: ${cartStore.totalCost}`)
// })
</script>