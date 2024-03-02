<template>
  <router-view v-if="appStore.useremail != ''" />
  <on-board-component v-else></on-board-component>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from './stores/appStore';

import OnBoardComponent from './components/OnBoardComponent.vue';

const appStore = useAppStore();
//let uMail = ref(appStore.useremail)

// onMounted(() => {
// uMail.value = localStorage.getItem('userEmail') || '';
// })


</script>
