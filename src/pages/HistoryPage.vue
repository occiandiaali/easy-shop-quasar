<template>
<q-page style="background-color: lightgrey;">
<q-icon name="arrow_back" @click="router.back" size="28px" class="q-pa-md"/>
<div class="q-pa-md justify-center">
<h3 class="text-h5 text-center">My transactions</h3>
<div v-if="deals.length < 1">
<q-icon name="summarize" color="accent" size="250px" style="margin-left: 48px;" />
<p class="text-subtitle1">Your transactions history will show here.</p>
</div>
<div v-else class="q-pa-md fixed-center q-mt-xl" style="max-width: 380px;">
<q-list bordered separator>
      <q-item v-for="(t, i) in deals" :key="i" style="margin-bottom: 8px;">
        <q-item-section>
          <q-item-label class="text-subtitle2 text-grey-7 q-pt-sm">{{ t.dateTime }}</q-item-label>
        <hr />
        <div v-for="b in t.basket" :key="b.id" class="q-pa-sm">
          <q-item-label class="text-h6 text-weight-bold">{{ b.item }}</q-item-label>
          <q-item-label class="text-subtitle1 q-pb-sm"><span class="text-subtitle2">NGN</span>{{ new Intl.NumberFormat('en-NG').format(b.price) }} x {{ b.qty }}</q-item-label>
          <hr style="width: 250px;height: 0.3px;color: lightgray;"/>
        </div>
        </q-item-section>
      </q-item>
</q-list>

</div>

</div>
</q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router';
import {useCartStore} from '../stores/cartStore';

const router = useRouter();
const cartStore = useCartStore()

let deals = ref([])

onMounted(() => {
// const str = localStorage.getItem('transactions');
// let strParse = JSON.parse(str);
deals.value = cartStore.transactions.flat();
console.log(`DealsDotVal: ${JSON.stringify(deals.value)}`);
//console.log(`Transacted noFlat: ${cartStore.transactions}`);
console.log(`Flat Transacted Stringified: ${JSON.stringify(cartStore.transactions.flat())}`);
console.log(`TypeOf Store transactions: ${typeof cartStore.transactions}`);
console.log(`TypeOf deals.value: ${typeof deals.value}`);
})
</script>