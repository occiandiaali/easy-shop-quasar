<template>
    <q-page style="background-color: lightgrey;">
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md justify-center">
            <span style="font-size: 24px;margin: 10px;font-weight: 600;">My Cart</span>
        <div v-if="cart.length < 1">
            <h4>Nothing to see here.</h4>
            <p>Go scan some items to get started. ;) </p>
        </div>
        <div v-else style="margin-top: 24px;">

            <q-list>
                
                    <q-card class="my-card" style="margin-bottom: 16px;" v-for="item in cart" :key="item.id">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ item.item }} - <span style="font-size: 12px;"> {{ item.price }}</span></div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>
        <q-icon name="add" size="18px" @click="increment(item)"/>
        </q-btn>
        <div class="text-subtitle1 text-bold">{{ item.qty }}</div>
        <q-btn flat>
        <q-icon name="remove" size="18px" @click="decrement(item)"/>
        </q-btn>
      </q-card-actions>
    </q-card>
               
            </q-list>
            <div style="margin-top: 16px;margin-left: 48px;">
            <p style="font-size: 18px;"><strong>VAT</strong>: 0.0</p>
            <p style="font-size: 24px;"><strong>Total:</strong> <span style="font-size: small;">NGN</span> {{ new Intl.NumberFormat('en-NG').format(cartTotal) }}</p>
            </div>
            <q-btn style="margin-left: 60px;" color="grey-4" text-color="purple" glossy unelevated icon="credit_card" label="Pay with Paystack" @click="payWithPaystack" />
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

let cart = ref(cartStore.items);

let cartTotal = ref(cartStore.totalCost);
let userEmail = ref('')

function back() {
    router.back();
}

function increment(item) {
  const t = (curr => curr.id === item.id);
  if (t) {
    item.qty += 1;
    cartTotal.value += Number(item.price);
  }
}
function decrement(item) {
  const u = (curr => curr.id === item.id);
  if (u && (item.qty === 1 && cart.value.length === 1)) {
    clearCart();
    cart.value = [];
    cartTotal.value = 0;
  } else if (u && item.qty > 1) {
    item.qty -= 1;
    cartTotal.value -= Number(item.price);
  } else {
        if (window.confirm('You want to remove this item from your cart?')) {
   cartTotal.value -= Number(item.price);
      cartStore.totalItems--;
      cart.value.splice(cart.value.indexOf(item), 1);
    }
  }
}

function clearCart() {
  cartStore.items = [];
  cartStore.totalCost = 0;
  cartStore.totalItems = 0;
   cart.value = [];
 cartTotal.value = 0;
}

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'pk_test_b0d0cb50a1b039f53f0b3564d02cebcf0a19c37b',
    email: userEmail.value,
    amount: Number(cartTotal.value * 100),
    callback: function (response) {
      clearCart()
      console.log(`Callback Paid: ${JSON.stringify(response)}`)
      alert(`Thanks for your shopping!\nYour receipt has been sent to ${userEmail.value}`)
    },
    onClose: function () {
      console.log('Happen after popup closed.')
    }
  });
  handler.openIframe();
}

onMounted(() => {
  let str = localStorage.getItem('useremail');
  userEmail.value = str;
})
</script>