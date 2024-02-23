<template>
<q-page style="background-color: lightgrey;">
<q-icon name="arrow_back" @click="router.back" size="28px" class="q-pa-md"/>
<div class="q-pa-md justify-center">
<h4>Nothing to see here.</h4>
<p>history page</p>
</div>
</q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();
</script>