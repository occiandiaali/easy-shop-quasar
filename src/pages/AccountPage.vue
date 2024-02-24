<template>
    <q-page>
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
            <p v-if="username" style="margin: 22px;">Hello, {{ username }}</p>
        <div class="q-pa-md">
            <h4>Account Page</h4>
            <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
        </div>
    </q-page>
</template>

<script setup>
//import {useQuasar} from 'quasar'
import {useRouter} from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

//const $q = useQuasar()

const name = ref(null)
const age = ref(null)
const accept = ref(false)
let username = ref('')

function back() {
    router.back();
}

function onSubmit() {
    console.log()
}
function onReset() {
    console.log()
}

onMounted(() => {
  let str = localStorage.getItem('username');
  username.value = str;
})
</script>