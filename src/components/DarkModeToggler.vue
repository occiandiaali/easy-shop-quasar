<template>
<div>
        <div class="px-2 flex items-center">
            <InputSwitch v-model="darkModeOn" @change="appStore.toggleDarkMode" />
        </div>
        <darkMode />
</div>
</template>

<script setup>
import { ref } from 'vue';
import useAppStore from '../stores/appStore';
import darkMode from '../assets/dark-mode.vue';

const appStore = useAppStore();
const darkModeOn = ref(appStore.darkMode);
</script>

<style lang="scss">

</style>