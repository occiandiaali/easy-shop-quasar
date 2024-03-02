<template>

<q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
<div class="q-pa-md">
<div v-if="cartStore.transactions.flat().length < 1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
<q-icon name="summarize" color="accent" size="200px" />
<span class="text-h6 text-center">Your transactions history will show here.</span>
</div>
<q-list v-else>
<q-btn outline rounded color="accent" label="Export" class="fixed-top-right q-ma-lg" @click="exportHistory"/>
<q-card v-for="(t, i) in cartStore.transactions.flat()" :key="i" style="margin-bottom: 16px;" class="q-pa-md rounded-borders bg-purple-1">
<span class="text-subtitle2 text-grey-7 q-mt-md">{{ t.dateTime }}</span>
<q-card-section v-for="b in t.basket" :key="b.id" class="q-pa-sm">
        <div class="text-h6">{{ b.item }}</div>
        <span class="text-subtitle1"> <span class="text-caption">NGN</span>{{ new Intl.NumberFormat('en-NG').format(b.price) }} x {{ b.qty }}</span>
        <hr />
</q-card-section>
</q-card>
</q-list>
</div>

</template>

<script setup>
import {useRouter} from 'vue-router';
import {useCartStore} from '../stores/cartStore';

const router = useRouter();
const cartStore = useCartStore()

function back() {
    router.back();
}

function exportHistory() {
  localStorage.removeItem('transactions');
  location.reload();
}
</script>