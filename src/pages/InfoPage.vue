<template>
<q-page class="bg-purple-1">
<q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
<div class="text-center">
<h2 class="text-h5">Info Page</h2>
<span class="text-subtitle1">Coming Soon</span>
</div>
</q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

function back() {
    router.back();
}
</script>