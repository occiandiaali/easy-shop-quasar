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
      style="height: 84px;max-width: 180px;border-radius: 100%;margin: 16px;"
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
            {{ slide3Text }} <q-icon name="swipe_left" color="accent" size="28px" class="q-mt-sm"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-img 
      :src="logo"
      style="height: 84px;max-width: 180px;border-radius: 100%;margin: 16px;"
      alt="easy-shop"
      />
          <div class="q-mt-md text-center">
            
            <q-input outlined v-model="username" label="Username" /><br/>
            <q-input outlined v-model="email" 
            :rules="[val => isValidEmail(val) || 'Valid email address required!']"
            label="Email" /><br/>
            <!-- <q-btn :disable="(!email || !username)" color="purple" label="Proceed" @click="onContinue"/> -->
            <q-btn :disable="(email.length < 6 || username.length < 3)" color="purple" label="Proceed" @click="onContinue"/>
          </div>
        </q-carousel-slide>
      </q-carousel>
  
      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          color="accent"
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

  //const EMAIL_REGEX = '/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i'
  const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};
 // const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?';
   const slide1Text = 'EasyShop makes your shopping experience..easier. Enjoy in-store shopping without the stress of standing on a queue when it is time to checkout. ';
  const slide2Text = 'Simply scan the QR Code for the item you want to buy to add it to your cart. Scan each item only once, then increment the quantity you want on your cart page.';
  const slide3Text = 'Use the in-app Paystack feature to make pay with your card, USSD, or bank transfer. Checkout easily in a matter of seconds, and get your receipt sent to the email you provide.'
  function onContinue() {
    localStorage.setItem('userName', username.value);
    localStorage.setItem('userEmail', email.value);

   router.replace('/');
   location.reload();
    console.log(`Username: ${username.value} - ${email.value}`);
    username.value = '';
    email.value = '';

  }
</script>