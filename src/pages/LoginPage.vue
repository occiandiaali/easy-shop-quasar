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
          <div class="q-mt-md text-center text-body1">
            {{ slide1Text }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="qr_code" color="accent" size="56px" />
          <div class="q-mt-md text-center text-body1">
            {{ slide2Text }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" color="accent" size="56px" />
          <div class="q-mt-md text-center text-body1">
            {{ slide3Text }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-img 
      :src="logo"
      style="height: 64px;max-width: 150px;border-radius: 100%;margin: 16px;"
      alt="easy-shop"
      />
          <div class="q-mt-md text-center">
            
            <q-input outlined v-model="username" label="Username" /><br/>
            <q-input outlined v-model="email" label="Email" /><br/>
            <q-btn :disable="(!email || !username)" color="purple" label="Continue" @click="onContinue"/>
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
 // const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?';
   const slide1Text = 'EasyShop makes your shopping experience..easier. Enjoy in-store shopping without the stress of standing on a queue when it is time to checkout. Experience self-checkout in style.';
  const slide2Text = 'Scan the QR Code for the item you want to buy to add it to your cart automatically. Scan each item just once, then increment the quantity you want on your cart page.';
  const slide3Text = 'No need to stand in line for even one second to pay for your shopping. Use the in-app Paystack feature to make payment by card or transfer. Checkout your shopping in less than 15 seconds, with your receipt sent to the email you provide. Fast!'
  function onContinue() {
    localStorage.setItem('username', username.value);
    localStorage.setItem('useremail', email.value);
    router.push({path: 'app'});
    console.log(`Username: ${username.value} - ${email.value}`);
    username.value = '';
    email.value = '';

  }
</script>