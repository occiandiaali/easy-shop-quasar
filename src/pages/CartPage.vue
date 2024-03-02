<template>
    <q-page class="bg-purple-1">
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md justify-center">
            <span style="font-size: 24px;margin: 10px;font-weight: 600;">My Cart</span>
        <div v-if="cart.length < 1" style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
            <h4 class="text-h5 text-grey-8">Nothing to see here yet.</h4>
            <q-icon name="remove_shopping_cart" size="140px" color="accent" />
            <p class="text-subtitle1 q-mt-md">Go scan some items to get started. ;) </p>
        </div>
        <div v-else style="margin-top: 24px;">
        <q-btn outline rounded color="accent" label="Clear cart" class="fixed-top-right q-ma-lg" @click="clearCart"/>
        <q-list>
                
        <q-card class="my-card" style="margin-bottom: 16px;" v-for="item in cart" :key="item.id">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ item.item }}</div>
        <span style="font-size: 12px;"> {{ item.price }} naira each</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>
        <q-icon name="add_circle" size="26px" @click="increment(item)"/>
        </q-btn>
        <div class="text-subtitle1 text-bold">{{ item.qty }}</div>
        <q-btn flat>
        <q-icon name="remove_circle" size="26px" @click="decrement(item)"/>
        </q-btn>
      </q-card-actions>
    </q-card>
               
            </q-list>
            <div style="margin-top: 16px;margin-left: 48px;">
            <p style="font-size: 18px;"><strong>VAT</strong>: 0.0</p>
            <p style="font-size: 24px;"><strong>Total:</strong> <span style="font-size: small;">NGN</span> {{ new Intl.NumberFormat('en-NG').format(cartStore.totalCost) }}</p>
            </div>
            <q-btn style="margin-left: 60px;" color="grey-4" text-color="purple" glossy unelevated icon="credit_card" label="Pay with Paystack" @click="payWithPaystack" />
        </div>
        </div>
    </q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';
import { useAppStore } from 'src/stores/appStore';
import { useCartStore} from '../stores/cartStore';
import { ref } from 'vue';

const router = useRouter();
const appStore = useAppStore();
const cartStore = useCartStore();

let cart = ref(cartStore.items);

//let cartTotal = ref(cartStore.totalCost);
//let userEmail = ref('')

function back() {
    router.back();
}

function increment(item) {
  const t = (curr => curr.id === item.id);
  if (t) {
    item.qty += 1;
   
   cartStore.totalCost += Number(item.price);
    localStorage.setItem('cartTotalAmt', JSON.stringify(cartStore.totalCost));
  }
}
function decrement(item) {
  const u = (curr => curr.id === item.id);
  if (u && (item.qty === 1 && cart.value.length === 1)) {
    clearCart();
  } else if (u && item.qty > 1) {
    item.qty -= 1;
  
     cartStore.totalCost -= Number(item.price);
     localStorage.setItem('cartTotalAmt', JSON.stringify(cartStore.totalCost));
  } else {
        if (window.confirm('You want to remove this item from your cart?')) {
    
    cartStore.totalCost -= Number(item.price);
      localStorage.setItem('cartTotalAmt', JSON.stringify(cartStore.totalCost));
      cartStore.totalItems--;
      localStorage.setItem('cartItemsCount', JSON.stringify(cartStore.totalItems));
      cart.value.splice(cart.value.indexOf(item), 1);
      localStorage.setItem('cartItems', JSON.stringify(cart.value));
    }
  }
}

function clearCart() {
  cartStore.items = [];
  cartStore.totalCost = 0;
  cartStore.totalItems = 0;
   cart.value = [];

 localStorage.removeItem('cartItems');
 localStorage.removeItem('cartItemsCount');
 localStorage.removeItem('cartTotalAmt');
}

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'pk_test_b0d0cb50a1b039f53f0b3564d02cebcf0a19c37b',
   // email: userEmail.value,
   email: appStore.useremail,
   amount: parseInt(cartStore.totalCost*100),
    callback: function (response) {
      if (response.status !== 'success') {
        console.log('Oops! Something went wrong.');
      }
      cartStore.transactions.unshift([{basket: cartStore.items, dateTime: new Date().toLocaleString()}]);
      console.log(`Basket Items: ${JSON.stringify(cartStore.transactions)} - Type: ${typeof cartStore.transactions}`)
      localStorage.setItem('transactions', JSON.stringify(cartStore.transactions));
      console.log(`Callback Paid: ${JSON.stringify(response)}`);
    
      clearCart();
    },
    onClose: function () {
     // alert(`Thanks for your shopping!\nYour receipt has been sent to ${userEmail.value}`)
      console.log('Happen after popup closed.')
    }
  });
  handler.openIframe();
}

// onMounted(() => {
//   let str = localStorage.getItem('useremail');
//   userEmail.value = str;
//   console.log(`Total: ${Number(cartTotal.value).toFixed(2)}`)
//   console.log(`Total100: ${parseInt(cartTotal.value*100)}`)
//   console.log(`Total200: ${parseInt(cartStore.totalCost*100)}`)
// })
</script>