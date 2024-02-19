<!-- <template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);
const meta = ref<Meta>({
  totalCount: 1200
});
</script> -->

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
          <!-- <template v-slot:label>
            Account
          </template> -->
        </q-fab-action>
        <q-fab-action color="secondary" external-label @click="toLogin">
          <template v-slot:icon>
            <q-icon name="history" />
          </template>
          <!-- <template v-slot:label>
            History
          </template> -->
        </q-fab-action>
        <q-fab-action color="orange" external-label @click="toQRCreate">
          <template v-slot:icon>
            <q-icon name="create" />
          </template>
          <!-- <template v-slot:label>
            Create QR
          </template> -->
        </q-fab-action>
      </q-fab>
        <!-- <q-fab
        v-model="fab2"
        square
        vertical-actions-align="right"
        color="secondary"
        glossy
        icon="keyboard_arrow_down"
        direction="down"
      >
        <q-fab-action square color="primary" @click="toAccount" icon="person" label="Account" label-position="left" />
        <q-fab-action square color="secondary" @click="onClick" icon="history" label="History" label-position="left" />
        <q-fab-action glossy square color="orange" @click="onClick" icon="create" label="Create QR" label-position="left" />
      </q-fab> -->
      </div>
  
      <div class="display-div">
        <div v-if="!scanset">
          <q-icon name="photo_camera" size="200px" color="grey-5" 
        style="margin-top: 60px;margin-left: 50px;"
        @click="toggleScan"
        />

        </div>
        <div v-else @click="toggleScan">
          <qrcode-stream
          style="height: 350px;"
          :track="paintOutline"
           @detect="onDetect"
           @error="onError"
           ></qrcode-stream>
        </div>
      </div>
      <span style="font-size: large;margin-left: 50px;font-weight: 500;">Tap the camera image to start</span>
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



//const logo = ref('https://picsum.photos/500/300')
//const fab2 = ref(true);

const scanset = ref(false);

// const arr = ref<{
//   co: string,
//   item: string,
//   price: number
// }[]>([]);
// const company = ref('');
// const name = ref('')
// const price = ref(0)

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
router.push({path: 'account'})
}

function toCart() {
router.push({path: 'cart'})
}

function toQRCreate() {
router.push({path: 'qr-generator'})
}

function toLogin() {
router.push({path: 'login'})
}

function toggleScan() {
  scanset.value = !scanset.value
}

function createRandomString(length:number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}


function onDetect(detected: any) {
  for (const dc of detected) {

  const {rawValue} = dc;
  // if (rawValue[0] != 'WiseBuyers Supermart') {
  //  // scanset.value = false;
  //   alert('You cannot use this app outside of a WiseBuyer store!');
  // } 
  const a = JSON.parse(rawValue);
  
  console.log('A: ', a);
  a.map((v: { co: string; it: string; pr: number, id: string}) => {
    if (v.co !== 'WiseBuyers Supermart') {
      alert('You cannot use this app outside of a WiseBuyer store!');
    } else {
      console.log(`Fields: ${v.co}: ${v.it} - ${v.pr}`);
      console.log('Items: ', v);
      console.log('ItemsArr: ', Object.values(v));
      v.id = createRandomString(8)
      //cartStore.addItem(v)
      cartStore.addToCart(v);
      console.log('ID: ', v.id);
      // cartStore.items.push(v.it, v.pr);
      // console.log('Cart: ', cartStore.items);
    }
    
  })
  // console.log('Code: ', rawValue);
  // console.log('Type: ', typeof rawValue);

  // console.log('Code: ', JSON.parse(rawValue));
  // console.log('Type: ', typeof JSON.parse(rawValue));
  // const {co, it, pr} = rawValue;
   
  
  //console.log(`Fields: ${rawValue[0]}: ${rawValue[1]} - ${rawValue[2]}`);

 // arr.value = rawValue.split(' ')
  }
  scanset.value = false;
  // arr.value.push(rawValue[0], rawValue[1], rawValue[2]);
  // console.log('Arr: ', arr.value)
}
function onError(err: { name: any; }) {
 
  console.log('Err: ', err.name)
}

// onMounted(() => {
//   const strCartCount = localStorage.getItem('totalItems');
//   let count = JSON.parse(strCartCount || '0');
//   cartStore.totalItems = count;
// })

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