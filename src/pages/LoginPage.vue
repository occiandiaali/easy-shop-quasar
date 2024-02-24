<template>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <!-- <q-icon name="style" color="primary" size="56px" /> -->
              <q-img 
      :src="logo"
      style="height: 64px;max-width: 150px;border-radius: 100%;margin: 16px;"
      alt="easy-shop"
      />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            <q-input outlined v-model="username" label="Username" /><br/>
            <q-input outlined v-model="email" label="Email" /><br/>
            <q-btn :disable="!username" color="purple" label="Continue" @click="onContinue"/>
          </div>
        </q-carousel-slide>
      </q-carousel>
  
      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[
            { label: 1, value: 'style' },
            { label: 2, value: 'tv' },
            { label: 3, value: 'layers' },
            { label: 4, value: 'map' }
          ]"
        />
      </div>
    </div>
  </template>

  <script setup>
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import logo from 'assets/logo-light.jpg'

  const router = useRouter();

  const slide = ref('style');
  const username = ref('')
  const email = ref('')
  const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?';
  //let btnDisabled = ref(username.value === '' && email.value === '')

  function onContinue() {
    localStorage.setItem('username', username.value);
    router.push({path: 'app'});
    console.log(`Username: ${username.value} - ${email.value}`);
    username.value = '';
    email.value = '';

  }
</script>