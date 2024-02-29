<template>
<q-page style="background-color: lightgrey;">
<q-icon name="arrow_back" @click="router.back" size="28px" class="q-pa-md"/>
<div class="q-pa-md justify-center">
<h3 class="text-h5">My transactions</h3>
<div v-if="deals.length < 1">
<q-icon name="summarize" color="accent" size="250px" style="margin-left: 48px;" />
<p class="text-subtitle1">Your transactions history will show here.</p>
</div>
<div v-else class="q-pa-md" style="max-width: 380px">
<q-list bordered separator>
      <q-item v-for="t in deals" :key="t.id">
        <q-item-section>
          <q-item-label overline class="text-h6">{{ t.item }}</q-item-label>
          <q-item-label class="text-subtitle1">NGN{{ t.price }} x {{ t.qty }}</q-item-label>
          <q-item-label class="text-subtitle2">{{ t.createdAt }}</q-item-label>
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
console.log(`Store istory: ${JSON.stringify(cartStore.transactions.flat())}`);
console.log(`TypeOf Store istory: ${typeof cartStore.transactions}`);
})
</script>