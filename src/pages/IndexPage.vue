<template>
  <q-page>
    <q-img 
      :src="logo"
      style="height: 40px;max-width: 120px;border-radius: 100%;margin: 16px;"
      alt="easy-shop"
      />
      <div class="q-ma-md fixed-top-right" id="fab-div">
        <q-fab color="purple" direction="down" >
        <template v-slot:icon="{ opened }">
          <q-icon :class="{ 'example-fab-animate--hover': opened !== true }" name="keyboard_arrow_down" />
        </template>

        <template v-slot:active-icon="{ opened }">
          <q-icon :class="{ 'example-fab-animate': opened === true }" name="close" />
        </template>

        <q-fab-action color="primary" external-label @click="onClick">
          <template v-slot:icon>
            <q-icon name="person" @click="toAccount"/>
          </template>
        </q-fab-action>
        <q-fab-action color="secondary" external-label @click="toHistory">
          <template v-slot:icon>
            <q-icon name="history" />
          </template>
        </q-fab-action>
        <q-fab-action v-if="uName === 'admin'" color="orange" external-label @click="toQRCreate">
          <template v-slot:icon>
            <q-icon name="create" />
          </template>
        </q-fab-action>
      </q-fab>
      </div>
  
      <div class="display-div">
        <div v-if="!scanset">
          <q-icon name="photo_camera" size="200px" color="grey-5" 
        style="margin-top: 60px;margin-left: 50px;"
        @click="toggleScan"
        />
        </div>
        <!-- <div v-else-if="scanning">
          <q-spinner-hourglass
        color="purple"
        size="4em"
      />
        </div> -->
        <div v-else @click="toggleScan">
          <qrcode-stream
          style="height: 350px;"
          :track="paintOutline"
           @detect="onDetect"
           @error="onError"
           ></qrcode-stream>
        </div>
      </div>
      <span style="font-size: large;margin-left: 45px;font-weight: 500;">Tap the camera icon to scan</span>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="shopping_cart" color="accent" @click="toCart">
              <q-badge color="red" floating>{{ cartStore.totalItems }}</q-badge>
            </q-btn>
          </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

import {useCartStore} from '../stores/cartStore';

import {QrcodeStream} from 'vue-qrcode-reader';

import logo from 'assets/logo-light.jpg'

const router = useRouter();
const cartStore = useCartStore();


let uName = ref('')
//const logo = ref('https://picsum.photos/500/300')

const scanset = ref(false);
const scanning = ref(false);

// const options = [
//   {text: 'outline', value: paintOutline},
//   {text: 'bounding box', value: paintBoundingBox},
// ];

function paintOutline(detectedCodes: any, ctx: { strokeStyle: string; beginPath: () => void; moveTo: (arg0: any, arg1: any) => void; lineTo: (arg0: any, arg1: any) => void; closePath: () => void; stroke: () => void; }) {
  for (const dc of detectedCodes) {
    const [firstPoint, ...otherPoints] = dc.cornerPoints

  ctx.strokeStyle = 'red'

ctx.beginPath()
ctx.moveTo(firstPoint.x, firstPoint.y)
for (const { x, y } of otherPoints) {
  ctx.lineTo(x, y)
}
ctx.lineTo(firstPoint.x, firstPoint.y)
ctx.closePath()
ctx.stroke()
  }
}

// function paintBoundingBox(detectedCodes, ctx) {
//   for (const dc of detectedCodes) {
//     const {
//       boundingBox: {x, y, width, height}
//     } = dc
//     ctx.lineWidth = 2
//     ctx.strokeStyle = '#007bff'
//     ctx.strokeRect(x, y, width, height)
//   }
// }

function onClick () {
console.log('Clicked...')
}

function toAccount() {
router.push({path: '/app/account'})
}

function toCart() {
router.push({path: '/app/cart'})
}

function toQRCreate() {
router.push({path: '/app/qr-generator'})
}

function toHistory() {
router.push({path: '/app/history'})
}

function toggleScan() {
  scanset.value = !scanset.value
  scanning.value = true;
}

function onDetect(detected: any) {
  for (const dc of detected) {
  const {rawValue} = dc;
  const a = JSON.parse(rawValue);
  
  console.log('A: ', a);
    a.map((v: { name: string; price: number, id: string, qty: number}) => {
      v.qty = 1;
      cartStore.addToCart(v);
      console.log('AddedToCart: ', v);
      console.log('Current Cart: ', cartStore.items)
    
  })
  }
  scanning.value = false;
  scanset.value = false;
}
function onError(err: { name: any; }) {
 
  console.log('Err: ', err.name)
}

onMounted(() => {
  let uTemp = localStorage.getItem('username') || '';
  uName.value = uTemp;
})
</script>

<style scoped>
.display-div {
  width: 300px;
  height: 350px;
  border: 1px solid lightgray;
  border-radius: 18px;
  margin: 48px auto;
}

#fab-div {
  z-index: 88;
}

.q-fab:hover .example-fab-animate--hover {
animation: example-fab-animate 0.82s cubic-bezier(.36,.07,.19,.97) both;
transform: translate3d(0,0,0);
backface-visibility: hidden;
perspective: 1000px;
}

@keyframes example-fab-animate {
  10%, 90% {
    transform: translate3d(-1px,0,0);
  }
  20%, 80% {
    transform: translate3d(2px,0,0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px,0,0);
  }
  40%, 60% {
    transform: translate3d(4px,0,0);
  }
}

</style>