<template>
    <q-page>
        <q-icon name="arrow_back" @click="back" size="48px" class="q-pa-md"/>
        <h3>Account Page</h3>
    </q-page>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

function back() {
    router.back();
}
</script>